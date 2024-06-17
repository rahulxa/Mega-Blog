import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from "../index";
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ blogPost }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: blogPost?.title || "",
            slug: blogPost?.slug || "",
            content: blogPost?.content || "",
            status: blogPost?.status || "active"
        }
    });

    const [previewImage, setPreviewImage] = useState(blogPost ? service.getFilePreview(blogPost.featuredImage) : null);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("this is data:", data)
        if (blogPost) { // updating an existing post
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                await service.deleteFile(blogPost.featuredImage);
            }
            const dbBlogPost = await service.updatePost(blogPost.$id, { ...data, featuredImage: file ? file.$id : blogPost.featuredImage });

            if (dbBlogPost) {
                navigate(`/post/${dbBlogPost.$id}`);
            }
        } else { // creating a new post
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                data.featuredImage = file.$id;
            }
            const dbPost = await service.createPost({
                ...data,
                userId: userData.$id
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/^-+|-+$/g, '') // Remove leading or trailing hyphens
                .slice(0, 36); // Ensure the slug is at most 36 characters
        } else {
            return "";
        }
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    onChange={(e) => {
                        handleImageChange(e);
                        register("image").onChange(e);
                    }}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                />
                {previewImage && (
                    <div className="w-full mb-4">
                        <img
                            src={previewImage}
                            alt={blogPost ? blogPost.title : "Preview Image"}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={blogPost ? "bg-green-500" : undefined} className="w-full">
                    {blogPost ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
