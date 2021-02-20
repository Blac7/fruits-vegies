import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import { API } from '../Config'


const SignUp = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        age: '',
        password: '',
        error: '',
        success: false
    })

    const { firstName, lastName, email, phoneNumber, age, password, error, success} = user

    const handleChange = name => event => {
        setUser({...user, error: false, [name]: event.target.value })
    }

    const signup = async (user) => { 
        return (
            await axios.post(`${API}/signup`, 
                    JSON.stringify(user), {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }  
                })
            .then(response => {
                //console.log(response)
                return response
            })
            .catch(err => {
                console.log(err) 
            }
        )
    )}

    const onClickSubmit = event => {
        event.preventDefault()
        setUser({...user, error: false})
        signup(user)
        .then(data => {
            if(data){
                setUser({
                    ...user, 
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    age: '',
                    password: '',
                    error: '', 
                    success: true
                })
            }
            if(data.errors) {
                setUser({...user, error: JSON.stringify(data.errors), success: false})
            }
        })
        .catch(err => console.log(err))
    }

    const showError = () => (
         <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
             {error}
         </div>
    );

    const showSuccess = () => (
         <div className="alert alert-success" style={{ display: success ? "" : "none"}}>
             Your Account is created. Please <Link to="/signin">Signin</Link>.
         </div>
    );

    return (
        <div>
            <Layout>
                <div className="container p-5">
                    <div className="row justify-content-md-center">
                        <div className="col-md-8">
                            <div className="signup-form m-1 p-5 justify-content-center">
                                <div className="signup-header mb-4 mx-3">
                                    <h5>Sign Up to Create an Account.</h5>
                                    {showSuccess()}
                                    {showError()}
                                </div>
                                <form className="row g-2 m-3">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('firstName')} type="text" id="floatingFirstName" className="form-control" value={firstName}/>
                                            <label htmlFor="floatingFirstName">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('lastName')} type="text" id="floatingLastName" className="form-control" value={lastName}/>
                                            <label htmlFor="floatingLastName">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('age')} type="number" id="floatingAge" className="form-control" min="0" max="150" value={age}/>
                                            <label htmlFor="floatingAge">Age</label>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('phoneNumber')} type="text" id="floatingPhoneNumber" className="form-control" maxLength="10" minLength="10" value={phoneNumber}/>
                                            <label htmlFor="floatingPhoneNumber">Phone Number</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('email')} type="email" id="floatingEmail" className="form-control" value={email}/>
                                            <label htmlFor="floatingEmail">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('password')} type="password" id="floatingPassword1" className="form-control" value={password}/>
                                            <label htmlFor="floatingPassword1">Password</label>
                                        </div>
                                    </div>
                                    {/* <div className="form-floating mb-3">
                                        <input type="password" id="floatingConfirmPassword" className="form-control"/>
                                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                                    </div> */}
                                    <div className="d-grid gap-2 mt-3">
                                        <button onClick={onClickSubmit} className="btn btn-outline-primary">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default SignUp
