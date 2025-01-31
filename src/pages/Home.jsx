import React, { useState } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'
import { useEffect } from 'react'

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [])

    // if (posts) {
    //     console.log(posts.map(post => post.$id))
    // }


    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No posts to read currently!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) =>
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Home