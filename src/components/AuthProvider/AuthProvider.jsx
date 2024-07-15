import React, { createContext } from 'react';
import app from '../../firebase/firebase.config';
import { getAuth } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = () => {
    return (
        <div>

        </div>
    );
};

export default AuthProvider;