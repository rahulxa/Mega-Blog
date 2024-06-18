import React, { useState } from 'react'
import service from '../appwrite/config';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Postcard, Container } from "../components/index"

function UserPosts() {

    const userData = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([])
    // const { slug } = useParams();

    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    // console.log(posts.$id)
                }
            })
    }, [])

    const myPosts = posts.filter(post => post.userId === userData.$id);
    // if (myPosts) {
    //     console.log(myPosts.$id)
    // }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {myPosts.map((post) => (
                        <div key={post.$id}>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default UserPosts;