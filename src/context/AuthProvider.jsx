import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import app from '../firebase/firebase.config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const auth = getAuth()

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    // Create User

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)


    }

    // Sign with google

    const signUpWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Login

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Logout

    const logout = () =>{
        return signOut(auth)
    }

    // User availabilty

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
      })
    
      return () => {
        unsubscribe()
      }
    }, [])
    

    const authInfo = {
        user,
        loading,
        createUser,
        signUpWithGoogle,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={ authInfo }>
            {children}
        </AuthContext.Provider>
    )
}
