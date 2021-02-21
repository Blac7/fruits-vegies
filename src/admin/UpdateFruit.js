import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const UpdateFruit = (props) => {
    const [fruit, setFruit] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        isSeasonal: true,
        isExortic: false,
        discount: 0,
        discountQuantity: 0,
        rating: 0.0,
        Persons_rating: 0,
        colors: [],
        imagesURl: []
    })
    const [imgurl, setImgUrl] = useState('')
    const [color, setColor] = useState('')
    const [checked, setChecked] = useState([]);
    const {user, token} = isAuthenticated()

    const { name, description, price, quantity, category, isSeasonal, isExortic, 
        discount, discountQuantity, rating, Persons_rating, colors, imagesURl } = fruit


    const getFruit = fruitId => {
        const url = `${API}/fruits/getfruit/${fruitId}`
        axios.get(url)
             .then(fruits => setFruit(fruits.data))
             .catch(error => console.log("getFruit Error: ", error))
    }

    useEffect(() => {
        const fruitId = props.match.params.fruitId
        getFruit(fruitId)
    }, [])

    const handleChange = name => event => {
        setFruit({...fruit, [name]:event.target.value})  
    }

    const handleChangeRadio = event => {
        setFruit({...fruit, category:event.target.value})
    }

    const handleChangeImageUrl = event => {
        setImgUrl(event.target.value)
    }

    const handleChangeColors = event => {
        setColor(event.target.value)
    }

    const handleToogle = c => () => {
        // return first index or -1
        const currentcategory = checked.indexOf(c);
        const newCheckedcategory = [...checked];
        if(currentcategory === -1) {
            newCheckedcategory.push(c)
            setFruit({...fruit, [c]:true})
        } else {
            setFruit({...fruit, [c]:false})
            newCheckedcategory.splice(currentcategory, 1)
        }
        //console.log(newCheckedcategory)
        setChecked(newCheckedcategory)
    }

    const delFromImgArr = iurl => {
        if(imagesURl) {
            imagesURl.map((url, i) => {
                if(url==iurl){
                    imagesURl.splice(i, 1)
                }
            })
        }
        //console.log(imagesURl)
    }

    const delFromColorArr = icolor => {
        if(colors) {
            colors.map((color, i) => {
                if(color == icolor){
                    colors.splice(i, 1)
                }
            })
        }
        //console.log(colors)
    }

    const showImgUrls = () => {
        return imagesURl && imagesURl.map((url, i) => (
            <div className="alert alert-secondary alert-dismissible fade show text-truncate" role="alert" key={i}>
                {url}
                <button onClick={() => delFromImgArr(url)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </div>
        ))
    }

    const showColors = () => {
        return colors && colors.map((color, i) => (
            <>
            <span className="alert alert-info alert-dismissible fade show text-truncate" role="alert" key={i}>
                {color}
                <button onClick={() => delFromColorArr(color)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </span> &nbsp; &nbsp; </>
        ))
    }

    const submitUrl = event => {
        event.preventDefault()
        if(imgurl){
            imagesURl.push(imgurl)
            setFruit({...fruit, imagesURl: imagesURl})
            setImgUrl('')
            //console.log(imagesURl)
        }
    }

    const submitColor = event => {
        event.preventDefault()
        if(color){
            colors.push(color)
            setFruit({...fruit, colors: colors})
            setColor('')
            //console.log(colors)
        }
    }

    const addFruit = async (fruit) => { 
        return (
            await axios.put(`${API}/fruits/update/${fruit._id}/${user._id}`, 
                    JSON.stringify(fruit), {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }  
                })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err) 
            }
        )
    )}

    const submitClick = event => {
        event.preventDefault()
        //console.log(fruit)
        // const rating = fruit.rating / 10
        // setFruit({...fruit, rating:rating})
        addFruit(fruit).then(data => console.log("Response data: ",data))
        .catch(err => console.log("Error in submit add Fruits: ", err))
    }

    return (
        <div>
            <Layout>
                <div className="conatiner-fluid">
                    <div className="manage-fruit m-5 p-5">
                        <div className="profile-header m-2 mb-3">
                            <p>Upadate Fruit / Vegtable </p>
                        </div>
                        <div className="add-fruit-form m-2 mb-3">
                            <form className="row g-2 m-3">
                                <div className="col-md-12">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('name')} type="text" id="floatingName" className="form-control" value={name}/>
                                        <label htmlFor="floatingName">Fruit Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating mb-3">
                                        <textarea onChange={handleChange('description')} id="floatingDescription" className="form-control" value={description}></textarea>
                                        <label htmlFor="floatingDescription">Description</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('price')} type="number" id="floatingPrice" className="form-control" min="0" max="250" value={price}/>
                                        <label htmlFor="floatingPrice">Price</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('quantity')} type="number" id="floatingQuantity" className="form-control" min="0" max="150" value={quantity}/>
                                        <label htmlFor="floatingQuantity">Quantity</label>
                                    </div>
                                </div>
                                <div className="col-md-6 p-3">
                                    Category: &nbsp; &nbsp;
                                    <div className="form-check form-check-inline">
                                        <input onChange={handleChangeRadio} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="fruits" />
                                        <label className="form-check-label" for="inlineRadio1">Fruits</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input onChange={handleChangeRadio} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="vegetables" />
                                        <label className="form-check-label" for="inlineRadio2">Vegetables</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('discount')} type="number" id="floatingDiscount" className="form-control" min="0" max="80" value={discount}/>
                                        <label htmlFor="floatingDiscount">Discount %</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('discountQuantity')} type="number" id="floatingDiscountQuantity" className="form-control" min="0" max="10" value={discountQuantity}/>
                                        <label htmlFor="floatingDiscountQuantity">Discount Quantity</label>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3">
                                    <div className="form-check form-check-inline mb-3">
                                        <label className="form-check-label" for="inlineCheckbox3">isSeasonal</label>
                                        <input onChange={handleToogle('isSeasonal')} value={checked.indexOf('isSeasonal') === -1} className="form-check-input" type="checkbox" id="inlineCheckbox3" />
                                    </div>
                                </div>
                                <div className="col-md-4 p-3">
                                    <div className="form-check form-check-inline mb-3">
                                        <label className="form-check-label" for="inlineCheckbox4">isExotic</label>
                                        <input onChange={handleToogle('isExortic')} value={checked.indexOf('isExortic') === -1} className="form-check-input" type="checkbox" id="inlineCheckbox4" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('rating')} type="number" id="floatingRating" className="form-control" min="0" max="50" value={rating}/>
                                        <label htmlFor="floatingRating">Rating</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('Persons_rating')} type="number" id="floatingPersons_rating" className="form-control" min="0"  value={Persons_rating}/>
                                        <label htmlFor="floatingPersons_rating">Persons_Rating</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className=" mb-3">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label >Colors</label>
                                                <input onChange={(e) => handleChangeColors(e)} type="color" className="form-control form-control-color" id="exampleColorInput"  title="Choose your color"></input>
                                                <button onClick={(e) => submitColor(e)} className="btn btn-primary">Accept Color</button>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="showcolors">
                                                    {showColors()}
                                               </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input onChange={(e) => handleChangeImageUrl(e)} type="text" id="floatingImg" className="form-control" value={imgurl}/>
                                                <label htmlFor="floatingImg">Enter Image URL</label>
                                                <button onClick={(e) => submitUrl(e)} className="btn btn-primary">Accept URL</button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="showImgs p-3 mb-3">
                                                {showImgUrls()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={(e) => submitClick(e)} className="btn btn-outline-primary mb-3">
                                    Update Fruit / Vegetable
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UpdateFruit