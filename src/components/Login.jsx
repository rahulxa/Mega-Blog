import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login as storeLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data) // this is the login from the appwrite database
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin({ userData: userData })); // this is the login from the store
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in into your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >Sign up</Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(login)} className='mt-8 text-center'>   {/*on this handle submit method that you get from the  useform hook in this handlesubmit you pass your own method that you have created and the method which you want to run when the form gets submitted*/}
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(value)
                                        ||
                                        "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => {
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
                                            ||
                                            "password must contain"
                                        "-at least 8 characters"
                                        "-must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                                        "Can contain special characters"
                                    }
                                }
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
