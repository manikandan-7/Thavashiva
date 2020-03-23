import React, {Component} from 'react'
import Navbar from './navbar'
import Table from './table'
import {Redirect} from 'react-router'
import Botbar from './botbar'

class Mycart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }

        this.callAPI = this
            .callAPI
            .bind(this)
    }
    componentDidMount() {
        this.callAPI()
    }
    callAPI = async() => {
        const response = await fetch('http://localhost:9000/getcart1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body = await response.json();
        console.log(body)
        if (body === "Unauthorized") {
            return <Redirect to='/'/>
        }
        this.setState({products: body})
    }
    render() {
        let products = this.state.products
        return (
            <div>
                <Navbar auth={localStorage.getItem("current")} place={"Home"}/> {products.length !== 0
                    ? <div>
                        <Table
                            products={this.state.products}
                            place={"cart"}
                            callAPI={this.callAPI}
                          />
                        <Botbar />
                        </div>
                    : <div
                        style={{
                        display: 'flex',
                        marginTop: '30px'
                    }}>
                        <h1
                            style={{
                            marginTop: '80px',
                            display: 'flex',
                            width: 'fit-content'
                        }}>Nothing To Show</h1>
                    </div>
}
            </div>
        )
    }
}

export default Mycart