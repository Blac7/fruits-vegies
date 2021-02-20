import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from './Auth'

const AdminRoute = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render = { props => isAuthenticated() && isAuthenticated().user.role === 0 ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
        ) }
    />
)

export default AdminRoute