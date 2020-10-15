import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState'

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
        <div style={{ padding: '5%'}}>
          <h1>Sign Up</h1>
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                  <Form.Label>
                      Name
                  </Form.Label>
                  <Form.Control type="text" placeholder="name" onChange={(e)=> setName(e.target.value)}>
                  </Form.Control>
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
                  Sign up
              </Button>
          </Form>
          <Row className="py-3">
              <Col>
               New Customer ? <Link to='/login'>Login</Link>
              </Col>
          </Row>
        </div>
    )
}

export default Register
