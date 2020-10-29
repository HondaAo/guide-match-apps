import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../auth/AuthState';
import './Mypage.css'

const ChangePhoto = ({ match , history}) => {
    const myId = match.params.id
    const { userInfo, setUserInfo, logout } = useContext(AuthContext);
    const [ file, setFile] = useState(null)
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
      e.preventDefault()
      let formData = new FormData()
      formData.append('image',file)
      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
     console.log(formData.getAll('image'))
      Axios.post(`/api/image/change/${userInfo._id}`,formData)
        .then(res => {
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          history.push(`/mypage/${userInfo._id}`)
        })
        .catch(err => console.log(err))
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
