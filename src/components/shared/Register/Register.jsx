import React from 'react';

const Register = () => {
    return (
        <div className='max-w-6xl mx-auto my-4 lg:my-8'>
            <h1 className='text-3xl font-semibold text-center'>Please Register</h1>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex-1'>
                    <form >
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Name</span>
                                </div>
                                <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Email</span>
                                </div>
                                <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Mobile</span>
                                </div>
                                <input type="number" placeholder="Your Mobile Number" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Your Pin</span>
                                </div>
                                <input type="number" placeholder="Your 5 Digit Pin Number" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="flex justify-center px-5 mb-3">
                            <label className="form-control w-full lg:w-3/4">
                                <div className="label">
                                    <span className="label-text">Register As</span>
                                </div>
                                <input type="number" placeholder="Your 5 Digit Pin Number" className="input input-bordered w-full" />
                            </label>
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