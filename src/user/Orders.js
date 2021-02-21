import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Layout from '../components/Layout'
import { isAuthenticated } from '../auth/Auth'
import { API } from '../Config'

const Orders = (props) => {
    const [orders, setOrders] = useState()
    // const [address, setAddress] = useState()
    // const [fruits, setFruits] = useState()
    const { user, token } = isAuthenticated()

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = () => {
        const url = `${API}/order/${user._id}`
        axios.get(url, {
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
        }).then(ord => {
            console.log(ord.data)
            setOrders(ord.data)
            // setAddress(ord.data[0].address)
            // setFruits(ord.data[0].fruits)
        })
        .catch(err => console.log(err))
    }

    const showAddress = address => {
        return address && (
            <div className="order-shipping mb-3">
                <ul className="list-group">
                    <li className="list-group-item list-header">Shipping Details</li>
                    <li className="list-group-item">Person Name: {address.personName}</li>
                    <li className="list-group-item">Phone Number: {address.phoneNumber}</li>
                    <li className="list-group-item">Address Line 1: {address.addressLN1}</li>
                    <li className="list-group-item">Address Line 2: {address.addressLN2}</li>
                    <li className="list-group-item">{address.city}-{address.pincode}, {address.state}</li>
                </ul>
            </div>
        )
    }

    const showFruits = fruits => {
        return fruits &&  fruits.map((fruit, i) => (
            <div key={i} className="col-lg-6 col-sm-4 col-xs-6 mb-3">
                <div className="order-fruit">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-xxl-6 col-xl-12">
                                <img src={fruit.imagesURl[1]} alt={fruit.name}/>
                            </div>
                            <div className="col-xxl-6 col-xl-12">
                                <div className="card-body">
                                    <h6 className="card-title">{fruit.name}</h6>
                                    <p className="card-text">Price: Rs.{fruit.price}</p>
                                    <p className="card-text">Quantity: {fruit.count}kgs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
        
    }

    const showOrderDetails = () => {
        return orders && orders.map((order, i) => (
            <div key={i} className="col-md-6">
                <div className={i===0 ? `order-details latest-order mb-3` : `order-details mb-3`}>
                    <div className="order card">
                        <div className="card-header">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="m-2">Order ID - {order._id}</h5>
                                <small>{moment(order.createdAt).fromNow()}</small>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group mb-3">
                                        <li className="list-group-item list-header">Order Details</li>
                                        <li className="list-group-item">Status: {order.status}</li>
                                        <li className="list-group-item">Total Amount: Rs.{order.amount}</li>
                                        <li className="list-group-item">Transaction ID: {order.transaction_id}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    {showAddress(order.address)}
                                </div>
                            </div>
                            <div className="order-fruits p-2">
                                <p className="list-header mb-2">Ordered Items</p>
                                <div className="row">
                                    {showFruits(order.fruits)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    const showNoOrders = () => {
        return !orders && (
            <div className="m-2">
                <h6>No Previous Orders</h6> <br/>
            </div>
        )
    }

    return (
        <div>
            <Layout>
                <div className="container-fluid">
                    <div className="my-order m-4 p-3">
                        <div className="my-order-header p-3">
                            <h5>My Orders</h5>
                        </div>
                        <div className="my-order m-1 p-2">
                            <div className="row">
                                {showOrderDetails()}
                            </div>
                            {showNoOrders()}
                            <Link to='/shop'>
                                <button className="btn btn-outline-secondary m-2">Continue Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Orders
