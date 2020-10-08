import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const GuideList = () => {
    const [ guides, setGuides ] = useState([])
    useEffect(()=>{
      Axios.get('http://localhost:5000/api/guide')
      .then(res => {
          console.log(res.data)
          setGuides(res.data)
      })
      .catch(err => console.log(err))
      console.log(guides)
    },[])
    return (
        <>
        <Row className="guide-list-image">
          <div className="text">
          <h2>New Experience with us</h2> 
          <p>Settle in somewhere new. Discover nearby stays to live, work, or just relax.</p>
          <Button variant="light" style={{marginTop: '30px'}}>Get Started</Button>
          </div>
        </Row>
        <Row className="guide-list-container">
            <Col md={12}>
            <h1>All Guides List in Japan</h1>
            <h2>________</h2>
            </Col>
            { guides ? guides.map(guide =>(
               <Col md={4} className="guide-card">
                   <Card border="secondary" style={{ width: '100%' }}>
                      <Card.Header>Place:{' '}<strong>{guide.place}</strong></Card.Header>
                      <Card.Body>
                        <Card.Title>Nick name:<strong>{guide.name}</strong></Card.Title>
                        <Card.Text>
                          <p>{guide.description}</p>
                          <Link to={`/guide/${guide._id}`}><Button variant="primary">Detail</Button></Link>
                        </Card.Text>
                      </Card.Body>
                    </Card>
               </Col> 
            
            )):(
              <div className="ui active inline loader"></div>
            )
            }
        </Row>
        </>
    )
}

export default GuideList
