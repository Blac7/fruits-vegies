import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { isAuthenticated } from '../auth/Auth'
import { getCartFruits, emptyCart, getTotal } from '../components/CartHelpers'
import { API } from '../Config'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({secret, data}) => {
    const stripe = useStripe()
    const elements = useElements()
    //const [clientSecret, setClientSecret] = useState(secret)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState('')
    const [success, setSucess] = useState('')
    const {user, token} = isAuthenticated()
    const name = `${user.firstName} ${user.lastName}`

    const createOrder = async (id, token, orderData) => {
        const url = `${API}/order/create/${id}`
        return await axios.post(
                url, 
                JSON.stringify({order: orderData}), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } 
            })
            .then(order => console.log("Order Created."))
            .catch(err => console.log("Error order Creation: ", err))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!stripe || !elements) {
            setError("Stripe.js has not yet loaded.")
            return
        }
        const result = await stripe.confirmCardPayment(
            secret, { 
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: name
                    }
                }
            }
        )
        if(result.error) {
           setError(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                setSucess("Payment Successful")
                const fruits = getCartFruits()
                const orderData = {
                    fruits: fruits,
                    transaction_id: result.paymentIntent.id,
                    address: data.address,
                    amount: data.totalPrice,
                    totalItems: data.totalItems
                }
                createOrder(user._id, token, orderData)
                emptyCart(() => {
                    console.log("Payment Success. Empty Cart")
                })
                setRedirect(true)
            }
        }
    }

    const displayError = error => {
        return error && (
            <div className="alert alert-danger" role="alert">{error}</div>
        )
    }

    const displaySuccess = success => {
        return success && (
            <div className="alert alert-info" role="alert">{success}</div>
        )
    }

    const redirectTo = redirect => {
        return redirect && (
            <Redirect to={`/myorders`} />
        )
    }

    return (
        <form className="container d-grid gap-2 p-2">
            {displayError(error)}
            {displaySuccess(success)}
            {redirectTo(redirect) }
            <h6 className="mb-1">Make Payment</h6>
            <p className="total-price mb-3">Total Amount - Rs.{getTotal()}</p>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button className="btn btn-outline-primary" onClick={handleSubmit} disabled={!stripe}>Confirm order</button>
        </form>
    )
}

export default CheckoutForm
