import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row, Button, Alert, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import IntlTelInput from 'react-bootstrap-intl-tel-input';
import { Typeahead } from 'react-bootstrap-typeahead'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import './Component.css';
import Axios from 'axios';
import Message from './Message';
import Modal from 'react-modal'
import MediaQuery from 'react-responsive';


Modal.setAppElement('#root')
const GuideRegister = () => {
    const [ name, setName ] = useState(null)
    const [ country, setCountry] = useState('');
    const [ city, setCity ] = useState('');
    const [ languages, setLanguages] = useState([]);
    const [ telephone, setTelephone ] = useState('+810000000')
    const [ email, setEmail] = useState('');
    const [ description, setDescription] = useState('');
    const [ isPro, setIsPro] = useState(false);
    const [ guide, setGuide ] = useState(null)
    const [ title, setTitle ] = useState('');
    const [ rate, setRate ] = useState('20');
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ message, setMessage ] = useState('')
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const options = [
      "English",
      "Spanish",
      "French",
      "Korean",
      "Chinese",
      "Other"
    ]
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
     if(userInfo){
       setName(userInfo.name)
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
        languages,
        title,
        description,
        isPro, 
        userId: userInfo._id
      }
      Axios.post('/api/guide',guide)
      .then(res => {
        console.log(res.data)
        setMessage(res.data)
      })
      .catch(err => console.log(err))
      Axios.put(`/api/user/guide/${userInfo._id}`)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        alert('Registered')
      })
      .catch(err => alert(err))
    }
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
        <Row className="guide-image-header">
         <Col md={6} className="guide-header-comments">
             <h1>Earn Money as guide</h1>
             <p>Tell us About you</p>
            <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCountry(e.target.value)}>
               <option>Country</option>
               <option value="vietnam">Vietnam</option>
               <option value="malaysia">Malaysia</option>
               <option value="singapore">Singapore</option>
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCity(e.target.value)}>
               <option>city</option>
               { country === 'vietnam' ? (
                 <>
                 <option value="hanoi">Hanoi</option>
                 <option value="danang">Danang</option>
                 <option value="hochimin">Ho Chi min</option>
                 </>
               ): null}
               { country === 'malaysia' ? (
                 <>
                 <option value="kuala lumol">Kuala lumpol</option>
                 <option value="malacca">Malacca</option>
                 </>
               ): null}
               { country === 'singapore' ? (
                 <option value="singapore">Singapore</option>
               ): null }
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setLanguages(e.target.value)}>
               <option>Language</option>
               <option value="English">English</option>
               <option value="Spanish">Spanish</option>
               <option value="Chinese">Chinese</option>
             </Form.Control>
             </Form.Group>
             <Form.Group id="formGridCheckbox">
               <Form.Check type="checkbox" label="Have a license" check={isPro} onChange={()=> setIsPro(!isPro)} />
             </Form.Group>
             <Form.Group>
            { userInfo ? ( 
              <Button variant="danger">Get Started</Button>):(
              <Link to="/login"><Button variant="primary">Login</Button></Link>
            )}
             </Form.Group>
         </Col>
        </Row>
        <Row className="guide-step">
            <Col md={6}>
             <h3>Why guide on this platform</h3>
             <h3>____</h3>
             <p>No matter what kind of home or room you have to share, Airbnb makes it simple and secure to host travelers. You’re in full control of your availability, prices, house rules, and how you interact with guests.</p>
            </Col>
            <Col md={6}>
             <h3>Steps to become guide</h3>
             <h3>____</h3>
             <p>To keep you, your home, and your belongings safe, we cover every booking with $1M USD in property damage protection and another $1M USD in insurance against accidents.</p>
            </Col>
        </Row>
        <Row className="guide-register">
            <Col md={{ span: 8, offset: 2 }}>
            <h1>Register as a guide</h1>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nick Name</Form.Label>
                <Form.Control type="text" placeholder="NickName" value={name} onChange={(e)=> setName(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}required />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="I recommend you to write sentence that attract travellers" value={title} onChange={(e)=> setTitle(e.target.value)}required />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Rate($)</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" value={rate} onChange={(e)=> setRate(e.target.value)} required />
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
              <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCountry(e.target.value)}>
               <option>Country</option>
               <option value="vietnam">Vietnam</option>
               <option value="malaysia">Malaysia</option>
               <option value="singapore">Singapore</option>
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCity(e.target.value)}>
               <option>city</option>
               { country === 'vietnam' ? (
                 <>
                 <option value="Hanoi">Hanoi</option>
                 <option value="Danang">Danang</option>
                 <option value="Hochiminh">Ho Chi minh</option>
                 </>
               ): null}
               { country === 'malaysia' ? (
                 <>
                 <option value="Kualalumol">Kuala lumpol</option>
                 <option value="Malacca">Malacca</option>
                 </>
               ): null}
               { country === 'Singapore' ? (
                 <option value="Singapore">Singapore</option>
               ): null }
             </Form.Control>
             </Form.Group>
              <Form.Group>
                 <Form.Label>Languages</Form.Label>
                  <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="name"
                    multiple
                    onChange={setLanguages}
                    options={options}
                    placeholder="Choose several states..."
                    selected={languages}
                    required
                  />
               </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description(Something special)</Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e)=> setDescription(e.target.value)} rows="3" required />
              </Form.Group>
              <Form.Group id="formGridCheckbox">
               <Form.Check type="checkbox" label="Have a license" check={isPro} onChange={()=> setIsPro(!isPro)} />
             </Form.Group>
              <Form.Group>
              { userInfo ? ( 
              <Button variant="danger" type="submit" onClick={()=> setIsModalOpen(prev => !prev)}>Confirm</Button>):(
              <Link to="/login"><Button variant="primary">Login</Button></Link>
            )}
             { message ? <Alert variant="primary">{message}</Alert>: null}
              </Form.Group>
            </Col>
        </Row>
        <hr />
        <Row className="footer-image">
         <div className="footer-image-text">
         <h1 style={{ color: 'white'}}>Ready to earn ?</h1>
         <Button style={{ background: 'white', color: '#000',marginTop: '30px'}}>Get Started</Button>
         </div>
        </Row>
        <Modal
          isOpen={isModalOpen}
          style={customStyles}
          onRequestClose={()=> setIsModalOpen(false)}
          contentLabel="Example Modal">
          <Form onSubmit={registerGuide}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nick Name</Form.Label>
                <Form.Control type="text" placeholder="NickName" value={name} onChange={(e)=> setName(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}required />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="I recommend you to write sentence that attract travellers" value={title} onChange={(e)=> setTitle(e.target.value)}required />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Rate($)</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" value={rate} onChange={(e)=> setRate(e.target.value)} required />
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
            <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCountry(e.target.value)}>
               <option>Country</option>
               <option value="Vietnam">Vietnam</option>
               <option value="Malaysia">Malaysia</option>
               <option value="Singapore">Singapore</option>
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCity(e.target.value)}>
               <option>city</option>
               { country === 'Vietnam' ? (
                 <>
                 <option value="Hanoi">Hanoi</option>
                 <option value="Danang">Danang</option>
                 <option value="Hochiminh">Ho Chi min</option>
                 </>
               ): null}
               { country === 'Malaysia' ? (
                 <>
                 <option value="Kualalumol">Kuala lumpol</option>
                 <option value="Malacca">Malacca</option>
                 </>
               ): null}
               { country === 'Singapore' ? (
                 <option value="Singapore">Singapore</option>
               ): null }
             </Form.Control>
             </Form.Group>
              <Form.Group>
                 <Form.Label>Languages</Form.Label>
                  <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="name"
                    multiple
                    onChange={setLanguages}
                    options={options}
                    placeholder="Choose several states..."
                    selected={languages}
                    required
                  />
               </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description(Something special)</Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e)=> setDescription(e.target.value)} rows="3" required />
              </Form.Group>
              <Form.Group id="formGridCheckbox">
               <Form.Check type="checkbox" label="Have a license" check={isPro} onChange={()=> setIsPro(!isPro)} />
             </Form.Group>
              <Button variant="danger" type="submit">Register</Button>
             </Form> 
        </Modal>
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
         <Row className="footer-image" style={{ marginTop: '40px'}}>
         <div className="footer-image-text">
         <h1 style={{ color: 'white'}}>Ready to earn ?</h1>
         
         </div>
        </Row>
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
