import React, { useContext } from 'react';
import { FaSave } from 'react-icons/fa';
import { BsFillSendFill } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { CiInboxOut } from "react-icons/ci";
import { FaListCheck } from "react-icons/fa6";
import { AuthContext } from '../../AuthProvider/AuthProvider';


const UserHome = () => {
    const { user } = useContext(AuthContext);


    return (
        <div>
            <h1 className='text-2xl text-center my-6 font-bold'>Hi {user.displayName}, Welcome to VeriCash! </h1>
            <div className='max-w-xl mx-auto m-8'>
                <div className='grid grid-cols-2 lg:grid-cols-3 p-3 gap-4 '>
                    <button className='btn btn-warning'><BsFillSendFill />  Send Money</button>
                    <button className='btn btn-success'><IoEnterOutline /> Cash In</button>
                    <button className='btn btn-error'><CiInboxOut /> Cash Out</button>
                    <button className='btn btn-primary'><FaListCheck /> Mini Statement</button>
                </div>

            </div>
        </div>
    );
};

export default UserHome;