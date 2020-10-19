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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
              <Link to={`/guideList`} style={{ color: 'grey',textDecoration: 'none'}} > 
              <SearchIcon />
              <p>Search</p>
              </Link>
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
          <div className="footer-icon">
          { userInfo ? <Link to={`/favorite/${userInfo._id}`} style={{ color: 'grey',textDecoration: 'none'}} > 
          <FavoriteBorderIcon />
              <p>Favorites</p>
          </Link> : <><FavoriteBorderIcon /><p>Favorites</p></>}
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
