import React, { createContext, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config" 
import PropTypes from 'prop-types';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create an account 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password) 
    }

    //sign up with gmail 
    const signUpWithGmail = () => {
       return signInWithPopup(auth, googleProvider)
    }

    //login using email and password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout 

    const logOut = () => {
        signOut(auth)
    }

    //update profile 
    const updateuserProfile = ({name, photoURL}) => {
        return updateProfile(auth.currentUser, {
            displayName: name , photoURL: photoURL
          })
    }

    const authInfo = {
        user,
        createUser,
        signUpWithGmail,
        login,
        logOut,
        updateuserProfile
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node // Add this line for children prop validation
};

export default AuthProvider
