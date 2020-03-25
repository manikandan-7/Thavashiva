import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {withRouter} from 'react-router-dom'
import STRIPE_PUBLISHABLE from './stripe';
import PAYMENT_SERVER_URL from './server';

const CURRENCY = 'INR';

const fromDollarToCent = amount => parseInt(amount * 100);

const successPayment = async(data) => {
    console.log(data.data.success.amount);
    const response = await fetch('http://localhost:9000/checkpayment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({subscription:data.data.success.amount})
      })

  alert('Payment Successful');
  data.history.push('/')
};

const errorPayment = data => {
    console.log(data)
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: (amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkoutorder = ({ name, description, amount }) =>
  <StripeCheckout
     name="a"
     description="hi"
     amount={1000}
     token={onToken(amount, description)}
     currency={CURRENCY}
     stripeKey="pk_test_LSKxLUOC5NqU8bbOHA2SNIkI00dTgGEV0n"
     zipCode
     email="hi"
     allowRememberMe
  />

export default withRouter(Checkoutorder);