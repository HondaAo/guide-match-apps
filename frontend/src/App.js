import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './layout/Header'
import { Container } from 'react-bootstrap'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import AuthState from './auth/AuthState'
import Footer from './layout/Footer';
import HeaderNext from './layout/HeaderNext';
import Location from './components/Location';
import guideRegister from './components/guideRegister';
import guideList from './components/guideList';
import aboutUs from './components/aboutUs';
import GuideDetail from './components/GuideDetail';
import Message from './components/Message'
import ChatScreen from './components/ChatScreen'
import Profile from './components/Profile';
import ChatForGuide from './components/ChatForGuide';
import MessageForGuide from './components/MessageForGuide';

function App() {
  return (
    <>
    <AuthState>
     <Router>
      <Header />
      <HeaderNext />
      <Container>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/location" component={Location} />
      <Route path="/guide" exact component={guideRegister} />
      <Route path="/guideList" exact component={guideList} />
      <Route path="/guide/:id" component={GuideDetail} />
      <Route path="/aboutUs" component={aboutUs} />
      <Route path="/message" component={Message} />
      <Route path="/chat/:id" component={ChatScreen} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/chatforguide/:id" component={ChatForGuide} />
      <Route path="/messageforguide" component={MessageForGuide} />
      </Container>
      <Footer />
     </Router>
    </AuthState>
    </>
  );
}

export default App;
