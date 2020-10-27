import React, { useContext, useEffect } from 'react'
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import MediaQuery from 'react-responsive';
import './Layout.css'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';

const Header = () => {
    const { logout, userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    return (
      <>
      {/* <MediaQuery query="(min-width: 767px)">
        <header className="guide-app-header">
         <Container>
           <Row className="header-row">
             <Col md={6} classname="header-left">
              <h3>Expo-Travel</h3>
             </Col>
             <Col md={6} className="header-right">
              <h5><Link to={`/login`} style={{ color: 'black'}}>SignIn</Link></h5>
              <h5><Link to={`/register`} style={{ color: 'black'}}>SignUp</Link></h5>
              <h5><Link to="/setting" style={{ color: 'black'}}>aboutUs</Link></h5>
              <h5><Link to="/setting" style={{ color: 'black'}}>Career</Link></h5>
             </Col>
           </Row>
         </Container>
        </header>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)"> */}
       {/* <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
         {/* <Container className="">
          <Navbar.Brand href="/">Expo-travel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
                {/* { userInfo ? (
                  <>
                  <LinkContainer to='#' style={{ color: 'white',textDecoration: 'none'}} onClick={()=> logout()}><Nav.Link to="#"><ExitToAppIcon />{' '}Logout</Nav.Link></LinkContainer>
                  </>
                ):(
                <>
                <LinkContainer to='/register'><Nav.Link href="/register">Sign up</Nav.Link></LinkContainer>
                <LinkContainer to='/login'><Nav.Link href="/login">Sign In</Nav.Link></LinkContainer>
                </>
                )} 
           <div class="ui icon input">
             <input type="text" placeholder="Search..." />
             <i class="search icon"></i>
           </div>
          </Nav>
          </Navbar.Collapse>
         </Container> 
         <div class="ui transparent icon input" style={{ width: '100%', backgroundColor: 'white'}}>
           <input type="text" placeholder="Search..." />
           <i class="search icon"></i>
         </div>
        </Navbar> */}
      {/* <div className="search-bar-iphone">
      <div class="ui action input" style={{ width: '90%', marginLeft: '5%', borderRadius: '30px'}}>
        <input type="text" placeholder="Search..." onFocus={()=>{

        }}/>
        <button class="ui icon button">
          <i class="search icon"></i>
        </button>
      </div>
      </div> */}
      <header className="header">
        <div className="header-items">
          <div className="header-left">
           <Link to="/"><HomeIcon /></Link>
          </div>
          <div className="header-middle">
           <h4 style={{ color: 'tomato', fontWeight: '500'}}>Expo-travel</h4> 
          </div>
          <div className="header-right">
           { userInfo ? 
           (
          <>
           <Link to="/guide" style={{ marginRight: '20px', color: 'black'}}><PublicIcon /><p>Become a guide</p></Link>
           <Link to={`/mypage/${userInfo._id}`} style={{ marginRight: '10px', color: 'black'}}><PersonIcon /><p>My page</p></Link>
          </>
           ): (
          <>
           <Link to="/login">Login</Link>
           <Link to="/register">Register</Link>
          </> 
           )}
          </div>
        </div>
      </header>
      <hr />
      </>
    )
}

export default Header
