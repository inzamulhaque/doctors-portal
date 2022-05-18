import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: services, isLoading } = useQuery("services", () => fetch("/service").then(res => res.json()));

    const imageBbKey = process.env.REACT_APP_IMGBBKEY;

    if (isLoading) {
        return "Loading...";
    }

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://api.imgbb.com/1/upload?key=${imageBbKey}`;

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;

                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        img: img
                    };

                    fetch("/doctor", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success(`Doctor ${doctor.name}, added successfuly`);
                                reset();
                            } else {
                                toast.error("faild to add the doctor");
                            }
                        })
                }
                console.log(result);
            });
    }
    return (
        <>
            <h2 className="text-3xl">Add A New Doctor</h2>

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
                    <label className="label">Upload Image:</label>
                    <input
                        type={"file"}
                        {...register("image", {
                            required: {
                                value: true,
                                message: "Image is required"
                            }
                        })}
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Upload Image"
                    />
                    <label className="label">
                        <span className="label-text-alt text-red-500">
                            {errors.image?.type === 'required' && errors.image.message}
                        </span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">Speciality:</label>
                    <select {...register("speciality")} className="select select-bordered w-full max-w-xs">
                        {
                            services?.map(service => <option value={service.name} key={service._id}>{service.name}</option>)
                        }
                    </select>
                </div>

                <input type="submit" className='btn w-full max-w-xs' value={"Add Doctor"} />
            </form>
        </>
    );
};

export default AddDoctor;