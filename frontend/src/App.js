import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './components/Home'
import AuthState from './auth/AuthState'
import Footer from './layout/Footer';
import Locations from './components/Location';
import guideRegister from './components/guideRegister';
import guideList from './components/guideList';
import aboutUs from './components/aboutUs';
import GuideDetail from './components/GuideDetail';
import Message from './components/Chat/Message'
import ChatScreen from './components/Chat/ChatScreen'
import Profile from './components/Profile';
import ChatForGuide from './components/Chat/ChatForGuide';
import MessageForGuide from './components/Chat/MessageForGuide';
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
import ChatPayment from './components/Chat/ChatPayment'
import ChangePhoto from './components/mypage/ChangePhoto';
import Setting from './components/Setting';
import Post from './components/mypage/Post';
import Tour from './components/tour/Tour';
import HostTour from './components/tour/hostTour';
import PostList from './components/PostList'
import ScrollTop from './layout/ScrollTop'
import Admin from './components/admin/admin';
import TourDetail from './components/tour/tourDetail';
function App() {
  return (
    <>
    <AuthState>
     <Router>
      <ScrollTop>
      <Route path="/" exact component={Home} />
      <Route path="/place" exact key="place" component={Locations} />
      <Route path="/guide/:id" component={GuideDetail} />
      <Route path="/guideList" exact component={guideList} />
      <Route path="/guide" exact component={guideRegister} />
      <Route path="/tour" exact  component={Tour} />
      <Route path="/hosttour"  component={HostTour} />
      <Route path="/tour/:id" component={TourDetail} />
      <Route path="/aboutUs" component={aboutUs} />
      <Route path="/allpost" component={PostList} />
      <Route path="/mypage/:id" component={NormalProfile} />
     <Container>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/guidesetting" component={GuideSetting} />
      <Route path="/message" component={Message} />
      <Route path="/chat/:id" exact component={ChatScreen} />
      <Route path="/chat/payment" component={Payment} />
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
      <Route path="/write"　component={Post} />
      <Route path="/admin" component={Admin} />
      </Container>
      <Footer />
      <MediaQuery query="(max-width: 767px)">
        <StickyFooter />
      </MediaQuery>
      </ScrollTop>
     </Router>
    </AuthState>
    </>
  );
}

export default App;
