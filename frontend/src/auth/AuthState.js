import React, { createContext, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

const AuthState = ({children, history}) => {
    const [ userInfo, setUserInfo ] = useState(null)
    const login = async (user) =>{
        try{
        const { data } = await axios.post('/api/user/login',user)
        localStorage.setItem('userInfo',JSON.stringify(data))
        window.location = '/' 
        }
        catch(err){
            alert('Wrong Password, please confirm')
        }
    }
    const register = async(user) => {
     const { data } = await axios.post('/api/user/register',user)
     if(data){
        alert("Successfully Created!!")
        window.location = '/login' 
     }
     
    }
    const logout = () =>{
      localStorage.removeItem('userInfo')
      window.location = '/'
    }
    return (
        <AuthContext.Provider value={{userInfo, setUserInfo, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState
