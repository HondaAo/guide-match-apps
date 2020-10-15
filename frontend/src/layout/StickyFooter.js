import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { AuthContext } from '../auth/AuthState';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import WarningIcon from '@material-ui/icons/Warning';
import HomeIcon from '@material-ui/icons/Home';
import './Layout.css'

const StickyFooter = () => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ isModalOpen , setIsModalOpen ] = useState(false);
    const [ searchModal , setSearchModal ] = useState(false);
    useEffect(()=>{
        setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    return (
        <>
        <div className="sticky-footer">
          
          <div className="footer-icon">
            <Link to="/" style={{ color: 'grey'}}>
              <HomeIcon />
              <p>Home</p>
            </Link>
           </div>
          <div className="footer-icon">
              { userInfo ? <Link to={`/favorite/${userInfo._id}`} style={{ color: 'grey',textDecoration: 'none'}} > 
              <LocationOnIcon />
              <p>Favorite</p></Link> :  <> <LocationOnIcon /><p>Favorite</p></>}
          </div>
          <div className="footer-icon">
          { userInfo ? (
             <Link to={`/chat/${userInfo._id}`}style={{ color: 'grey',textDecoration: 'none'}}>
              <ChatIcon />
              <p>Chat</p>
              </Link>
          ):(
            <>
            <ChatIcon />
            <p>Chat</p>
            </>
          )}
          </div>
          <div className="footer-icon">
            { userInfo ? 
            <Link to={`/mypage/${userInfo._id}`} style={{ color: 'grey',textDecoration: 'none'}} >
              <AccountCircleIcon />
              <p>My page</p>
            </Link>
             : (
              <Link to={`/login`} style={{ color: 'grey',textDecoration: 'none'}} >
                <AccountCircleIcon />
                <p>Login</p>
              </Link>
             )}
          </div> 
          <div className="footer-icon" onClick={()=> setIsModalOpen(true)}>
              <AnnouncementIcon />
              <p>Alert</p>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          style={customStyles}
          onRequestClose={()=> setIsModalOpen(false)}
          contentLabel="Example Modal">
         <h2 style={{ color: 'red'}}><WarningIcon />{' '}Travel during covid-19{' '}<WarningIcon /></h2>
         <p>Prioritize your safety, and be aware of local COVID-19 rules and expectations. Don’t travel if you’ve been exposed to or have symptoms of COVID-19.</p>
        </Modal>
        <Modal
         isOpen={searchModal}
         style={modalStyle}
         onRequestClose={()=> setSearchModal(false)}
         ontentLabel="Example Modal">
        <>
         <i class="window close icon" onClick={()=> setSearchModal(false)}></i>
         <div class="ui transparent icon input">
           <input type="text" placeholder="Next destination is ....." style={{ marginLeft: '30px', width: '70%'}}/> 
           <i class="search icon"></i>
         </div>
         <hr />
         <p>Our Recommendation</p>
         <hr />
         <div className="btn-list">
         <button class="ui basic button" style={{ margin: '3px',marginBottom: '15px'}}>
           Kualum pool
         </button>
         <button class="ui basic button" style={{ margin: '3px',marginBottom: '15px'}}>
           Danang
         </button>
         <button class="ui basic button" style={{ margin: '3px',marginBottom: '15px'}}>
           Singopore
         </button> 
         </div>
         <div className="image-scroll">
         <div class="image-scroll-card">
           <div class="image">
             <img src="https://images.unsplash.com/photo-1542732450-e0859ec20080?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
           </div>
           <div class="content">
             <h5><strong>Hanoi</strong></h5>
             <div>
               <p style={{ color: 'lightgrey'}}>the capital city of Vietnam</p>
             </div>
           </div>
         </div>
         <div class="image-scroll-card">
           <div class="image">
             <img src="https://images.unsplash.com/photo-1601114926368-efdd1375962b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
           </div>
           <div class="content">
             <strong>Kuala lumpor</strong>
             <div>
               <p style={{ color: 'lightgrey'}}>the capital city of Malaysia</p>
             </div>
           </div>
         </div>
         <div class="image-scroll-card">
           <div class="image">
             <img src="https://images.unsplash.com/photo-1555752197-1e2ec4b5f4e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
           </div>
           <div class="content">
             <strong>Singapore</strong>
             <div>
               <p style={{ color: 'lightgrey'}}>the capital city of Malaysia</p>
             </div>
           </div>
         </div>
         </div>
        </>
        </Modal>
        </>
    )
}
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      padding               : '5%',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      textAlign             : 'center',
      padding               : '5%',
      width                 : '70%'
   }
  };
const modalStyle = {
  content : {
    top                   : '70%',
    left                  : '47%',
    right                 : 'auto',
    bottom                : 'auto',
    padding               : '5%',
    transform             : 'translate(-50%, -50%)',
    width                 : '100%',
    marginLeft            : '0%',
    borderTopLeftRadius   : '40px',
    borderTopRightRadius  : '40px',
    zIndex                : '100',

  }
}
export default StickyFooter
