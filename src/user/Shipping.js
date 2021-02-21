import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Layout from '../components/Layout'
import CheckoutForm from './CheckoutForm'
import { API, REACT_APP_STRIPE_PUBLIC_KEY  } from '../Config'
import { isAuthenticated } from '../auth/Auth'
import { getTotal, itemTotal } from '../components/CartHelpers'

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY)

const Shipping = () => {
    const [address, setAddress] = useState({
        personName: "",
        phoneNumber: "",
        addressLN1: "", 
        addressLN2: "",  
        city: "", 
        pincode: "", 
        state: ""
    })
    const [displayShipping, setDisplayShipping] = useState(false)
    const [displayForm, setDisplayForm] = useState(true)
    const [run, setRun] = useState(false)
    const [clientSecret, setClientSecret] = useState()
    const [data, setData] = useState({
        totalItems: '',
        address: '',
        totalPrice: ''
    })

    const {personName, phoneNumber, addressLN1, addressLN2, city, pincode, state} = address
    const { user, token } = isAuthenticated()
    const totalPrice = getTotal()
    const totalItems = itemTotal()

    const handleChange = name => event => {
        setAddress({...address, [name]: event.target.value})
    }

    const displayShippingPayment = displayShipping => {
        return displayShipping && (
            <div className="row">
                <div className="col-md-6">
                    {displayShippingAddress()}
                </div>
                <div className="col-md-6">
                    <Elements stripe={stripePromise}>
                        <div className="payment-box mx-2 p-3">
                            <CheckoutForm secret={clientSecret} data={data} />
                        </div>
                    </Elements>
                </div>
            </div>
        )
    }

    const displayShippingAddress = () => {
        return (
            <div className="shipping-details p-4">
                <h5 className="mb-4 mx-2">Shipping Address</h5>
                <div className="shipping-add-details m-2">
                    <ul className="list-group mb-3">
                        <li className="list-group-item">Person Name: {address.personName}</li>
                        <li className="list-group-item">Phone Number: {address.phoneNumber}</li>
                        <li className="list-group-item">Address Line 1: {address.addressLN1}</li>
                        <li className="list-group-item">Address Line 2: {address.addressLN2}</li>
                        <li className="list-group-item">{address.city}-{address.pincode}, {address.state}</li>
                    </ul>
                    <button onClick={(event) => updateAddress(event)} className="btn btn-outline-primary">
                        Edit Address
                    </button>
                </div>
            </div>
        )
    }

    const displayShippingForm = displayForm => {
        return displayForm && (
            <div className="shipping-from p-3">
                <div className="m-2">Please Enter the Shipping Address</div>
                <form className="row g-2 m-3">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('personName')} type="text" id="floatingPersonName" className="form-control" value={personName}/>
                            <label htmlFor="floatingPersonName">Person Name</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('phoneNumber')} type="text" id="floatingPhoneNumber" className="form-control" value={phoneNumber} maxLength="10"/>
                            <label htmlFor="floatingPhoneNumber">Phone Number</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('addressLN1')} type="text" id="floatingAddressLN1" className="form-control" value={addressLN1}/>
                            <label htmlFor="floatingAddressLN1">Address Line 1</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('addressLN2')} type="text" id="floatingAddressLN2" className="form-control" value={addressLN2}/>
                            <label htmlFor="floatingAddressLN2">Address Line 2</label>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('city')} type="text" id="floatingCity" className="form-control" value={city}/>
                            <label htmlFor="floatingCity">City/ Town</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('pincode')} type="text" id="floatingPincode" className="form-control" value={pincode} maxLength="6"/>
                            <label htmlFor="floatingPincode">Pin Code</label>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-floating mb-3">
                            <input onChange={handleChange('state')} type="text" id="floatingState" className="form-control" value={state}/>
                            <label htmlFor="floatingState">State</label>
                        </div>
                    </div>
                    <button onClick={(event) => addPaymentDetails(event)} className="btn btn-outline-primary mb-3">
                        Add Shipping Address
                    </button>
                </form>               
            </div>
        )
    }

    const sendPaymentDetails = async (data) => {
        const url = `${API}/user/paymentInfo/${user._id}`
        return (
            await axios.post(url, JSON.stringify(data), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } 
            }).then((secret) => setClientSecret(secret.data.client_secret))
            .catch((err) => console.log("sendPaymentDetails: ", err))
        )
    }

    const addPaymentDetails = event => {
        event.preventDefault()
        setDisplayShipping(true)
        setDisplayForm(false)
        const data = {
            totalItems: totalItems,
            address: address,
            totalPrice: totalPrice
        }
        setData(data)
        sendPaymentDetails(data)
    }

    const updateAddress = event => {
        event.preventDefault()
        setDisplayShipping(false)
        setDisplayForm(true)
    }

    return (
        <div>
            <Layout>
                <div className="container">
                    <div className="shipping-address m-2">
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="m-4">
                                    {displayShippingForm(displayForm)}
                                </div>
                                <div className="display-shipping-address p-2 mb-3">
                                    {displayShippingPayment(displayShipping)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Shipping
