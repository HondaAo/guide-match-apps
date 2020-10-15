import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState'

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const { login, userInfo, setUserInfo } = useContext(AuthContext);
    const submitHandler = (e)=>{
        e.preventDefault();
        const user = {
            email,
            password
        }
        login(user);
    }
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      if(userInfo){
        history.push('/guide')
      }
    },[userInfo,history])
    return (
        <div style={{ padding: '5%'}}>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                  <Form.Label>
                      Email Address
                  </Form.Label>
                  <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}>
                  </Form.Control>
                  <Form.Label>
                      Password
                  </Form.Label>
                  <Form.Control type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                  Sign In
              </Button>
          </Form>
          <Row className="py-3">
              <Col>
               New Customer ? <Link to='/register'>Register</Link>
              </Col>
          </Row>
        </div>
    )
}

export default Login
