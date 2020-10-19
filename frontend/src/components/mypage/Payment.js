import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { AuthContext } from '../../auth/AuthState'

const Payment = ({match}) => {
    const guideId = match.params.id
    const [ sdkReady, setSdkReady ] = useState(false)
    const [ guide, setGuide ] = useState({})
    const { userInfo, setUserInfo } = useContext(AuthContext); 
    useEffect(()=>{
        setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
         Axios.get(`/api/guide/${guideId}`)
         .then(res => {
             console.log(res.data)
             setGuide(res.data)})
         .catch(err => console.log(err))
     const addPaymentScript = async()=>{
         const { data: clientId } = await Axios.get('/api/config/paypal')
         const script = document.createElement('script')
         script.type = 'text/javascript'
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async = true
         script.load = () => {
             setSdkReady(true)
         }
         document.body.appendChild(script)

        }
     addPaymentScript();
    },[])
    const paymentHandler = (paymentResult) => {
        console.log(paymentResult)
        Axios.put(`/api/guide/payment?guide=${guide._id}&client=${userInfo._id}`)
        .then(res => alert(res.data))
        .catch(err => alert(err))
    }
    return (
        <div>
         <PayPalButton amount="20" onSuccess={paymentHandler} />

        </div>
    )
}

export default Payment
