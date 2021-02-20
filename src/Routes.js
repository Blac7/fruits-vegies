// 
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// 
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
//
import Home from './components/Home'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Fruit from './components/Fruit'
// 
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import UserDashboard from './user/UserDashboard'
import Shipping from './user/Shipping'
import Payments from './user/Payments'
import Orders from './user/Orders'
import ProfileUpdate from './user/ProfileUpdate'
//
import AdminDashboard from './admin/AdminDashboard'
import ManageFruit from './admin/ManageFruit'
import AddFruit from './admin/AddFruit'
import UpdateFruit from './admin/UpdateFruit'
import AllOrders from './admin/AllOrders'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/shop" exact component={Shop} />
               <Route path="/cart" exact component={Cart} />
               <Route path="/signin" exact component={SignIn} />
               <Route path="/signup" exact component={SignUp} />
               <Route path="/fruits/getFruit/:fruitId" exact component={Fruit} />
               <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
               <PrivateRoute path="/shipping" exact component={Shipping} />
               <PrivateRoute path="/payment" exact component={Payments} />
               <PrivateRoute path="/myorders" exact component={Orders} />
                <PrivateRoute path="/manageUser" exact component={ProfileUpdate} />
               <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
               <AdminRoute path="/admin/manageFruit" exact component={ManageFruit} />
               <AdminRoute path="/admin/addFruit" exact component={AddFruit} />
               <AdminRoute path="/admin/updateFruit/:fruitId" exact component={UpdateFruit} />
               <AdminRoute path="/admin/allOrders" exact component={AllOrders} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
