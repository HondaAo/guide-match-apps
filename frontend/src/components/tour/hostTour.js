import { Link } from 'react-router-dom'
import React from 'react'
import './Tour.css'
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthState';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Axios from 'axios';
import { Helmet } from 'react-helmet';

const HostTour = () => {
    const [ page, setPage ] = useState(0);
    const [ country, setCountry ] = useState('');
    const [ city, setCity ] = useState('');
    const [ date, setDate ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ charge, setCharge ] = useState('');
    const [ file, setFile ] = useState(null);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    const submit = () =>{
        const formData = new FormData()
        formData.append('host', userInfo._id)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('city',city)
        formData.append('country',country)
        formData.append('date',date)
        formData.append('charge',charge)
        formData.append('image',file)
          const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
          };
        Axios.post(`/api/tour`,formData,config)
        .then(res => {
          console.log(res.data)
          setPage(5)
        })
        .catch(err => alert(err))
    }
    return (
      <>
      <Helmet>
       <title>Expo Let's host unique tour by yourself</title>
      </Helmet>
        <div>
          <header className="tour-host-header">
            <div className="tour-host-header-left">
              <h2><strong><Link to="/" className="link">Expo</Link></strong></h2>
            </div>
            <div className="tour-host-header-right">
              {userInfo && <h5><Link to={`/mypage/${userInfo._id}`} className="tour-link">Mypage</Link></h5>  }
              <h5><Link to="/tour" className="tour-link">Outline</Link></h5>  
            </div>
         </header> 
         <div className="tour-host-screen">
         <div className="tour-host-screen-left">
         { page === 0 && (
             <>
             <div className="tour-form-title">
             <h2>Where are you going to host a tour?</h2>
             <p>{page + 1}/4</p>
             </div>
             <div className="tour-form">
             <Form.Group className="form-group">
             <Form.Label className="form-label">Select a country</Form.Label>
             <Form.Control size="sm" as="select" required onChange={(e)=> setCountry(e.target.value)} required>
               <option>Country</option>
               <option value="Vietnam">Vietnam</option>
               <option value="Malaysia">Malaysia</option>
               <option value="Singapore">Singapore</option>
               <option value="Thailand">Thailand</option>
             </Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
             <Form.Label className="form-label">Select a city</Form.Label>
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
            </div>
             </>
         )}
         { page === 1 && (
             <>
            <div className="tour-form-title">
             <h2>Charge and Date setting</h2>
             <p>{page + 1}/4</p>
             </div>
             <div className="tour-form">
             <Form.Group className="form-group">
             <Form.Label className="form-label">Charge($)</Form.Label>
              <Form.Control type="number" placeholder="$" value={charge} onChange={(e)=> setCharge(e.target.value)} required />
            </Form.Group>
            <Form.Group className="form-group">
             <Form.Label className="form-label">Tour date</Form.Label>
             <Form.Control type="date" placeholder="date" value={date} onChange={(e)=> setDate(e.target.value)} required/>
            </Form.Group>
            </div>
             </>
         )}
         { page === 2 && (
             <>
            <div className="tour-form-title">
             <h2>Make your tour looking interesting!</h2>
             <p>{page + 1}/4</p>
             </div>
             <div className="tour-form">
             <Form.Group className="form-group">
             <Form.Label className="form-label">Title</Form.Label>
              <Form.Control type="text" placeholder="your tour title" value={title} onChange={(e)=> setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="form-group">
             <Form.Label className="form-label">Comment</Form.Label>
             <Form.Control as="textarea" placeholder="Please tell us about your tour" value={description} onChange={(e)=> setDescription(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="form-group">
             <Form.Label className="form-label">Image</Form.Label>
             <Form.File id="exampleFormControlFile1" label="Photo" type="file" onChange={(e)=> setFile(e.target.files[0])} />
            </Form.Group>
            </div>
             </>
         )}
         { page === 3 && (
             <>
             <div className="tour-form-title">
             <h2>Confirm Page</h2>
             <p>{page + 1}/4</p>
             </div>
             <div className="tour-form">
             
            </div>
             </>
         )}
         { page === 5 && (
             <>
             <div className="">
                 <h2>Successfully registered</h2>
             </div>
             </>
         )}
         <div className="tour-form-bottom">
             <hr />
             <div className="tour-form-bottom-buttons">
              <p onClick={() => {
                  if( page !== 0){
                  setPage(prev => prev - 1)
                  }
                }}><ArrowBackIosIcon />Back</p>
             { page !== 3 && <div className="ui button youtube" onClick={() => { setPage(prev => prev +1 )}}>
                  Next
              </div>}
              { page === 3 && <div className="ui button youtube" onClick={submit}>
                  Go registration
              </div>}
             </div>
         </div>
         </div>
         <div className="tour-host-screen-right">

         </div>
         </div>
        </div>
      </>
    )
}

export default HostTour
