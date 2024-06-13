import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store /authSlice'
import { Button, Input, Logo } from "./index"
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const signup = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login({ userData: userData }));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to="/login"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >Sign in</Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            type="name"
                            placeholder="Enter your Full Name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
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
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
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
                        <Button
                            type='submit'
                            className='w-full'
                        />

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup