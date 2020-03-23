import React, {Component} from 'react'
import './App.css';
import Table from './table'
import Home from './home'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Mycart from './mycart'
import Mywish from './mywish'
import Protectedroute from './protectedroute'
import PrivateRoute from './privateroute'
import Notifscom from './notifscom';
import Buynow from './buynow';
import Viewproduct from './viewproduct'
import Buynowsteppers from './buynowstepper'
import Solditems from './solditems'
import Returnitems from './returns'
import Registerplus from './plus'

import {unregister} from './interceptors'
import Myorders from './myorders';
export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isadmin:"false"
        }
    }
    callApi=async()=>{
        const response =await fetch('http://localhost:9000/adminstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        var body =await response.text();
        console.log(body)
        if (body!=="true") body="false" 
        this.setState({isadmin: body})
    }
    componentDidMount(){
       this.callApi()
    }
    render() {
        return (
            <div>
                <Router>
                    <Route path="/" component={Home} exact />
                    <Protectedroute path="/table" component={Table} />
                    <Protectedroute path="/mycart" component={Mycart} />
                    <Protectedroute path="/mywish" component={Mywish} />
                    <Protectedroute path="/registerplus" component={Registerplus} />
                    <PrivateRoute path="/notifs" component={Notifscom} isadmin={this.state.isadmin}/>
                    <Protectedroute path="/buynow" component={Buynowsteppers} />
                    <Protectedroute path="/viewproduct" component={Viewproduct} />
                    <PrivateRoute path="/solditems" component={Solditems} isadmin={this.state.isadmin} />
                    <Protectedroute path="/myorders" component={Myorders} />
                    <PrivateRoute path="/returnitems" component={Returnitems} isadmin={this.state.isadmin}/>
                </Router>
            </div>
        )
    }
}
