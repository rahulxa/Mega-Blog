import React, { useState } from 'react'
import service from '../appwrite/config'
import { Postcard, Container } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [third])

   
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <Postcard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts