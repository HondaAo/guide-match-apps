import React, { createContext, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

const AuthState = ({children, history}) => {
    const [ userInfo, setUserInfo ] = useState(null)
    const login = async (user) =>{
        const { data } = await axios.post('/api/user/login',user)
        localStorage.setItem('userInfo',JSON.stringify(data))
        if(data){
            window.location = '/' 
        }else{
            alert('Invalid Password')
        }
    }
    const register = async(user) => {
     const { data } = await axios.post('/api/user/register',user)
     localStorage.setItem('userInfo',JSON.stringify(data))
        if(data){
            window.location = '/' 
        }else{
            alert('Invalid User')
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
