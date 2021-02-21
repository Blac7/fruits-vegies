import React, { useState } from 'react'

const Filters = ({filters, setFilters}) => {
    
    const [maxPrice, setMaxPrice] = useState(0)
    const [checked, setChecked] = useState([]);
    // const [checkedDays, setCheckedDays] = useState([]);

    const handleToogle = c => () => {
        // return first index or -1
        const currentcategory = checked.indexOf(c);
        const newCheckedcategory = [...checked];
        if(currentcategory === -1) {
            newCheckedcategory.push(c)
        } else {
            newCheckedcategory.splice(currentcategory, 1)
        }
        setChecked(newCheckedcategory)
        setFilters({...filters, category: newCheckedcategory})
    }
    
    // const handleToogleDays = c => () => {
    //     // return first index or -1
    //     const currentcategory = checkedDays.indexOf(c);
    //     const newCheckedcategory = [...checkedDays];
    //     if(currentcategory === -1) {
    //         newCheckedcategory.push(c)
    //     } else {
    //         newCheckedcategory.splice(currentcategory, 1)
    //     }
    //     setCheckedDays(newCheckedcategory)
    //     setFilters({...filters, timePeriod: newCheckedcategory})
    // }

    const handleChangePriceRange = event => {
        setMaxPrice(event.target.value)
        setFilters({...filters, maxprice: event.target.value})
    }

    const handleChangeDiscount = event => {
        setFilters({...filters, discount: event.target.value})
    }

    const handleChangeRatings = event => {
        setFilters({...filters, ratings: event.target.value})
    }

    return (
            <div className="filters">
                <div className="filters-inner p-3">
                    <h5 className="filter-title mb-3 justified-content-end">Filters</h5>
                    <hr/>
                    <div className="filter-content">
                        <form className="form-filter">
                            <a className="toogle filter-head mb-2 collapsed" href="#collapse1" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse1">
                                Category
                            </a>
                            <div className="form-check mb-2 collapse" id="collapse1">
                                <div className="form-check mb-1">
                                    <input onChange={handleToogle('fruits')} value={checked.indexOf('fruits') === -1} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">Fruits</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input onChange={handleToogle('vegetables')} value={checked.indexOf('vegetables') === -1} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" for="flexCheckChecked">Vegetables</label>
                                </div>
                            </div>

                            <a className="toogle filter-head mb-2 collapsed" href="#collapse3" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse3">
                                Price range
                            </a>
                            <div className="collapse" id="collapse3">
                                <div className="form-floating mb-2">
                                    <input type="text" id="floatingMax" className="form-control" value={maxPrice}/>
                                    <label htmlFor="floatingMax">From 0 to Rs.</label>
                                    <input type="range" className="form-range" min="0" max="150" onChange={handleChangePriceRange} value={maxPrice} />
                                    <div className="price-range">
                                        <span className="price-min">0</span>
                                        <span className="price-max">150</span>
                                    </div>
                                </div>
                            </div>

                            <a className="toogle filter-head mb-2 collapsed" href="#collapse4" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse4">
                                Discount
                            </a>
                            <div className="collapse" id="collapse4">
                                <div className="form-check mb-1">
                                    <input onChange={handleChangeDiscount} value="40" className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"/>
                                    <label className="form-check-label" for="exampleRadios1">more than 40%</label>
                                </div>
                                <div className="form-check mb-1">
                                    <input onChange={handleChangeDiscount} value="30" className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"/>
                                    <label className="form-check-label" for="exampleRadios2">more than 30%</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input onChange={handleChangeDiscount} value="20" className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"/>
                                    <label className="form-check-label" for="exampleRadios3">more than 20%</label>
                                </div>
                            </div>

                            <a className="toogle filter-head mb-2 collapsed" href="#collapse5" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse5">
                                Customer Ratings
                            </a>
                            <div className="collapse" id="collapse5">
                                <div className="form-check mb-1">
                                    <input onChange={handleChangeRatings} value="4" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">4 <i style={{color:"yellow"}} className="fas fa-star"></i> and above</label>
                                </div>
                                <div className="form-check mb-1">
                                    <input onChange={handleChangeRatings} value="3" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">3 <i style={{color:"yellow"}} className="fas fa-star"></i> and above</label>
                                </div>
                                <div className="form-check mb-1">
                                    <input onChange={handleChangeRatings} value="2" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" for="flexRadioDefault3">2 <i style={{color:"orange"}} className="fas fa-star"></i> and above</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input onChange={handleChangeRatings} value="1" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                                    <label className="form-check-label" for="flexRadioDefault4">1 <i style={{color:"red"}} className="fas fa-star"></i> and above</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            // <i className="fas fa-star-half-alt"></i> half
            // <i className="far fa-star"></i> empty
    )
}

export default Filters
