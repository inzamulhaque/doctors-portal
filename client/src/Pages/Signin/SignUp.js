import { signOut } from 'firebase/auth';
import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        emailPassUser,
        emailPassLoading,
        emailPassError,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updatingProfile, profileError] = useUpdateProfile(auth);

    const [token] = useToken(googleUser || emailPassUser);

    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();

    let signUpError;

    if (googleError || emailPassError || profileError) {
        signUpError = <p className='text-red-500'>{googleError?.message} {emailPassError?.message} {profileError?.message}</p>;
    }

    if (emailPassLoading || googleLoading || updatingProfile) {
        return <button className="btn loading">Loading</button>
    }

    if (token) {
        navigate("/signin");
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });

        signOut(auth);
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Sign Up</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">Enter Your Name:</label>
                                <input
                                    type={"text"}
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required"
                                        }
                                    })}
                                    className="input input-bordered w-full max-w-xs"
                                    placeholder="Enter Your Name"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-red-500">
                                        {errors.name?.type === 'required' && errors.name.message}
                                    </span>
                                </label>
                            </div>

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

                            {signUpError}

                            <input type="submit" className='btn w-full max-w-xs' value={"Sign Up"} />
                        </form>

                        <p>Already Have An Account? <Link to="/signin" className='text-primary'>Please Sign In</Link> </p>

                        <div className="divider">OR</div>
                        <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-warning">SignIn With Google</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;