import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const ManageFruit = () => {
    const [fruits, setFruits] = useState()
    const {user, token} = isAuthenticated()

    const getAllFruits = () => {
        const url = `${API}/fruits/all?limit=20`
        axios.get(url)
             .then((fruits) => setFruits(fruits.data))
             .catch(err => console.log(err))
    }

    const deleteFruit = fruitId => {
        const url = `${API}/fruits/delete/${fruitId}/${user._id}`
        axios.delete(url, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then(() => {
            getAllFruits()
            console.log("Fruit deleted")
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllFruits()
    }, [])

    const showAllFruits = () => {
        return fruits && fruits.map((fruit, i) => (
            <div className="col-md-3" key={i}>
                <div className="fruit-single mb-4">
                    <h6 className="fruit-single-title">{fruit.name}</h6>
                    <div className="fruit-single-img-box mb-2">
                        {fruit.imagesURl && (
                            <img src={fruit.imagesURl[0]} alt={fruit.name} className="fruit-single-img mb-2"/>
                        )}
                    </div>
                    <div className="fruit-single-links-box">
                        <Link to={`/admin/updateFruit/${fruit._id}`}>
                            <button className="btn btn-outline-info mx-2 mb-2">
                            Update
                            </button>
                        </Link>
                        <Link className="justified-content-end">
                            <button onClick={() => deleteFruit(fruit._id)} className="btn btn-outline-danger mx-2 mb-2">
                            Delete
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div>
            <Layout>
                <div className="container-fluid">
                    <div className="manage-fruits m-3 p-3">
                        <div className="add-fruit-button mb-3">
                            <Link to='/admin/addFruit'>
                                <button className="btn btn-outline-primary">
                                    Add Fruit / Vegetable
                                </button>
                            </Link>
                        </div>
                        <div className="all-fruits mb-3 p-2">
                            <div className="row">
                                {showAllFruits()}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default ManageFruit
