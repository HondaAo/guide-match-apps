import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthState';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';

const TravelList = ({ match }) => {
    const myId = match.params.id
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ travellist, setTravellist ] = useState([])
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
     Axios.get(`/api/user/${myId}`)
    .then(res => {
       setTravellist(res.data.travellist)
       console.log(res.data.travellist)
    })
    .catch(err => console.log(err))
    },[])
    return (
    <>
    {userInfo ? (
        <div className="travellist-page">
          <div className="header">
          <Link to={`/mypage/${userInfo._id}`}> <ArrowBackIosIcon /></Link> 
          </div> 
          <h2>Travel Plan</h2>
          <hr />
          { travellist.length === 0 ? (
            <div className="travel-list-page">
             <p>Currently No Plan</p>
             <Link to="/guideList"><button className="search-button">Search next destination</button></Link>
            </div>    
          ):(
          <Row>
             <div className="travel-list-page-contents">
            { travellist.map(travel =>(
              <Col md={4}>
                <div className="favorite-card" >
                   <Link className="favorite-card-title" to={`/guide/${travel.guideId}`}>
                    { travel.landscape  ? <img src={travel.landscape} width="100%" height="auto" /> : <Avatar />}</Link>
                   <div className="favorite-content">
                       <div>
                       <h4>{travel.guidename}</h4>
                       <p style={{ color: 'grey'}}>{travel.date}</p>
                       </div>
                   </div>
               </div>
              </Col>
            ))}
             
            </div>
           </Row> 
          )}
        </div>
    ): null}
    </>
    )
}

export default TravelList
