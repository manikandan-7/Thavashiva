import React, { Component } from 'react'
import Navbar from './navbar'
import Viewproductcontent from './viewproductcontent'
import { withRouter} from 'react-router-dom'

 class Viewproduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            products:[]
             
        }
    }
    componentDidMount() {
        console.log((this.props.location.productid))
        this.callAPI()
    }
    callAPI = async() => {
        let url=window.location.href
        var response = await fetch('http://localhost:9000/viewproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productid:parseInt(url.slice(34,url.length)),
            })
        });
        const body = await response.json();
        console.log(body)
        this.setState({products: body})

        
    }
    
    render() {
        if(this.props.location.productid===undefined) {
            this.props.history.push('/')
        }
        return (
            <div>
                <Navbar auth={localStorage.getItem("current")} place={"Home"}/>
                <Viewproductcontent product={this.props.location.productid} products={this.state.products}/>
            </div>
        )
    }
}

export default withRouter(Viewproduct)

