import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthState'
import './aboutUs.css'
import { animateScroll as scroll } from 'react-scroll';
import OurCompany from '../layout/OurCompany'

const Aboutus = () => {
     const { setUserInfo,userInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    const scrollToTop = () => {
      scroll.scrollMore(600);
    }
    return (
       <>
        <div　className="about-us-page">
         <div className="about-us-page-header overlay">
          <div className="about-us-page-header-header">
              <div className="about-us-page-header-left">
                <Link to="/"><h2 style={{ color: 'white'}}>Expo</h2></Link>
              </div>
              <div className="about-us-page-header-right">
                {userInfo ? (
                 <>
                 <Link to="/guide" className="about-us-page-header-right-contents"><p>Become a guide</p></Link> 
                 <Link to={`/mypage/${userInfo._id}`} className="about-us-page-header-right-contents">Mypage</Link>
                 </>
                ):(
                <>
                <Link to="/guide" className="about-us-page-header-right-contents"><p>Become a guide</p></Link> 
                <Link to="/login" className="about-us-page-header-right-contents"><p>Login</p></Link> 
                <Link to="/regiser" className="about-us-page-header-right-contents"><p>Register</p></Link>
                </> 
                )}
              </div>
          </div>
            <div className="about-us-page-contents">
             <h1>This is Expo</h1>  
           <p>Aliquam libero augue varius non odio nec faucibus congue felis quisque a diam rutrum tempus massa accumsan faucibus purus.</p>
           <button className="about-us-page-header-button" onClick={scrollToTop}>LEARN MORE</button>
          </div>
          
         </div>
         <div className="introduction">
          <div className="introduction-left">
            <img src="https://images.unsplash.com/photo-1552985247-03b1fddb53d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="auto" />
          </div>
          <div className="introduction-right">
           <h2>About Expo　</h2>
           <p>Welcome to Expo, your number one source for all things Expo site. We're dedicated to giving you the very best of our service, with a focus on guide, host, tour service.</p>
           <p>Founded in 2020 by Honda Ao, Expo has come a long way from its beginnings in Kuala Lumpur. When Expo first started out, his passion for travel and guide drove them to quit day job, so that Expo can offer you [competitive differentiator - e.g. "the world's most advanced toothbrush"]. We now serve customers all over south east asia, and are thrilled that we're able to turn our passion into our own website.</p>
           <button className="about-us-page-header-button">Learn More</button>
          </div>
         </div>
         <div className="introduction2">
         <div className="introduction2-width">
          <div className="introduction2-left">
           <h2>Society we will create</h2>
           <p>When you have a great story about how your product or service was built to change lives, share it. The "About Us" page is a great place for it to live, too. Good stories humanize your brand, providing context and meaning for your product. What’s more, good stories are sticky -- which means people are more likely to connect with them and pass them on.</p>
           <p>Every company has a story to tell, so break out your storytelling skills from that random English class you took years ago and put them to work on your "About Us" page. Using descriptive and emotive copy and gorgeous graphics, an "About Us" page with a story works harder for your business than a generic one.</p>
           <button className="about-us-page-header-button" style={{ color: '#3498db', backgroundColor: 'white'}}>Learn More</button>
          </div>
          <div className="introduction2-right">
            <img src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="auto" /> 
          </div>
         </div>
         </div>
        </div>
        <OurCompany />
        </>
    )
}

export default Aboutus
