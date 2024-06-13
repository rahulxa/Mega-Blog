import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "../index"
import service from '../../appwrite/config'
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

    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)

    const submit = async (data) => {
        if (blogPost) {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null
            if (file) {
                service.deleteFile(blogPost.featuredImage)
            }
            const dbBlogPost = await service.updatePost(blogPost.$id, { ...data, featuredImage: file ? file.$id : undefined })

            if (dbBlogPost) {
                navigate(`/post/${dbBlogPost.$id}`)
            }
        } else {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null
            if (file) {
                const fileId = file.$id //extracting the file id from the file
                data.featuredImage = fileId //setting the FeaturedImage to file id as FeaturedImage is the id of the post
                const dbPost = await service.createPost({ //creating a new blog post
                    ...data,
                    userId: userData.$id //user id getting this from the state
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    return (
        <div>blogPostForm</div>
    )
}

export default PostForm