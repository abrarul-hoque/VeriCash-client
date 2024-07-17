import { Helmet } from 'react-helmet';
import loginImg from '../../../assets/log-in-girl.svg';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const { signIn, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const errorToast = (errorMessage) => toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });


    const handleEmailLogin = async (data) => {
        console.log(data)
        const paddedPin = data.pin + '0'; //adding a '0' to user pin
        data.pin = paddedPin
        console.log(data)
        signIn(data.email, data.pin)
            .then(res => {
                navigate('/');
            })
            .catch(error => {
                // errorToast(error);
                console.log(error);
            })
    }



    return (
        <div className='max-w-6xl mx-auto'>
            <ToastContainer />
            <Helmet>
                <meta charSet="utf-8" />
                <title>VeriCash | Login</title>
            </Helmet>
            <div className='flex flex-col md:flex-row lg:flex-row-reverse items-center'>
                <div className='w-4/5 md:w-1/2 lg:w-1/2'>
                    <img className='w-full' src={loginImg} alt="" />
                </div>
                <div className='w-4/5 md:w-1/2 lg:w-1/2 p-5 py-10'>
                    <h1 className='text-2xl font-bold text-center mb-6'>Please Login</h1>

                    <Tabs>
                        <TabList>
                            <Tab>Login using Email and Pin</Tab>
                            <Tab>Login using Mobile and Pin</Tab>
                        </TabList>

                        <TabPanel>
                            <form onSubmit={handleSubmit(handleEmailLogin)}>
                                <label className="form-control w-full lg:w-4/5 mb-2">
                                    <div className="label">
                                        <span className="label-text">Your Email</span>
                                    </div>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full" />
                                    {errors.email && <span className='text-red-400 my-2 ml-4'>Email is required</span>}
                                </label>
                                <label className="form-control w-full lg:w-4/5 relative">
                                    <div className="label">
                                        <span className="label-text">Your Pin</span>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("pin", {
                                            required: true,
                                            minLength: 5,
                                            maxLength: 5,
                                            pattern: /^[0-9]{5}$/
                                        })}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full" />
                                    <span className="btn bg-transparent border-none absolute top-9 right-0" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash className='text-2xl' /> : <FaRegEye className='text-2xl' />}</span>
                                    {errors.pin?.type === "required" && <span className='text-red-400 ml-4 mt-1'>Pin is required</span>}
                                    {errors.pin?.type === "minLength" && <span className='text-red-400 ml-4 mt-1'>Pin must be 5 digit long</span>}
                                    {errors.pin?.type === "maxLength" && <span className='text-red-400 ml-4 mt-1'>Pin must be 5 digit!</span>}

                                </label>
                                <h3 className='text-base text-center mt-3'>New to VeriCash? <Link to="/register" className='underline font-bold'>Register</Link></h3>
                                <input className='btn btn-primary my-5' type="submit" value="Login" />
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <h1 className='text-3xl'>Form coming soon</h1>
                        </TabPanel>
                    </Tabs>




                </div>

            </div>
        </div>
    );
};

export default Login;