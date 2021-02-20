import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './Layout'
import Banner from './Banner'
import Card from './Card'
import { API } from '../Config'

const Home = () => {
    const [fruitsSeasonal, setFruitsSeasonal] = useState([]) 
    const [fruitsExortic, setFruitsExortic] = useState([]) 

    const getFruitsSeasonal = () => {
        const url = `${API}/fruits/seasonal?limit=4`
        axios.get(url)
             .then((fruits) => {
                 setFruitsSeasonal(fruits.data)
              })
             .catch((error) => console.log(error))
    }

    const getFruitsExortic = () => {
        const url = `${API}/fruits/exortic?limit=4`
        axios.get(url)
             .then((fruits) => {
                 setFruitsExortic(fruits.data)
              })
             .catch((error) => console.log(error))
    }

    useEffect(() => {
        getFruitsSeasonal()
        getFruitsExortic()
    }, [])

    const displayFruitsSeasonal = () => {
        return fruitsSeasonal && fruitsSeasonal.map((fruit, i) => (
            <div key={i} className="col-md-3 mb-3">
                <Card fruit={fruit} />
            </div>
        ))
    }

    const displayFruitsExortic = () => {
        return fruitsExortic && fruitsExortic.map((fruit, i) => (
            <div key={i} className="col-md-3 mb-3">
                <Card fruit={fruit} />
            </div>
        ))
    }

    return (
        <div className="home">
            <Layout>
                <Banner />
                    <div className="seasonal">
                        <div className="container-fluid p-5">
                            <div className="row-header mx-4 mb-4">Seasonal Fruits</div>
                            <div className="row-content mx-4">
                                <div className="row mb-3">
                                    { displayFruitsSeasonal() }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="exortic">
                        <div className="container-fluid p-5">
                            <div className="row-header mx-4 mb-4">Exortic Fruits</div>
                            <div className="row-content mx-4">
                                <div className="row mb-3">
                                    { displayFruitsExortic() }
                                </div>
                            </div>
                        </div>
                    </div>
            </Layout>
        </div>
    )
}

export default Home
