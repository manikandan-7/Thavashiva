import React, {Component} from 'react'
import './App.css';
import Signup from './signup'
import SimpleModal from './modal'
import Navbar from './navbar'
import Table from './table'
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import {unregister} from './interceptors'
import {lazyload} from 'react-lazyload';
import {trackPromise} from 'react-promise-tracker';
import Ratingmodal from './ratingmodal'
import Checkout from './checkout'

class Home extends Component {
    constructor(props) {

        super(props);
        this.state = {
            auth: localStorage.getItem("current"),
            products: [],
            ratingproducts: [],
            isAdmin: false,
            offset: 0,
            scroll: true,
            cartcount: (localStorage.getItem("cartcount")) ,
            open: false,
            user:[]
        };
        
    }

    async cartCount(props) {
        this.setState({cartcount: props})
    }
    getuser= async() => {
        const response1 = await fetch('http://localhost:9000/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current")
            })
        });
        var body = await response1.json();
        console.log(body)
        this.setState({user: body})

    }
    productrating = async() => {
        const response1 = await fetch('http://localhost:9000/getproductrating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current")
            })
        });
        var body = await response1.json();
        console.log(body)
        this.setState({ratingproducts: body})

    }
    adminstatus = async() => {
        const response1 = await fetch('http://localhost:9000/adminstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.props.auth})
        });
        var body = await response1.text();
        if (this.state.auth === "null") {
            this.setState({isAdmin: ""});
        } else if (body === "true") {
            this.setState({isAdmin: true})
        } else {
             this.setState({isAdmin: false})
        }
    }

    componentDidMount() {
        this.adminstatus()
        this.getuser()
        window.addEventListener('scroll', this.listenToScroll);

        localStorage.getItem("current")
            ? localStorage.getItem("current")
            : localStorage.setItem("current", "null")
        this
            .callApi()
            .catch(err => console.log(err));
        // this.productrating()

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
    resetOffset = async(key) => {
        this.setState({offset: 0})
        if (key === "") {
            // await this
            //     .props
            //     .history
            //     .push('/mywish');
            // this
            //     .props
            //     .history
            //     .push('/')
            this.setState({
                products:[]
            })
        }
        this.callApi()

    }
    callApi = async() => {

        const response = await fetch('http://localhost:9000/showitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accesstoken: localStorage.getItem("accessToken"),
                offset: this.state.offset
            })
        });

        var body = await response.json();
        console.log(body)
        if (body.length !== 8) {
            this.setState({scroll: false})
            window.removeEventListener('scroll', this.listenToScroll)

        }
        if (response.status !== 200) 
            throw Error(body.message);
        let productdata = [
            ...this.state.products,
            ...body
        ]

        this.setState({
            products: productdata,
            auth: localStorage.getItem("current"),
            cartcount: parseInt(localStorage.getItem("cartcount")) - 1
        })
    }
    listenToScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
            this.setState({
                offset: this.state.offset + 8
            }, () => this.callApi())
        }
    }
    render() {
        let ratingproducts = this.state.ratingproducts
        console.log(ratingproducts.length)
        let open = this.state.open
        return (
            <div>
                <div >
                    <Navbar
                        auth={this.state.auth}
                        callAPI={this.callApi}
                        isAdmin={this.state.isAdmin}
                        place={"home"}
                        cartcount={this.state.cartcount}
                        user={this.state.user}
                        />
                    <Table
                        products={this.state.products}
                        place={"home"}
                        callAPI={this.callApi}
                        auth={this.state.auth}
                        scroll={this.state.scroll}
                        isadmin={this.state.isAdmin}
                        resetoffset={this.resetOffset}
                        cartcount={this.cartCount}/> 

                        {/* {ratingproducts.length === 0
                        ? ""
                        : <Ratingmodal
                            open={true}
                            products={ratingproducts}
                            productrating={this.productrating}/>} */}

                </div>
            </div>
        )
    }
}

export default withRouter(Home);
