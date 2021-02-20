import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { updateCartItem, removeFromCart } from './CartHelpers'
import Ratings from './Ratings'

const Card = ({
                fruit,
                ViewMoreButton = true,
                IncQuantity = false,
                RemoveFromCartButton = false,
                setRun = f => f,
                run = undefined
            }) => {
    
    const [count, setCount] = useState(fruit.count)
    const [rating, setRating] = useState(0.0)

    const handleChange = fruitId => event => {
        setRun(!run)
        setCount(event.target.value < 1 ? 1: event.target.value)
        if(event.target.value >= 1){
            updateCartItem(fruitId, event.target.value)
        }

    }

    const showStock = () => {
        return fruit.quantity > 0 ? (
            <span className="badge rounded-pill bg-info text-dark">In Stock</span>
        ) : (
            <span className="badge rounded-pill bg-warning text-dark">Out of Stock</span>
        )
    }

    const showDiscount = () => {
        if(fruit.discount > 0 &&  fruit.discountQuantity > 0) {
            return (
                <span>
                    <strong>{fruit.discount}%</strong> on <strong>{fruit.discountQuantity} kgs</strong> Purchase 
                </span>
            )
        } else {
            return ( <span>No Discount right Now</span> )
        }
    }

    useEffect(() => {
       if(fruit.rating) {
            setRating(fruit.rating.$numberDecimal)
        }
    }, [fruit.rating])

    const showViewMoreButton = ViewMoreButton => {
        return ViewMoreButton && (
            <Link to={`/fruits/getFruit/${fruit._id}`} className="btn btn-outline-primary mx-2 mb-2">View</Link>
        )
    }

    const showIncQuantity = IncQuantity => {
        return IncQuantity && (
            <div className="input-group mb-3">
                <label htmlFor="incQuantity">Quantity: &nbsp;</label>
                <input onChange={handleChange(fruit._id)} type="number" id="incQuantity" className="form-control w-2" value={count} max="10"/>
            </div>
        )
    }

    const showRemoveFromCartButton = RemoveFromCartButton => {
        return RemoveFromCartButton && (
            <button onClick={() => {removeFromCart(fruit._id); setRun(!run);}} 
                className="btn btn-outline-danger mx-2 mb-2">
                Remove From Cart
            </button>
        )
    }

    const cardTitle = () => {
        if(fruit.category === 'fruits') {
            return "card-title fru"
        } else {
             return "card-title veg"
        }
    }

    return (
        <div className="card">
            <img src={fruit.imagesURl[0]} alt={fruit.name} className="card-img-top"/>
            <div className="card-body">
                <h5 className={cardTitle()}>{fruit.name}</h5>
                {/* <p className="card-text">Category: {fruit.category} &nbsp; {showStock()}</p> */}
                <p className="card-text">Price/1kg: <strong>Rs.{fruit.price}</strong></p>
                <p className="card-text"><Ratings rating={rating} /> ({fruit.Persons_rating})</p>
                <p className="card-text">Discount: {showDiscount()}</p>
                { showIncQuantity(IncQuantity) }
                { showViewMoreButton(ViewMoreButton) }
                { showRemoveFromCartButton(RemoveFromCartButton) }
            </div>
        </div>
    )
}

export default Card 