import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthState'

const Register = ({history}) => {
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const { register,setUserInfo,userInfo } = useContext(AuthContext);
    useEffect(()=>{
        setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
        if(userInfo){
          history.push('/guide')
        }
      },[userInfo])
    const submitHandler = (e)=>{
        e.preventDefault();
        const user = {
            name,
            email,
            password
        }
        register(user);

    }
    console.log(userInfo)
    return (
        <Row style={{ padding: '5%'}}>
         <Col md={{ span: 6, offset: 3}}>
          <strong>Sign Up</strong>
          <hr />
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                  <Form.Label>
                      Name
                  </Form.Label>
                  <Form.Control type="text" placeholder="name" onChange={(e)=> setName(e.target.value)} required>
                  </Form.Control>
                  <Form.Label>
                      Email Address
                  </Form.Label>
                  <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} required>
                  </Form.Control>
                  <Form.Label>
                      Password
                  </Form.Label>
                  <Form.Control type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)} required>
                  </Form.Control>
              </Form.Group>
              <button className="ui button youtube" style={{ width: '100%'}} type="submit">Register</button>
          </Form>
          <Row className="py-3">
              <Col>
               New Customer ? <Link to='/login'>Login</Link>
              </Col>
          </Row>
          </Col>
        </Row>
    )
}

export default Register
