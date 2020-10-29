import { Button } from '@material-ui/core'
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row ,FormGroup} from 'react-bootstrap';
import { AuthContext } from '../auth/AuthState';

const Review = ({ match }) => {
    const guideId = match.params.id
    const [ name, setName ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ rating, setRating ] = useState(5);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(() => {
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    }, [])
    const onSubmit = (e)=>{
        e.preventDefault();
        const review = {
            name,
            comment,
            rating,
            userId: userInfo._id
        }
        Axios.post(`/api/review/${guideId}`,review)
        .then(res => alert(res.data))
        .catch(err => console.log(err))
    }
    return (
        <Row style={{ padding: "5%"}}>
         <Col md={{ span: 6, offset: 3}}>
         <h2 style={{ marginBottom: '30px'}}>review page</h2>
             <Form onSubmit={onSubmit}>
                 <FormGroup >
                 <Form.Label>Name</Form.Label>
                 <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter your name" />   
                 </FormGroup>
                 <Form.Group controlId="formBasicEmail">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" rows={3} value={comment} onChange={(e)=> setComment(e.target.value)} required />
                 </Form.Group>
                 <FormGroup>
                     <Form.Label>Rating</Form.Label>
                     <Form.Control as="select" value={rating} onChange={(e)=> setRating(e.target.value)}>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                     </Form.Control>
                 </FormGroup>
                 <FormGroup>
                     <Button type="submit" variant="contained" color="primary">
                       Send
                     </Button>
                 </FormGroup>
             </Form>
         </Col>   
        </Row>
    )
}

export default Review
