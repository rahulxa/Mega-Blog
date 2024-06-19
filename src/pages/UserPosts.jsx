import React, { useState } from 'react'
import service from '../appwrite/config';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Postcard, Container } from "../components/index"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserPosts() {

    const userData = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    // const { slug } = useParams();

    useEffect(() => {
        service.getUserPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    // console.log(posts.$id)
                }
            })
    }, [])

    const myPosts = posts.filter(post => post.userId === userData.$id);
    if (myPosts) {
        console.log(myPosts.$id)
    }

    if (myPosts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap justify-center'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold mb-4'>
                                Create your first Post now!
                            </h1>
                            <button
                                onClick={() => navigate("/add-post")}
                                className='text-lg font-semibold text-black underline hover:text-gray-500'
                            >
                                Create post
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else return (
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



// {
//     myPosts ? (
//         <Container>
//             <div className='flex flex-wrap'>
//                 {myPosts.map((post) => (
//                     <div key={post.$id}>
//                         <Postcard {...post} />
//                     </div>
//                 ))}
//             </div>
//         </Container>
//     ) : (
//         <div className='flex flex-wrap'>
//             <div className='p-2 w-full'>
//                 <h1 className='text-2xl font-bold hover:text-gray-500'>
//                     No posts to read currently!
//                 </h1>
//             </div>
//         </div>
//     )
// }
