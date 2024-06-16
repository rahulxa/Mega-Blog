import React from 'react'
import { Container, Logo, LogoutBtn } from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authStatus = useSelector((state) => state.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name: "Home",
            slug: "/", //slug means url
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus //this login page depends upon the status of the authStatus declared above  i.e when the status is false then this page will be displayed and similary the others below..
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All posts",
            slug: "/all-posts", 
            active: !authStatus
        },
        {
            name: "Add posts",
            slug: "/add-post",
            active: authStatus
        },
    ]

    return (
        <header className='py-3 shadow bg-midnightBlue'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to="/">
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.slug) }
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >{item.name}
                                    </button>
                                </li>               
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header





// The active property of the "Login" navigation item is set to !authStatus. This is the crucial part:

//     !authStatus means "not authenticated". It inverts the boolean value of authStatus.
//     If authStatus is true (user is authenticated), !authStatus will be false. Therefore, active will be false, making the "Login" link inactive.
//     If authStatus is false (user is not authenticated), !authStatus will be true. Therefore, active will be true, making the "Login" link active.