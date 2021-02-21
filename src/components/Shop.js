import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './Layout'
import Banner from './Banner'
import Card from './Card'
import Filters from './Filters'
import { API } from '../Config'

const Shop = () => {
    const [fruitsAll, setFruitsAll] = useState([]) 
    const [fruitsFiltered, setFruitsFiltered] = useState([]) 
    const [filters, setFilters] = useState({
        category: [],
        // timePeriod: [],
        maxprice: 150,
        discount: '',
        ratings: ''
    })

    // const getFruitsAll = () => {
    //     const url = `${API}/fruits/all`
    //     axios.get(url)
    //          .then((fruits) => {
    //              setFruitsAll(fruits.data)
    //           })
    //          .catch((error) => console.log(error))
    // }

    useEffect(() => {
        // getFruitsAll()
        getFilteredFruits(filters)
    }, [filters])

    // const displayFruitsAll = () => {
    //     return fruitsAll && fruitsAll.map((fruit, i) => (
    //         <div key={i} className="col-md-3 mb-3">
    //             <Card fruit={fruit} />
    //         </div>
    //     ))
    // }
    const displayFruitsFiltered = () => {
        return fruitsFiltered && fruitsFiltered.map((fruit, i) => (
            <div key={i} className="col-lg-3 col-md-6 col-xs-12 mb-3">
                <Card fruit={fruit} />
            </div>
        ))
    }

    const getFilteredFruits = (filters) => {
        const url = `${API}/fruits/filtered`
        axios.post(url, 
            JSON.stringify(filters), {
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
            }
        )
        .then((fruits) => setFruitsFiltered(fruits.data))
        .catch(err => console.log("GetFilFruits Error: ", err))
    }

    return (
        <div>
            <Layout>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <Filters filters={filters} setFilters={setFilters} />
                        </div>
                        <div className="col-md-10">
                            <div className="shop m-3 p-3">
                                <h5 className="shop-title mb-3">
                                    All Products : Search, Filter your Fruits
                                </h5>
                                <div className="shop-inner p-3">
                                    <div className="row">
                                        {displayFruitsFiltered()}
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

export default Shop
