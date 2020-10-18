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
import Review from './components/Review';
import ProfileUpdate from './components/mypage/ProfileUpdate';
import StickyFooter from './layout/StickyFooter';
import MediaQuery from 'react-responsive';
import NormalProfile from './components/NormalProfile';
import Favorite from './components/Favorite';
import PersonalSetting from './components/mypage/PersonalSetting';
import Payment from './components/mypage/Payment';
import GuideSetting from './components/GuideSetting';
import TravelList from './components/mypage/TravelList';
import ChatPayment from './components/ChatPayment'
import ChangePhoto from './components/mypage/ChangePhoto';
import Setting from './components/Setting';

function App() {
  return (
    <>
    <AuthState>
     <Router>
      <Header />
      {/* <HeaderNext /> */}
      <Route path="/" exact component={Home} />
      <Route path="/place" component={Location} />
      <Route path="/guide/:id" component={GuideDetail} />
      <Route path="/guideList" exact component={guideList} />
     <Container>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/guide" exact component={guideRegister} />
      <Route path="/guidesetting" component={GuideSetting} />
      <Route path="/aboutUs" component={aboutUs} />
      <Route path="/message" component={Message} />
      <Route path="/chat/:id" exact component={ChatScreen} />
      <Route path="/chat/payment" component={Payment} />
      <Route path="/mypage/:id" component={NormalProfile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/chatforguide/:id" component={ChatForGuide} />
      <Route path="/messageforguide" component={MessageForGuide} />
      <Route path="/review/:id" component={Review} />
      <Route path="/update/:id" component={ProfileUpdate} />
      <Route path="/favorite" component={Favorite} />
      <Route path="/setting/:id" component={PersonalSetting} />
      <Route path="/payment/:id" component={ChatPayment} />
      <Route path="/travellist/:id" component={TravelList} />
      <Route path="/photochange" component={ChangePhoto} />
      <Route path="/setting" exact component={Setting} />
      </Container>
      <Footer />
      <MediaQuery query="(max-width: 767px)">
        <StickyFooter />
      </MediaQuery>
     </Router>
    </AuthState>
    </>
  );
}

export default App;
