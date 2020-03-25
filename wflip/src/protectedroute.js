import React from 'react';
import {Route, Redirect} from 'react-router-dom';
let user = localStorage.getItem('current');
console.log(user)

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => (((user !== "null" || undefined || null))
        ? <Component {...props}/>
        : <Redirect to='/login'/>)}/>
)

export default ProtectedRoute;