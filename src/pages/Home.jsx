import React, { useState } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [third])


    if (posts.length === 0) {
        return 
    }
}

export default Home