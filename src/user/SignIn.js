import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import { API } from '../Config'
import { authenticate, isAuthenticated } from '../auth/Auth'

const SignIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer  } = values
    

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value })
    }

    const signin = user => { 
    return (
        axios.post(`${API}/signin`, 
                JSON.stringify(user), {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }  
            })
        .then(response => {
            //console.log(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err) 
        })
    )}

    const onClickSubmit = event => {
        event.preventDefault()
        //console.log(values)
        signin({email, password})
        .then(data => {
            // console.log(data)
            authenticate(data, () => {
                setValues({...values, redirectToReferrer:true})
            })
        }).catch(err => {
            setValues({...values, error: err, loading: false})
        })
    }

    const { user } = isAuthenticated()

     const showError = () => (
         <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
             {error}
         </div>
    );

    const showLoading = () => (
         loading && (
             <div className="alert alert-info">
                 <h2>Loading...</h2>
             </div>
         )
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 0){
                // console.log("Admin")
                return <Redirect to="/admin/dashboard" />
            } else {
                // console.log("User")
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <div>
            <Layout>
                <div className="container m-3 p-3">
                    <div className="row justify-content-md-center">
                        <div className="col-md-5">
                            <div className="signin-form m-1 p-4 justify-content-center">
                                <div className="signup-header mb-4 mx-3">
                                    <h5>SignIn to access your Account.</h5>
                                    {showLoading()}
                                    {showError()}
                                    {redirectUser()}
                                </div>
                                <form className="row g-2 m-3">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('email')} type="email" id="floatingInput" className="form-control" value={email}/>
                                        <label htmlFor="floatingInput">Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChange('password')} type="password" id="floatingPassword" className="form-control" value={password}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div className="d-grid gap-2  mt-3">
                                        <button onClick={onClickSubmit} className="btn btn-outline-primary">Sign In</button>
                                    </div>
                                </form>
                                <div className="redirect-signup mx-3 mt-5 ">
                                    <span>To Create a New Account</span> &nbsp; &nbsp;
                                    <Link to="/signup">
                                        <button className="btn btn-outline-info">SignUp</button>
                                    </Link>
                                </div>
                    </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default SignIn
