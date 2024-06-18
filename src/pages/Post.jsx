import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import service from "../appwrite/config";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log("this is post.userid:",post.userId)
    // console.log("this is post.userid:",userData.$id)


    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                        style={{ maxWidth: '50%', height: 'auto' }} // Adjust the image size here
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <br></br>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full mb-20 text-center">
                        <h1 className="text-2xl font-bold">TITLE: {post.title}</h1>
                    </div>
                    <div className="w-full mb-6">
                        <h2 className="text-xl font-bold mb-4">
                            <span className="border-b-2 border-black">Article</span>
                        </h2>
                        <div className="text-left browser-css">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}