import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {withRouter} from 'react-router-dom'
import STRIPE_PUBLISHABLE from './stripe';
import PAYMENT_SERVER_URL from './server';

const CURRENCY = 'INR';

const fromDollarToCent = amount => parseInt(amount * 100);



const errorPayment =async(data) => {
   
  const response1 = await fetch('http://localhost:9000/addorders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: localStorage.getItem("current")
    })
});
const body = await response1.text();
console.log(body)  
console.log(data)
};

const onToken = (props) => token =>{

  axios.post(PAYMENT_SERVER_URL,
    {
      description:props.description,
      source: token.id,
      currency: CURRENCY,
      amount: (props.amount)
    })
    .then(async(data)=>{
      console.log(data)
   
    })
    .catch(errorPayment);

alert('Payment Successful');
props.history.push('/')
  }
const Checkout = (props) =>
  <StripeCheckout
     name={props.name}
     description={props.description}
     amount={fromDollarToCent(props.amount)}
     token={onToken(props)}
     currency={CURRENCY}
     stripeKey="pk_test_LSKxLUOC5NqU8bbOHA2SNIkI00dTgGEV0n"
     zipCode
     email={props.name}
     allowRememberMe
  />

export default withRouter(Checkout);