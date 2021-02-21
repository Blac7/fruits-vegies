import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { isAuthenticated } from '../auth/Auth'

const UserDashboard = () => {
    const {user, token} = isAuthenticated()

    return (
        <div>
            <Layout>
                <div className="user-dash-header p-5">
                    <h5>User Dashboard : {user.firstName}</h5>
                </div>
                
               <div className="container">
                   <div className="user-dashboard m-5 p-3">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="user-links m-3 mb-3">
                                    <ul className="list-group">
                                        <li className="list-group-item user-link active" aria-current="true">Links</li>
                                        <li className="list-group-item user-link"><Link to='/manageUser'>Manage Account</Link></li>
                                        <li className="list-group-item user-link"><Link to='/myorders'>My Orders</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="user-details m-3">
                                    <div className="list-group">
                                        <a className="list-group-item list-group-item-action active" aria-current="true">
                                            <div className="d-flex w-100">
                                                <h5 className="m-3">Details</h5>
                                            </div>
                                        </a>
                                        <a className="list-group-item list-group-item-action">
                                            <div className="d-flex w-100">
                                                <h6 className="my-3">First Name</h6>
                                                <p className="my-3">{user.firstName}</p>
                                            </div>
                                        </a>
                                        <a className="list-group-item list-group-item-action">
                                            <div className="d-flex w-100">
                                                <h6 className="my-3">Last Name</h6>
                                                <p className="my-3">{user.lastName}</p>
                                            </div>
                                        </a>
                                        <a className="list-group-item list-group-item-action">
                                            <div className="d-flex w-100">
                                                <h6 className="my-3">Role</h6>
                                                <p className="my-3">{user.role && user.role === 0 ? (
                                                        <span>Admin</span>
                                                    ) : (
                                                        <span>User</span>
                                                    )}
                                                </p>
                                            </div>
                                        </a>
                                        <a className="list-group-item list-group-item-action">
                                            <div className="d-flex w-100">
                                                <h6 className="my-3">Age</h6>
                                                <p className="my-3">{user.age}</p>
                                            </div>
                                        </a>
                                        <a className="list-group-item list-group-item-action">
                                            <div className="d-flex w-100">
                                                <h6 className="my-3">Phone Number</h6>
                                                <p className="my-3">{user.phoneNumber}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
            </Layout>
        </div>
    )
}

export default UserDashboard
