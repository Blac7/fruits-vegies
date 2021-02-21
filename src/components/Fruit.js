import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Layout from './Layout'
import Ratings from './Ratings'
import { API } from '../Config'
import { addItem } from './CartHelpers'
import Card from './Card'
 
const Fruit = (props) => {
    const [fruit, setFruit] = useState('')
    const [fruitsSold, setFruitsSold] = useState([])  
    const [images, setImages] = useState([])
    const [rating, setRating] = useState(0.0)
    // const [redirect, setRedirect] = useState(false)

    const getFruitDetails = async (fruitId) => {
        const url = `${API}/fruits/getFruit/${fruitId}`
        await axios.get(url)
             .then((fru) => {
                setFruit(fru.data)
             })
             .catch((error) => console.log(error))
    }

    const getFruitsSold = () => {
        const url = `${API}/fruits/sold`
        axios.get(url)
             .then((fruits) => {
                 //console.log(fruits.data)
                 setFruitsSold(fruits.data)
              })
             .catch((error) => console.log("Sold Error: ", error))
    }

    useEffect(() => {
        const fruitId = props.match.params.fruitId
        getFruitDetails(fruitId)
        showRating()
        getFruitsSold()
    }, [])

    useEffect(() => {
        setImages(fruit.imagesURl)
    }, [fruit.imagesURl])

    useEffect(() => {
       if(fruit.rating) {
            setRating(fruit.rating.$numberDecimal)
        }
    }, [fruit.rating])

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
                    <strong>{fruit.discount}%</strong> on <strong>{fruit.discountQuantity} kgs</strong> (Purchase) 
                </span>
            )
        } else {
            return ( <span>No Discount right Now</span> )
        }
    }

    const addToCart = () => {
        addItem(fruit, () => (<Redirect to="/cart"/>))
    }

    const showImages = () => {
        return images && images.map((img, i) => {
            if(i===0) {
                return (
                    <div key={i} className="carousel-item active">
                        <img src={img} alt={`${fruit.name} image ${i}`} className="d-block w-100 fruit-imgs"/>
                    </div>
                )
            }
            return (
                <div key={i} className="carousel-item">
                    <img src={img} alt={`${fruit.name} image ${i}`} className="d-block w-100 fruit-imgs"/>
                </div>
            )
        })
    }

    const showRating = () => {
        if(fruit.rating) {
            setRating(fruit.rating.$numberDecimal)
            //console.log(rating)
        }
    }

    const showColors = () => {
        return fruit.colors && fruit.colors.map((color, i) => (
            <div className="color-outer" style={{borderColor: color}} key={i}>
                <div className="color-inner" style={{backgroundColor: color}}></div>
            </div>
        ))
    }

    const fruitRedirect = () => (<Redirect to={`/fruits/getFruit/${fruit._id}`} />)

    const displayFruitsSold = () => {
        return fruitsSold && fruitsSold.map((fruit, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-2">
                <div className="popular-fruit">
                    <div className="popular-fruit-img">
                        <img src={fruit.imagesURl[1]} alt={fruit.name} />
                    </div>
                    <div className="popular-fruit-title">
                        <p className="popular-fruit-name">
                            {fruit.name} 
                            <button onClick={fruitRedirect()} className="btn btn-outline-info pop-fru-btn"> View </button>
                        </p>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div>
            <Layout>
                <div className="container-fluid">
                    <div className="fruit-inner m-5 p-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="fruit-details">
                                    <div className="row">
                                        <div className="col-lg-9 col-md-12">
                                            <h4 className="fruit-title mb-3">
                                                {fruit.category === 'fruits' ? (
                                                        <span style={{fontWeight:'normal', fontSize:'20px'}}>Fruit Name:</span>
                                                    ) : (
                                                        <span style={{fontWeight:'normal', fontSize:'20px'}}>Vegetable  Name:</span>
                                                    )} {fruit.name}
                                                </h4>
                                            <div className="fruit-images">
                                                <div id="fruitCarousel" className="carousel slide" data-bs-ride="carousel">
                                                    <div className="carousel-inner">
                                                        { showImages() }
                                                        <button className="carousel-control-prev" type="button" data-bs-target="#fruitCarousel"  data-bs-slide="prev">
                                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                            <span className="visually-hidden">Previous</span>
                                                        </button>
                                                        <button className="carousel-control-next" type="button" data-bs-target="#fruitCarousel"  data-bs-slide="next">
                                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                            <span className="visually-hidden">Next</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-12">
                                            <div className="fruit-inner-content p-4 pb-3">
                                                <p className="fruit-text">{fruit.description}</p>
                                                <p className="fruit-text"><Ratings rating={rating} /> ({fruit.Persons_rating})</p>
                                                <p className="fruit-text"><strong>Category:</strong> {fruit.category} &nbsp; {showStock()}</p>
                                                <p className="fruit-text"><strong>Price/1kg:</strong> Rs.{fruit.price}</p>
                                                <p className="fruit-text"><strong>Added on:</strong> {moment(fruit.createdAt).fromNow()}</p>
                                                <p className="fruit-text"><strong>Discount:</strong> {showDiscount()}</p>
                                                <p className="fruit-text"><strong>Colors:</strong> {showColors()} </p> 
                                                { fruit.quantity > 0 && (
                                                    <Link onClick={addToCart} to="/cart" className="btn btn-warning">
                                                        Add to Cart
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="popular-items">
                        <div className="fruit-side  m-5 p-4">
                            <div className="row-header mx-4 mb-4">Most Popular</div>
                            <div className="popular-fruits">
                                <div className="row">
                                    {displayFruitsSold()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Fruit
