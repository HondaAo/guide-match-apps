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

const GuideRegister = () => {
    const [ name, setName ] = useState(null)
    const [ place, setPlace] = useState('');
    const [ languages, setLanguages] = useState([]);
    const [ language, setLanguage ] = useState('');
    const [ telephone, setTelephone ] = useState('+810000000')
    const [ email, setEmail] = useState('');
    const [ description, setDescription] = useState('');
    const [ isPro, setIsPro] = useState(false);
    const [ guide, setGuide ] = useState(null)
    const [title, setTitle ] = useState('');
    const [ rate, setRate ] = useState('free');
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ message, setMessage ] = useState('')
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
        place,
        languages,
        title,
        description,
        isPro, 
        userId: userInfo._id
      }
      Axios.post('http://localhost:5000/api/guide',guide)
      .then(res => {
        console.log(res.data)
        setMessage(res.data)
      })
      .catch(err => console.log(err))
      Axios.put(`http://localhost:5000/api/user/guide/${userInfo._id}`)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        window.location = '/guideList'
      })
      .catch(err => console.log(err))
    }
    return (
        <>
        <Row className="guide-image-header">
         <Col md={6} className="guide-header-comments">
             <h1>Earn Money as guide</h1>
             <p>Tell us About you</p>
            <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setPlace(e.target.value)}>
               <option>Place</option>
               <option value="Tokyo">Tokyo</option>
               <option value="Osaka">Osaka</option>
               <option value="Kyoto">Kyoto</option>
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Control size="sm" as="select" required onChange={(e)=> setLanguage(e.target.value)}>
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
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Place</Form.Label>
                <Form.Control as="select" value={place} onChange={(e)=> setPlace(e.target.value)} required>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Osaka">Osaka</option>
                  <option value="Kyoto">Kyoto</option>
                  <option value="Kanagawa">Kanagawa</option>
                  <option value="Fukuoka">Fukuoka</option>
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
              <Button variant="danger" type="submit">Register</Button>):(
              <Link to="/login"><Button variant="primary">Login</Button></Link>
            )}
             { message ? <Alert variant="primary">{message}</Alert>: null}
              </Form.Group>
             </Form>
            </Col>
        </Row>
        <hr />
        <Row className="footer-image">
         <div className="footer-image-text">
         <h1 style={{ color: 'white'}}>Ready to earn ?</h1>
         <Button style={{ background: 'white', color: '#000',marginTop: '30px'}}>Get Started</Button>
         </div>
        </Row>
        </>
    )
}

export default GuideRegister
