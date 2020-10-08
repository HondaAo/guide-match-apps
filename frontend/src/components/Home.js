import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Component.css'
import image from './pexels-photo-207385.jpeg'

const Home = () => {
    const [ guides, setGuides ] = useState([])
    const [ place, setPlace ] = useState('Kyoto')
    useEffect(()=>{
        Axios.get(`http://localhost:5000/api/guide/place/${place}`)
        .then(res => {
            setGuides(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <>
         <Row className="image-header">
            <Col md={6} className="header-comments">
             <h1>Lets Meet New Exprience</h1>
             <p>We are gonna support your new Expreience with local guide <br />Plus, you can become guide too</p>
            </Col>
         </Row>
         <div className="aboutUs">
             <h2>_____</h2>
             <h1>About us</h1>
             <p style={{ marginTop: '40px', textAlign: 'left'}}>Whether you’re looking for a treehouse for the weekend or an entire home for the whole family, a warm welcome awaits. Behind every stay is a real person who can give you the details you need to check in and feel at home.
             Airbnb Experiences are not your typical tour. Whether you’re on a trip, exploring your own city, or staying at home, learn something new from an expert host. Choose from dance lessons, pasta-making—even yoga with goats.</p>
         </div>  
         <div className="pickedUp">
            <Row>
                <Col md={5}>
                <div className="pickedHeader">
                  <h3>Picked spot for newer traveller</h3>
                  <h2>________</h2>
                  <h5>Kyoto</h5>
                  </div>
                 <img src="https://images.unsplash.com/photo-1567515702357-3d6ba213150c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" height="45%" width="auto" alt="kyoto" />
                </Col>
                <Col md={{ span: 6, offset: 1 }}>
                 <h3>Recommended Guide List</h3>
                 { guides ? guides.map(guide => (
                    <Card style={{ marginButtom : '30px'}}>
                     <Card.Header>Name:{' '} {guide.name}</Card.Header>
                     <Card.Body>
                       <Card.Title>{guide.title}</Card.Title>
                       <Card.Text>
                         {guide.description}
                       </Card.Text>
                       <Link to={`/guide/${guide._id}`}><button className="ui right labeled icon button">
                         <i className="right arrow icon"></i>
                         Check detail
                       </button></Link>
                     </Card.Body>
                   </Card>
                 )) : (
                    <div className="ui active inline loader"></div>
                 )}
                </Col>
            </Row>
            </div>
            <div className="home-image">
               <h2>Having a superb holiday!!</h2>  
            </div>
         
        </>
    )
}

export default Home
