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
        <Row style={{ padding: '5%'}}>
         <Col md={{ span: 6, offset: 3}}>
          <strong>Sign In</strong>
          <hr />
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
              <button className="ui button youtube" style={{ width: '100%'}} type="submit">Sign In</button>
          </Form>
          <Row className="py-3">
              <Col>
               already having an account ? <Link to='/register'>Register</Link>
              </Col>
          </Row>
          </Col>
        </Row>
    )
}

export default Login
