import React, { useState } from 'react'
import axios from 'axios'
import { API } from '../Config'
import { isAuthenticated, reauthenticate } from '../auth/Auth'
import Layout from '../components/Layout'

function ProfileUpdate() {
    const {user , token } = isAuthenticated()
    const [tempUser, setTempUser] = useState({
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        phoneNumber: user.phoneNumber, 
        age: user.age,
        error: '',
        success: ''
    })

    const { firstName, lastName, email, phoneNumber, age, error, success} = tempUser

    const updateUser = tempUser => {
        const url = `${API}/user/update/${user._id}`
        axios.put(url, JSON.stringify(tempUser), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((usr) => setTempUser({...tempUser, error: false, success:true }))
        .catch(err =>  setTempUser({...tempUser, error: err }))
    }

    const handleChange = name => event => {
        setTempUser({...tempUser, error: false, [name]: event.target.value })
    }

    const onClickSubmit = event => {
        event.preventDefault()
        updateUser(tempUser)
    }

    const showError = () => (
         <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
             {error}
         </div>
    );

    const showSuccess = () => (
         <div className="alert alert-success" style={{ display: success ? "" : "none"}}>
             Your Account is updated. Please SignIn again - for the Changes.
         </div>
    );

    return (
        <div>
            <Layout>
                <div className="container">
                    <div className="row justify-content-center  m-5">
                        <div className="col-md-9">
                            <div className="profile-header m-2">
                                <p><strong>Hi {user.firstName}</strong> Update Your Profile </p>
                                {showSuccess()}
                                {showError()}
                            </div>
                            <div className="profile-form m-2 p-2 mb-3">
                                <form className="row g-2 m-3">
                                    <div className="col-md-12">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('firstName')} type="text" id="floatingFirstName" className="form-control" value={firstName}/>
                                            <label htmlFor="floatingFirstName">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('lastName')} type="text" id="floatingLastName" className="form-control" value={lastName}/>
                                            <label htmlFor="floatingLastName">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('age')} type="number" id="floatingAge" className="form-control" min="0" max="150" value={age}/>
                                            <label htmlFor="floatingAge">Age</label>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('phoneNumber')} type="text" id="floatingPhoneNumber" className="form-control" maxLength="10" minLength="10" value={phoneNumber}/>
                                            <label htmlFor="floatingPhoneNumber">Phone Number</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating mb-3">
                                            <input onChange={handleChange('email')} type="email" id="floatingEmail" className="form-control" value={email}/>
                                            <label htmlFor="floatingEmail">Email</label>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 mt-3 mb-3">
                                        <button onClick={onClickSubmit} className="btn btn-outline-primary">Update User</button>
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

export default ProfileUpdate
