import React, { useState } from 'react'
import service from '../appwrite/config';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

function MyPosts() {

    const userData = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([])
    // const { slug } = useParams();

    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [])

    const author = posts.filter(post => post.userId === userData.$id);

    return (
        <></>
    )
}

export default MyPosts