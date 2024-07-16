import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUser, user, setUser } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        console.log(data);
        const imageFile = { image: data.photo[0] };
        const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-Type': "multipart/form-data"
            }
        });
        console.log(imageFile, imageRes);

        const paddedPin = data.pin + '0'; //adding a '0' to user pin

        createUser(data.email, paddedPin)
            .then(result => {
                const loggedUser = result.user;
                updateUser(data.name, imageRes.data.data.display_url)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            mobile: data.mobile,
                            pin: data.pin,
                            image: imageRes.data.data.display_url,
                            role: data.category,
                            status: "pending"
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("User added to DB", res.data);
                                    reset();
                                    Swal.fire({
                                        title: "Success",
                                        text: "User Created successfuly! Please wait for approve by an Admin",
                                        icon: "success",
                                        timer: 1500
                                    });
                                    navigate("/")
                                    setUser({ ...user, displayName: userInfo.name, photoURL: userInfo.image })
                                    console.log("consoling after setUser: ", userInfo.image)

                                }
                            })
                    })
            })
    };

    return (
        <div className='max-w-6xl mx-auto my-4 lg:my-8'>
            <h1 className='text-3xl font-semibold text-center'>Please Register</h1>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex-1'>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Name</span>
                                </div>
                                <input type="text"
                                    {...register('name', { required: true })}
                                    placeholder="Your Name"
                                    className="input input-bordered w-full" />
                                {errors.name && <span className='text-red-400 ml-4'>Name is required!</span>}
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Email</span>
                                </div>
                                <input type="email"
                                    {...register('email', { required: true })}
                                    placeholder="Your Email"
                                    className="input input-bordered w-full" />
                                {errors.email && <span className='text-red-400 ml-4'>Email is required!</span>}
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Mobile</span>
                                </div>
                                <input type="number"
                                    {...register('mobile', { required: true })}
                                    placeholder="Your Mobile Number"
                                    className="input input-bordered w-full" />
                                {errors.mobile && <span className='text-red-400 ml-4 mt-2'>Mobile Number is required!</span>}
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Pin</span>
                                </div>
                                <input type="number"
                                    {...register("pin", {
                                        required: true,
                                        minLength: 5,
                                        maxLength: 5,
                                        pattern: /^[0-9]{5}$/
                                    })}
                                    placeholder="Your 5 Digit Pin Number"
                                    className="input input-bordered w-full" />
                                {errors.pin?.type === "required" && <span className='text-red-400 ml-4 mt-1'>Pin is required</span>}
                                {errors.pin?.type === "minLength" && <span className='text-red-400 ml-4 mt-1'>Pin must be 5 digit long</span>}
                                {errors.pin?.type === "maxLength" && <span className='text-red-400 ml-4 mt-1'>Pin must be 5 digit!</span>}
                                {/* {errors.pin?.type === "pattern" && <span className='text-red-400 ml-4'>Pin must be in number</span>} */}
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Register As</span>
                                </div>
                                <select
                                    {...register("category", { required: true })}
                                    className="select select-bordered w-full">
                                    {/* <option disabled selected>Who shot first?</option> */}
                                    <option value="user">User</option>
                                    <option value="agent">Agent</option>
                                </select>
                                <p className='text-red-400 ml-2'>{errors.category && <span className=''>Category is required</span>}</p>
                                {/* <input type="number" placeholder="Your 5 Digit Pin Number" className="input input-bordered w-full" /> */}
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-4/5 mb-2">
                                <div className="label">
                                    <span className="label-text">Your Photo</span>
                                </div>
                                <input
                                    type="file"
                                    {...register('photo', { required: true })}
                                    className="file-input file-input-bordered w-full" />
                                {errors.photo && <span className='text-red-400 mb-2'>Photo is required</span>}
                            </label>
                        </div>
                        <div className='flex justify-center px-4'>
                            <input className='btn btn-primary w-3/4' type='submit' value="Register" />
                        </div>
                        <div className='w-full lg:w-3/4 px-4 flex justify-end mx-auto'>
                            <h3 className='text-base mt-3'>Already have an Account? <Link to="/login" className='underline font-bold'>Login</Link></h3>
                        </div>
                    </form>
                </div>
                <div className='flex-1 p-4'>
                    image
                </div>
            </div>
        </div>
    );
};

export default Register;