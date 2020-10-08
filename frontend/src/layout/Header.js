import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';

const Header = () => {
    const { logout, userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
         <Container className="">
          <Navbar.Brand href="/">Expo-travel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                { userInfo ? (
                  <>
                  <LinkContainer to='#'><Nav.Link href="#"><GroupIcon />{' '}Join us</Nav.Link></LinkContainer>
                 <NavDropdown title="Menu">
                  {userInfo.isGuide ? (
                  <NavDropdown.Item>
                    <Link to={`/profile/${userInfo._id}`}style={{ color: 'black',textDecoration: 'none'}}><AccountBoxIcon />{' '}Profile as guide</Link>
                  </NavDropdown.Item>
                  )
                  : null}
                  <NavDropdown.Item>
                    <Link to={`/chat/${userInfo._id}`}style={{ color: 'black',textDecoration: 'none'}}><ChatIcon />{' '}chat</Link>
                  </NavDropdown.Item>
                 <NavDropdown.Item onClick={()=> logout()}>
                  <ExitToAppIcon />{' '}Logout
                 </NavDropdown.Item>
                 </NavDropdown>
                 </>
                ):(
                <>
                <LinkContainer to='/register'><Nav.Link href="/register">Sign up</Nav.Link></LinkContainer>
                <LinkContainer to='/login'><Nav.Link href="/login">Sign In</Nav.Link></LinkContainer>
                </>
                )}
            </Nav>
          </Navbar.Collapse>
         </Container>
        </Navbar>
    )
}

export default Header
