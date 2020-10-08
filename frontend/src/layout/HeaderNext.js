import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Layout.css'

const HeaderNext = () => {
    return (
        <div className="header-next">
        <Container>
        <Row>
        <Col md={3}><Link to="/location">Location</Link></Col>
         <Col md={3}><Link to="/guide">Become guide</Link></Col>
         <Col md={3}><Link to="/guideList">look for a guide</Link></Col>
         <Col md={3}><Link to="/aboutUs">Our service</Link></Col>
         </Row>
         </Container>
        </div>
    )
}

export default HeaderNext
