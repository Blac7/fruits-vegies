import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Layout from '../components/Layout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const AllOrders = () => {
    const [orders, setOrders] = useState()
    const [statusValues, setStatusValues] = useState()
    const { user, token } = isAuthenticated()

    const getAllOrders = () => {
        const url = `${API}/order/list/${user._id}`
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(orders => setOrders(orders.data))
        .catch(err => console.log(err))
    }

    const getStatusValues = () => {
        const url = `${API}/order/status-values/${user._id}`
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(values => setStatusValues(values.data))
        .catch(err => console.log(err))
    }

    const updateStatus = (status, orderId) => {
        //console.log(status, orderId)
        const url = `${API}/order/${orderId}/status/${user._id}`
        axios.put(url, JSON.stringify({status, orderId}), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((data) => console.log('update Status:', data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllOrders()
        getStatusValues()
    }, [])

    const handleChange = id => event => {
        updateStatus(event.target.value, id)
    }

    const showAllOrders = () => {
        return orders && orders.map((order, i) => (
            <div key={i} className="col-md-3">
                <div className="order p-3">
                    <div className="list-group">
                        <a className="list-group-item list-group-item-action active" aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="my-2">Order ID</h5>
                                <small>{moment(order.createdAt).fromNow()}</small>
                            </div>
                            <p className="mb-1">{order._id}</p>
                        </a>
                        <a className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="my-2">Order Status</h6>
                            </div>
                            <p className="my-2">{showStatusValues(order._id)}</p>
                        </a>
                        <a className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="my-2">Total Amount</h6>
                                <p className="my-2">Rs.{order.amount}</p>
                            </div>
                        </a>
                        <a className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mt-2">Transaction ID</h6>
                            </div>
                            <p className="mb-2">{order.transaction_id}</p>
                        </a>
                        <a className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mt-2">Fruits / Vegetables</h5>
                            </div>
                            { order.fruits && order.fruits.map((fruit, i) => (
                                <p className="my-1">
                                    {fruit.name} &nbsp;- {fruit.count} kgs
                                </p>
                            )) }
                        </a>
                    </div>
                </div>
            </div>
        ))
    }

    const showOrdersLength = () => {
        return orders && orders.length > 0 ? (
            <span className="my-2">{orders.length} orders</span>
        ) : (
            <span className="my-2">No Orders</span>
        )
    }

    const showStatusValues = (id) => {
        return statusValues && (
            <select onChange={handleChange(id)} className="form-select" aria-label="Status Values">
                <option selected>Update Status</option>
                {statusValues.map((val,i)=> (
                    <option key={i} value={val}>{val}</option>
                ))}
            </select>
        )
    }

    return (
        <div>
            <Layout>
                <div className="container-fluid p-5">
                    <div className="all-orders-head my-3">
                        <h5>All User Orders - {showOrdersLength()}</h5>
                    </div>
                    <div className="all-orders-box p-4">
                        <div className="row">
                            {showAllOrders()}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AllOrders
