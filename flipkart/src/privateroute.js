import React from 'react';
import {Route, Redirect} from 'react-router-dom';
let user = localStorage.getItem('current');
console.log(user)

const PrivateRoute = ({
    component: Component,
    isadmin,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => 
            
(((user !== "null" || undefined || null)&&isadmin==="true")
        ? <Component {...props}/>
        : <Redirect to='/'/>)}/>
)

export default PrivateRoute;