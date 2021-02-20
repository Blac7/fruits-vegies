import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/Auth'
import { itemTotal } from '../components/CartHelpers'

const Header = () => {
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="d-flex float-left">
                    <Link to="" className="navbar-brand">Fruits&Vegies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="navbar-nav">
                        <Link to="" className="nav-link active">Home</Link>

                        <Link to="/shop" className="nav-link">Shop</Link>

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role !== 0 && (
                            <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
                        )}

                        <Link to="/cart" className="nav-link">
                            Cart <sup className="cart-number badge rounded-pill bg-primary">{itemTotal()}</sup>
                        </Link>
                        
                        {!isAuthenticated() && (
                            <Link to="/signin" className="nav-link">SignIn</Link>
                        )}
                        
                        {isAuthenticated() && (
                            <a href="#" className="nav-link" onClick={() => signout()}>SignOut</a>
                        )}
                    </div>  
                </div>
            </div>
            </nav>
            <div className="nav-place"></div>
        </div>
    )
}

export default Header
