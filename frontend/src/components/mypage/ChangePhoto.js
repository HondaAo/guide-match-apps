import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../auth/AuthState';
import './Mypage.css'

const ChangePhoto = ({ match , history}) => {
    const myId = match.params.id
    const { userInfo, setUserInfo, logout } = useContext(AuthContext);
    const [ file, setFile] = useState('')
    useEffect(()=>{
        setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
        Axios.get(`/api/user/${myId}`)
        .then(res=>{
           setUserInfo(res.data)
           console.log(res.data)
        })
        .catch(err => console.log(err))
    },[])
    const imageChange = (e)=>{
        e.preventDefault();
        const formData = new FormData()
         formData.append('image', file)
         console.log(file)
         const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
         };
         Axios.post(`/api/image/${userInfo._id}`,formData,config)
         .then(res => {
           console.log(res.data)
           history.push(`/mypage/${userInfo._id}`)
         })
         .catch(err => alert(err))
    }
    return (
        <>
        {userInfo ?    
        (
        <div className="image-change-page">
          <h5>Image Change Page</h5>
          <div style={{ marginTop: '50px'}}>
          { userInfo.image !== "" ? <img src={userInfo.image} style={{ marginLeft: '45%'}} /> : <h4>Currently no setting image</h4> }
            <form onSubmit={imageChange}>
              <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
              <button class="ui instagram button" type="submit" style={{ marginTop: '50px'}}>
                Change
              </button>
            </form>
          </div>
        </div>
        ): null }
        </>
    )
}

export default ChangePhoto
