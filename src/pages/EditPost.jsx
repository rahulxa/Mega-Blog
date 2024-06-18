import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import service from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [blogPost, setBlogPost] = useState(null); // Ensure this is null initially
    const { slug } = useParams();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (slug) {
            // console.log("This is slug:", slug);
            service.getPost(slug)
                .then((post) => {
                    if (post) {
                        // console.log("this is:",post);
                        setBlogPost(post);
                    }
                })
                .catch((error) => {
                    console.log("Error fetching post:", error);
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return blogPost ? (
        <div className='py-8'>
            <Container>
                <PostForm blogPost={blogPost} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
