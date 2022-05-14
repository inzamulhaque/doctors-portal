import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Signin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        emailPassUser,
        emailPassLoading,
        emailPassError,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (emailPassUser || googleUser) {
            navigate(from, { replace: true });
        }
    }, [emailPassUser, googleUser, from, navigate]);

    let signInError;

    if (googleError || emailPassError) {
        signInError = <p className='text-red-500'>{googleError?.message} {emailPassError?.message}</p>;
    }

    if (emailPassLoading || googleLoading) {
        return <button className="btn loading">Loading</button>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Sign In</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">Enter Your Email Address:</label>
                                <input
                                    type={"email"}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required"
                                        },
                                        pattern: {
                                            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                            message: "enter a valid email"
                                        }
                                    })}
                                    className="input input-bordered w-full max-w-xs"
                                    placeholder="Enter Your Email Address"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-red-500">
                                        {errors.email?.type === 'required' && errors.email.message}
                                        {errors.email?.type === 'pattern' && errors.email.message}
                                    </span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">Enter Your Password:</label>
                                <input
                                    type={"password"}
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "your password must be 6 characters or be longer."
                                        }
                                    })}
                                    className="input input-bordered w-full max-w-xs"
                                    placeholder="Enter Your Password"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-red-500">
                                        {errors.password?.type === 'required' && errors.password.message}
                                        {errors.password?.type === 'minLength' && errors.password.message}
                                    </span>
                                </label>
                            </div>

                            {signInError}

                            <input type="submit" className='btn w-full max-w-xs' value={"Sign In"} />
                        </form>

                        <p>New To Doctors Portal? <Link to="/signup" className='text-primary'>Create New Account</Link> </p>

                        <div className="divider">OR</div>
                        <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-warning">SignIn With Google</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;