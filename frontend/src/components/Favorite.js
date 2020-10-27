import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Location.css'
import { Avatar } from '@material-ui/core';
import StickyFooter from '../layout/StickyFooter';

const Favorite = ({ match }) => {
    const myId = match.params.id
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ favoriteGuides, setFavoriteGuides ] = useState([]);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      const getUser = async()=> {
      const data = await Axios.get(`/api/user/${userInfo._id}`)
      console.log(data.data.favoriteGuides)
       setFavoriteGuides(data.data.favoriteGuides)
     }
     if(userInfo){
       getUser()  
     }
     
    },[])
    return (
        <>
         <div className="favorite-page">
          <h3>My Favorite Guides</h3>
          <hr />
      { !userInfo ? (
           <>
           Loading....  
           </>
       ): 
        favoriteGuides && favoriteGuides.length > 0 ? (
        favoriteGuides.map(guide => (
         <Row style={{ display: 'flex'}}>
           <Col md={4} >
               <div className="favorite-card" style={{ marginBottom: '30px'}} >
                   <Link className="favorite-card-title" to={`/guide/${guide.guideId}`}>
                      <img src={guide.landscape} style={{ width: '100%', maxHeight: '150px'}} /> 
                   </Link>
                   <hr />
                   <div className="favorite-content">
                       <div>
                       <strong>{guide.name}</strong>
                       <p style={{ color: 'grey'}}>{guide.city}/{guide.country}</p>
                       </div>
                       <div>
                         <FavoriteIcon onClick={()=> {
                             Axios.delete(`/api/user/guide?myId=${userInfo._id}&guideId=${guide.guideId}`)
                             .then(res => alert(res.data))
                             .catch(err => console.log(err))
                         }}/>
                       </div>
                   </div>
               </div>
           </Col>
         </Row>
        ))
       ): (
        <>
         <h4>Currently No Data</h4>
         <p>Let's check guide list page for next trip!!</p>
         <Link to="/guideList">
         <button class="ui basic button" style={{ margin: '3px',marginTop: '15px'}}>
           Search new guide
         </button>
         </Link>
         </>
       )}
       <StickyFooter />
       </div>
       </>
    )
}

export default Favorite

