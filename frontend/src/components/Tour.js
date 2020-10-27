import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import './Tour.css'
import CheckIcon from '@material-ui/icons/Check';
import OurCampany from '../layout/OurCompany'

const Tour = () => {
    const { setUserInfo,userInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      alert('Excuse me, Currently we are not providing tour service.')
    },[])
    return (
        <div>
          <div className="tour-header">
          <header className="image-header-header"style={{ paddingTop: '2%'}}>
             <Container >
               <Row>
                 <Col md={6}>
                  <Link to="/"><h3 style={{ fontSize: '40px', color: 'white'}}>Expo-travel</h3></Link>
                 </Col>
                 <Col md={6} style={{ textAlign: 'right'}}>
                { userInfo ? (
                  <>
                  <Link to="/guide"><button className="ui inverted button">Become a guide</button></Link>
                  <Link  to={`/mypage/${userInfo._id}`} style={{ marginLeft: '20px'}}><button className="ui inverted button">My page</button></Link>
                  </>
                ): (
                  <Link to="/login"><button class="ui inverted button">Login</button></Link>
                )}
                 </Col>
               </Row>
             </Container>
           </header>
           <div className="tour-header-title">
             <h1>Host a Tour</h1>
             <p>LOREM IPSUM DOLOR SIT AMET NULLAM CONSEQUATINTERDUM VIVAMUS DONCE SED LIBERO.</p>
             <button className="ui red button" style={{ backgroundColor: '#f32853', padding: '1%'}} onClick={()=> alert('Currently We do not run tour service')}>Get started</button>
           </div>
          </div>
          <div className="tour-explanation">
            <div className="tour-explanation-left">
              <h2>Earn money<br /> as hosting a tour</h2>
              <p>PERSPICIATIS DOLOREMQUE RECUSANDAE DOLOR</p>
            </div>
            <div className="tour-explanation-right">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ea mollitia corporis id, distinctio sunt veritatis officiis dolore reprehenderit deleniti voluptatibus harum magna, doloremque alias quisquam minus, eaque. Feugiat quod, nesciunt! Iste quos ipsam, iusto sit esse.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ea mollitia corporis id, distinctio sunt veritatis officiis dolore reprehenderit deleniti voluptatibus harum magna, doloremque alias quisquam minus, eaque. Feugiat quod, nesciunt! Iste quos ipsam, iusto sit esse.</p>
            </div>
          </div>  
          <div className="tour-example">
           <h1>Learn from how others were hosting a tour</h1>
           <p>MAECENAS VITAE TELLUS FEUGIAT ELEIFEND</p>
           <div className="tour-example-photos">
             <div className="tour-example-photo1-left">
               <img src="https://images.unsplash.com/photo-1518503676784-c1c2e20d3ae4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="auto" />
             </div>
             <div className="tour-example-photo1-right">
             </div>
           </div>
           <div className="tour-example-photos">
             <div className="tour-example-photo2-left">
             </div>
             <div className="tour-example-photo2-right">
               <img src="https://images.unsplash.com/photo-1542560453-88e10bdc429f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="auto"/>
           </div>
           </div>
          </div>
          <div className="original-example">
           <h3>____</h3>
           <h2>Steps to get reward from hosting a tour</h2>
           <div className="steps-example">
             <div className="step-example">
              <CheckIcon fontSize="large" />
              <h3>Step1</h3>
              <p>Are you planning to spruce up your Holiday home in 2020? If your new year’s resolution is to give your holiday home a makeover, then we have some important tips for you.</p>
             </div>
             <div className="step-example">
             <CheckIcon fontSize="large" />
              <h3>Step2</h3> 
              <p>Are you planning to spruce up your Holiday home in 2020? If your new year’s resolution is to give your holiday home a makeover, then we have some important tips for you.</p>
             </div>
             <div className="step-example">
             <CheckIcon fontSize="large" />
              <h3>Step3</h3> 
              <p>Are you planning to spruce up your Holiday home in 2020? If your new year’s resolution is to give your holiday home a makeover, then we have some important tips for you.</p>
             </div>
           </div>
          </div>
          <div className="tour-footer">
            <h1>Are you ready to start hosting tours?</h1>
            <button className="tour-button" onClick={()=> alert('Currently We do not run tour service')}>Get started</button>
          </div>
          <OurCampany />
        </div>
    )
}

export default Tour
