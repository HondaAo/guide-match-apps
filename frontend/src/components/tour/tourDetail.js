import Axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthState';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const TourDetail = ({ match }) => {
    const tourId = match.params.id;
    const [ tour, setTour ] = useState(null);
    const [ host, setHost ] = useState(null);
    const [ date, setDate ] = useState();
    const [ number, setNumber ] = useState(0);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      Axios.get(`/api/tour/${tourId}`)
      .then(res => {
          setTour(res.data)
      })
      .catch(err => console.log(err))
      if(tour){
        Axios.get(`/api/tour/host/${tour.host}`)
        .then(res => setHost(res.data))
        .catch(err => console.log(err))
      }
    },[tour])
    const register = () =>{
      const participant = {
         id: userInfo._id,
         date,
         number
      }
      Axios.post(`/api/tour/participant/${tour._id}`,participant)
      .then(res => {
        alert(res.data)
        setDate('');
        setNumber(0);
      })
      .catch(err => console.log(err))
    }
    return (
      <>
      <Helmet>
        { tour && <title>Expo Tour {tour._id} page</title>}
      </Helmet>
      <MediaQuery query="(min-width: 767px)">
         <div>
         <header className="tour-host-header">
             <div className="tour-host-header-left">
               <h2><strong><Link to="/" className="link" style={{ color: '#ff3f3f'}}>Expo</Link></strong></h2>
             </div>
             <div className="tour-host-header-right">
               {userInfo && <h5><Link to={`/mypage/${userInfo._id}`} className="tour-link">Mypage</Link></h5>  }
               <h5><Link to="/tour" className="tour-link">Outline</Link></h5>  
             </div>
          </header> 
          { tour && (
            <div className="tour-detail-screen">   
             <div className="tour-detail-image">
              <h2>{tour.title}</h2>
              <p style={{ margin: '20px 0'}}>date:{tour.date}</p>
                  <img src={tour.image.url} />
             </div>
             { host && (
             <div className="tour-detail-right">
              <div className="tour-detail-right-top">
              <h3>Entire Tour is hosted by {host.name}</h3>
              <img src={host.image} />
              </div>
              <hr />
              <div className="tour-detail-right-contents">
               {tour.description}
               <p></p>
              </div>
              <hr />
              <div className="tour-detail-right-reservation">
               <h5><strong>${tour.charge}</strong> per person</h5> 
               <input placeholder="participation date" type="date" onChange={(e)=> setDate(e.target.value)} />
               <input placeholder="Number of participants" type="number" onChange={(e)=> setNumber(e.target.value)} />
               <input type="submit" value="Go Payment" className="button" onClick={register} />
              </div>
             </div>
             )}
            </div> 
          )}
         </div>
       </MediaQuery>
       <MediaQuery query="(max-width: 767px)">
      { tour && host && (
        <>
        <header className="host-iphone-header">
        <div>
            <Link to={`/place?city=${tour.city}&country=${tour.country}`}>
            <ArrowBackIosIcon style={{ marginRight: '20px'}} /></Link>
            <strong>{host.name}</strong>
        </div>

        <FavoriteBorderIcon onClick={()=>{

        }}
         />
        </header>
        <div className="tour-iphone-image">
         <img src={tour.image.url} alt="" />
        </div>
        <div className="tour-detail-iphone">
         <h3>Hi I'm {host.name}</h3>
         <p>{tour.country} / {tour.city}</p>
        </div>
        <hr />
        <div className="tour-detail-comment">
         <p>{tour.description}</p>
        </div>
        <hr />
        <div className="tour-host-detail-iphone">
        <div className="tour-host-detail-iphone-left">
         <h3>Hosted by <strong>{host.name}</strong></h3> 
         <p>{tour.country},{tour.city}</p>
        </div>
        <div className="tour-host-detail-iphone-right">
          <img src={host.image} alt="" />
        </div>
        </div>
        <hr />
        <div className="tour-detail-button">
        <button className="reservation-button">
          Go Reservation
        </button>
        </div>
        </>
      )}
      </MediaQuery>
      </>
    )
}

export default TourDetail
