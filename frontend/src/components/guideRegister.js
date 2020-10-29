import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row, Button, Alert, InputGroup, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import IntlTelInput from 'react-bootstrap-intl-tel-input';
import { Typeahead } from 'react-bootstrap-typeahead'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import './Component.css';
import Axios from 'axios';
import Modal from 'react-modal'
import MediaQuery from 'react-responsive';
import { animateScroll as scroll } from 'react-scroll';
import StickyFooter from '../layout/StickyFooter';
import OurCompany from '../layout/OurCompany'


Modal.setAppElement('#root')
const GuideRegister = ({ history }) => {
    const [ name, setName ] = useState(null)
    const [ country, setCountry] = useState('');
    const [ city, setCity ] = useState('');
    const [ telephone, setTelephone ] = useState('+810000000')
    const [ email, setEmail] = useState('');
    const [ description, setDescription] = useState('');
    const [ isPro, setIsPro] = useState(false);
    const [ guide, setGuide ] = useState(null)
    const [ title, setTitle ] = useState('');
    const [ rate, setRate ] = useState('');
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ landscape, setLandscape ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [checked, setChecked ] = useState(false)
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
     if(userInfo){
       setName(userInfo.name)
       setEmail(userInfo.email)
     }
     if(guide){
       window.location = '/guideList'
     }
    },[guide])
    const registerGuide = (e)=>{
      e.preventDefault();
      const guide = {
        name,
        email,
        telephone:telephone.intlPhoneNumber,
        country,
        city,
        title,
        rate,
        description,
        isPro: false,
        landscape,
        userId: userInfo._id,
      }
      Axios.post(`/api/guide/${userInfo._id}`,guide)
      .then(res => {
        alert(res.data)
        history.pushState(`/mypage/${userInfo._id}`)
      })
      .catch(err => console.log(err))
      // Axios.put(`/api/user/guide/${userInfo._id}`)
      // .then(res => {
      //   console.log(res.data)
      //   localStorage.setItem('userInfo',JSON.stringify(res.data))
      // })
      // .catch(err => alert(err))
    }
    const scrollToTop = () => {
      scroll.scrollMore(800);
    }
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
          <div className="guide-register-top">
          <header className="image-header-header" style={{ paddingTop: '30px'}}>
             <Container>
               <Row>
                 <Col md={6}>
                  <Link to="/" style={{ color: 'white'}}><h3>Expo-travel</h3></Link>
                 </Col>
                 <Col md={6} style={{ textAlign: 'right'}}>
                { userInfo ? (
                  <>
                  <Link to="/tour"><button className="ui inverted button">Host a tour</button></Link>
                  <Link  to={`/mypage/${userInfo._id}`} style={{ marginLeft: '40px'}}><button className="ui inverted button">My page</button></Link>
                  </>
                ): (
                  <Link to="/login"><button class="ui inverted button">Login</button></Link>
                )}
                 </Col>
               </Row>
             </Container>
           </header>
           <div style={{ display: 'flex'}}>
            <div className="guide-register-top-left">
             <h2>Join us as <span style={{ color: '#e5474b'}}>local guide</span></h2>
            </div>
            <div className="guide-register-top-right">
              <div className="guide-register-place">
              <Form.Group>
               <Form.Label>Nick name</Form.Label>
               <Form.Control type="text" placeholder="Enter your nickname" style={{ borderColor: 'primary', backgroundColor: 'black', color: 'white'}} value={name} onChange={(e)=> setName(e.target.value)} />
              </Form.Group>
              <Form.Group>
               <Form.Label>Country</Form.Label>
               <Form.Control size="sm" as="select" required onChange={(e)=> setCountry(e.target.value)} style={{ borderColor: 'primary', backgroundColor: 'black', color: 'white'}} required>
               <option>Country</option>
               <option value="Vietnam">Vietnam</option>
               <option value="Malaysia">Malaysia</option>
               <option value="Singapore">Singapore</option>
               <option value="Thailand">Thailand</option>
              </Form.Control>
             </Form.Group>
              <Form.Group>
               <Form.Label>City</Form.Label>
               <Form.Control size="sm" as="select" required onChange={(e)=> setCity(e.target.value)} style={{ borderColor: 'primary', backgroundColor: 'black', color: 'white'}} required>
               <option>city</option>
               { country === 'Vietnam' ? (
                 <>
                 <option value="Hanoi">Hanoi</option>
                 <option value="Da_nang">Danang</option>
                 <option value="Hochiminh">Ho Chi minh</option>
                 <option value="Nha_Trang">Nha Trang</option>
                 <option value="HE1BB99i_An">Hoi An</option>
                 <option value="Da_Lat">Dalat</option>
                 <option value="Haiphong">Haiphong</option>
                 </>
               ): null}
               { country === 'Malaysia' ? (
                 <>
                 <option value="Kuala_Lumpur">Kuala Lumpur</option>
                 <option value="Malacca">Malacca</option>
                 <option value="Johor_Bahru">Johor Bahru</option>
                 <option value="Kota_Kinabalu">Kota Kinabalu</option>
                 <option value="George_Town">George Town</option>
                 <option value="Kuching">Kuching</option>
                 <option value="Langkawi">Langkawi</option>
                 <option value="Putrajaya">Putrajaya</option>
                 <option value="Perhentian_Islands">Perhentian Islands</option>
                 <option value="Ipoh">Ipoh</option>
                 </>
               ): null}
               { country === 'Singapore' ? (
                 <option value="Singapore">Singapore</option>
               ): null }
               { country === 'Thailand' ? (
                 <>
                 <option value="Bangkok">Bangkok</option>
                 <option value="Pattaya">Pattaya</option>
                 <option value="Chiang_Mai">Chiang Mai</option>
                 <option value="Ayutthaya">Ayutthaya</option>
                 <option value="Patong">Patong</option>
                 <option value="Hua Hin">Hua Hin</option>
                 <option value="Chiang_Rai">Chiang Rai</option>
                 </>
               ): null}
             </Form.Control>              
             </Form.Group>
              { userInfo ? 
              (
              <button class="ui youtube button" style={{ width: '100%', marginTop: '40px',backgroundColor: '#e5474b'}} onClick={scrollToTop}>
                Get started
              </button>
              ): (
                <button class="ui youtube button" style={{ width: '100%', marginTop: '40px',backgroundColor: '#e5474b'}}>Login</button>
              )}
              <Link to="/aboutUs" ><p style={{ color: 'white', marginTop: '30px'}}>Why become a guide on Expo-travel?</p></Link>
              </div>
            </div>
           </div>
          </div>
        <div className="guide-register-middle">
         <div className="guide-register-middle-left">
          <h3>3 Steps to earn money as a local guide</h3>
          <p><strong>Post guide Information on this platform for free</strong><br />
           You need to describe how you make traveller fun like your schedule and date you will be free.
           For getting guests, We recommend you to write more detail Information.
           And Wait for client's reservations.
          </p>
          <p><strong>Get reservations and </strong><br />
           You need to describe how you make traveller fun like your schedule and date you will be free.
           For getting guests, We recommend you to write more detail Information
          </p>
          <p><strong>After providing service, get reward</strong><br />
           You need to describe how you make traveller fun like your schedule and date you will be free.
           For getting guests, We recommend you to write more detail Information
          </p>
         </div>
         <div className="guide-register-middle-right">
         <div className="guide-register-middle-right-form">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="I recommend you to write sentence that attract travellers" value={title} onChange={(e)=> setTitle(e.target.value)}required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Charge($)</Form.Label>
            <Form.Control type="text" placeholder="$" value={rate} onChange={(e)=> setRate(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Phone Number</Form.Label>
            <IntlTelInput
              preferredCountries={['JP', 'US']}
              defaultCountry={'JP'}
              defaultValue={'+81'}
              onChange={(data) => {
                setTelephone(data)
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
           <Form.Label>Comment about your guide</Form.Label>
           <Form.Control as="textarea" placeholder="Please write detail information like when you will be free, how you will guide, where you will take. " value={description} onChange={(e)=> setDescription(e.target.value)} rows="3" required />
          </Form.Group>
          <button class="ui youtube button" style={{ width: '100%', marginTop: '40px'}} onClick={scrollToTop}>
                Confirm
          </button>
         </div>
         </div>
        </div>
        <Form onSubmit={registerGuide}>
        <div className="confirm-page">
          <div className="confirm-right">
          <div className="confirm-right-card">
           <h2>Confirm</h2>
          <hr />
         <div className="confirm-right-card-first">
          <div style={{ width: '30%'}}>
           <strong>Basic Information</strong>
          </div>
          <div style={{ width: '70%'}}>
         <Form.Group>
           <Form.Label>Nick name</Form.Label>
           <Form.Control value={name} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          <Form.Group>
           <Form.Label>Email Address</Form.Label>
           <Form.Control value={email} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          <Form.Group>
           <Form.Label>Telephone</Form.Label>
           <Form.Control value={telephone.intlPhoneNumber} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          </div>
         </div>
         <hr />
         <div className="confirm-right-card-first">
           <div style={{ width: '30%'}}>
             <strong>Place</strong>
           </div>
           <div style={{ width: '70%'}}>
          <Form.Group>
           <Form.Label>country</Form.Label>
           <Form.Control value={country} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          <Form.Group>
           <Form.Label>city</Form.Label>
           <Form.Control value={city} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          </div>
          </div>
          <hr />
          <div className="confirm-right-card-first">
          <div style={{ width: '30%'}}>
           <strong>Guide Information</strong>
          </div>
          <div style={{ width: '70%'}}>
          <Form.Group>
           <Form.Label>title</Form.Label>
           <Form.Control value={title} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          <Form.Group>
           <Form.Label>description</Form.Label>
           <Form.Control value={description} type="text" placeholder="Readonly input here..." readOnly />
          </Form.Group>
          <Form.Group>
           <Form.Label>Photo</Form.Label>
           <Form.Control value={landscape} type="text" placeholder="Url" onChange={(e)=> setLandscape(e.target.value)}/>
          </Form.Group>
          </div>
          </div>
          </div>
          </div>
         <div className="confirm-left">
          <h2>Please check below before the registration</h2>
          <p style={{ marginTop: '30px', lineHeight: '28px'}}>
          Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
          We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
          </p>
          <p style={{ marginTop: '30px', lineHeight: '28px'}}>
          Under California Civil Code Section 1798 (California's Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties' direct marketing purposes.
          </p>
          <p style={{ marginTop: '30px', lineHeight: '28px'}}>
          If you'd like to request more information under the California Shine the Light law, and if You are a California resident, You can contact Us using the contact information provided below.
          </p>
          <p style={{ marginTop: '30px', lineHeight: '28px'}}>
          <p style={{ marginTop: '30px', lineHeight: '28px'}}>
          If you'd like to request more information under the California Shine the Light law, and if You are a California resident, You can contact Us using the contact information provided below.
          </p>
          </p>
          <div style={{ marginTop: '50px'}}>
          <input type="checkbox" checked={checked} onChange={()=> setChecked(prev => !prev)} /><span style={{ marginLeft: '20px'}}>Agree with our policy</span></div>
          <hr />
          <div style={{ width: "100%", textAlign: "right"}}>
          <button class="ui button" type="submit">
                Cancel
          </button>
          <button class="ui twitter button" type="submit" style={{ marginLeft: '15px'}} disabled={!checked}>
                Submit
          </button>
          </div>
         </div>
        </div>
        </Form>
        <div className="guide-register-explain">
        <Container >
          <Row>
            <Col md={4}>
              <h2><strong>Simple Payment</strong></h2>
              <p style={{ padding: '3%', lineHeight: '30px'}}>We are having one of the simplest payment system for making user easy to start guide and travel.
                 The system is like this, firstly you made a guide for traveller and after that you can get rewards from them.
                 if traveller were having more fun than they expected, you can get tip.
              </p>
            </Col>
            <Col md={4}>
              <h2><strong>Secure System</strong></h2>
              <p style={{ padding: '3%', lineHeight: '30px'}}>
                The payment, registration and reservation system We are using are difinetly secure, because the cloud system are protected by strong validation and hacking system.
                You can feel free to use your credit and Paypal or register your adress, email and telephone.
              </p>
            </Col>
            <Col md={4}>
              <h2><strong>About Tip system</strong></h2>
              <p style={{ padding: '3%', lineHeight: '30px'}}>
                The Tip system is so unique. After client's reservation, it is sure that you can get reward, but in addtion you have a potential to get another reward.
                If you provided good guide or tour, client can pay tip for you
              </p>
              <Link to="/aboutUs">Learn how to make money on Expo</Link>
            </Col>
          </Row>
        </Container>
        </div>
        <OurCompany />
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
         <div className="guide-image-header-iphone">
          <div className="guide-header-comments-iphone">
           <h3>Earn money by hosting guide</h3>
          </div>
         </div>
         <div className="guide-step-iphone">
          <div>
          <h3>How to earn as guide</h3>
          <p>To keep you, your home, and your belongings safe, we cover every booking with $1M USD in property damage protection and another $1M USD in insurance against accidents.</p>
          </div>
          <div>
            <h2>_____</h2>
            <h3>Steps to get reward</h3>
            <div className="step1">
             <h4>1.Register yourself as a guide for free</h4>
             <p>Share your guide experience and if you do not have it, no problem! We are going to support you.

             </p>
            </div>
            <div className="step1">
             <h4>2.Decide where to guide and How to guide</h4>
             <p>In Next step, you need to decide where you will guide and how unique your guide is.</p>
            </div>
            <div className="step1">
             <h4>3.Just wait for customer and get work</h4>
             <p>Every traveller can see your post after your register, so you just need to wait cuatomer's contact.</p>
            </div>
            <div className="step1">
              <h4>4.Welcome your customer</h4>
              <p>After getting contact with client, you have to provide huge fun with your guest.</p>
            </div>
          </div>
         </div>
         <div className="first-guide-form">
          <h3>Tell us about your place</h3>
          <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCountry(e.target.value)} required>
               <option>Country</option>
               <option value="Vietnam">Vietnam</option>
               <option value="Malaysia">Malaysia</option>
               <option value="Singapore">Singapore</option>
               <option value="Thailand">Thailand</option>
             </Form.Control>
            </Form.Group>
            <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCity(e.target.value)} required>
               <option>city</option>
               { country === 'Vietnam' ? (
                 <>
                 <option value="Hanoi">Hanoi</option>
                 <option value="Danang">Danang</option>
                 <option value="Hochiminh">Ho Chi minh</option>
                 </>
               ): null}
               { country === 'Malaysia' ? (
                 <>
                 <option value="Kualalumol">Kuala lumpol</option>
                 <option value="Malacca">Malacca</option>
                 <option value="Johor Bahru">Johor Bahru</option>
                 <option value="Borneo">Borneo</option>
                 </>
               ): null}
               { country === 'Singapore' ? (
                 <option value="Singapore">Singapore</option>
               ): null }
               { country === 'Thailand' ? (
                 <>
                 <option value="Bangkok">Bangkok</option>
                 <option value="Pucket">Pucket</option>
                 <option value="Koh Samui">Koh Samui</option>
                 <option value="Chiang Mai">Chiang Mai</option>
                 </>
               ): null}
             </Form.Control>
            </Form.Group>
           <Link to={`guidesetting?country=${country}&city=${city}`}>
           <button className="ui button youtube" type="submit" style={{ width: '100%'}}>
             Get started
           </button>
           </Link>
         </div>
         <div className="payment-section">
           <h3>About simple payment system</h3>
           <p>There’s no cost to sign up. Airbnb generally charges hosts a flat 3% per reservation, among the lowest fees in the industry.
           Once a guest checks in, we can send your money by Paypal, direct deposit, or other available methods.
           </p>
         </div>
         {/* <Row className="footer-image" style={{ marginTop: '40px'}}>
         <div className="footer-image-text">
         <h1 style={{ color: 'white'}}>Ready to earn ?</h1>
         
         </div>
        </Row> */}
        <StickyFooter />
        </MediaQuery>
        </>
    )
}
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
 }
};
export default GuideRegister
