import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import HorizontalCard from '../components/HorizontalCard'
import { isAuthenticated } from '../auth/Auth'
import { itemTotal, getCartFruits, getTotal } from '../components/CartHelpers'

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        showItemsInCart()
    }, [run])

    const showItemMsg = () => {
        return itemTotal() > 0 ? (
            <h5>Total Cart items: {itemTotal()}</h5>
        ) : (
            <div className="no-items m-5 p-5">
                <h5>No items in the Cart</h5>
                <p>Please add fruits / vegtables for CheckOut purpose</p>
                <Link to='/shop'>
                    <button className="btn btn-outline-secondary">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        )
    }

    const showItemsInCart = () => {
        if(itemTotal() > 0) {
            return getCartFruits().map((fruit, i) => (
                <div key={i} className="col-lg-6 col-md-12 mb-3 p-3">
                    <HorizontalCard 
                        fruit={fruit} 
                        IncQuantity={true} 
                        RemoveFromCartButton={true} 
                        setRun={setRun}
                        run={run}
                    />
                </div>
            ))
        }
    }

    return (
        <div>
            <Layout>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 col-md-12">
                            <div className="items-box m-4 p-3">
                                <div className="items-count">
                                    { showItemMsg() }
                                </div>
                                <div className="items p-3">
                                    <div className="row">
                                        { showItemsInCart() }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12">
                            <div className="checkout m-3 pt-5">
                                {itemTotal() > 0 ? (
                                    <div className="checkout-link p-3 mt-5">
                                        <h5 className="cart-total mb-3">Total: Rs.{getTotal()}</h5>
                                        <div className="d-grid gap-2">
                                            {isAuthenticated() && (
                                                <Link to="/shipping">
                                                    <button className="btn btn-outline-warning mb-2">
                                                        CheckOut
                                                    </button>
                                                </Link>
                                            )}
                                            {!isAuthenticated() && (
                                                <Link to="/signin">
                                                    <button className="btn btn-outline-warning mb-2">
                                                        SignIn to CheckOut
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ) : (<></>)}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Cart
