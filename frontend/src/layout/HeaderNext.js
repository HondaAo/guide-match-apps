import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import './Layout.css'

const HeaderNext = () => {
    return (
        <MediaQuery query="(min-width: 767px)">
        <div className="header-next">
        <Container>
        <Row>
        <Col md={3}><Link to="/location">Location</Link></Col>
         <Col md={3}><Link to="/guide">Become guide</Link></Col>
         <Col md={3}><Link to="/guideList">look for a guide</Link></Col>
         <Col md={3}><Link to="/aboutUs">Contact us</Link></Col>
         </Row>
         </Container>
        </div>
        </MediaQuery>
    )
}

export default HeaderNext
