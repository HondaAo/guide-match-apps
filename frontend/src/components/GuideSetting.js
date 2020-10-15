import React, { useContext, useEffect, useState } from 'react'
import { parse } from 'query-string';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Component.css'
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import IntlTelInput from 'react-bootstrap-intl-tel-input';
import Axios from 'axios';
import { AuthContext } from '../auth/AuthState';

const GuideSetting = ({ location }) => {
    const query = parse(location.search);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ name, setName ] = useState(null)
    const [ country, setCountry] = useState('');
    const [ city, setCity ] = useState('');
    const [ languages, setLanguages] = useState([]);
    const [ telephone, setTelephone ] = useState('')
    const [ email, setEmail] = useState('');
    const [ description, setDescription] = useState('');
    const [ isPro, setIsPro] = useState(false);
    const [ guide, setGuide ] = useState(null)
    const [ title, setTitle ] = useState('');
    const [ rate, setRate ] = useState('20');
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
    },[])
    const onSubmit = e =>{
        e.preventDefault();
        const guide = {
          name,
          email,
          telephone: telephone.intlPhoneNumber,
          description,
          title,
          rate,
          isPro: false,
          userId: userInfo._id,
          city: query.city,
          country: query.country,
          image: userInfo.image
        }
        Axios.post('http://localhost:5000/api/guide',guide)
        .then(res => {
            localStorage.setItem('guideInfo',JSON.stringify(res.data))
            alert('Registered!!')
            window.location = '/guide'
        })
        .catch(err => console.log(err))
        Axios.put(`http://localhost:5000/api/user/guide/${userInfo._id}`,guide._id)
        .then(res => {
          console.log(res.data)
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          alert('Registered')
        })
        .catch(err => alert(err))
    }
    return (
        <div className="guide-setting-page">
         <div className="header">
          <Link to={`/guide`}> <ArrowBackIosIcon /></Link>
         </div>
         <h3>Guide setting page</h3>
         <Form onSubmit={onSubmit}>
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
              <Button variant="danger" size="lg" active fullWidth type="submit">
                Submit
              </Button>
         </Form>
        </div>
    )
}

export default GuideSetting
