import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from './navbar'
import Table from './table'
import Buynowlist from './buynowlist'
import Button from '@material-ui/core/Button';
// import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf.js'
// import html2canvas from 'html2canvas'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

class Buynow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            redirect: false,
            user: []
        }

    }
    componentDidMount() {
        this.callAPI()

    }
    getuser = async() => {
        const response = await fetch('http://localhost:9000/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current")
            })
        });
        const body = await response.json();
        console.log(body)
        this.setState({user: body})
    }
    callAPI = async() => {
        // this.getuser()
        const response = await fetch('http://localhost:9000/getcart1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current")
            })
        });
        const body = await response.json();
        console.log(body)
        this.setState({products: body})
    }

    // handleDownload = async() => {
    //     await html2canvas(document.querySelector('#print')).then(canvas => {
    //         window.scrollTo(0, 0);
    //         const imgData = canvas.toDataURL('image/png');
    //         console.log(imgData)
    //         const pdf = new jsPDF();
    //         pdf.text('#invoice', 5, 5)
    //         pdf.addImage(imgData, 'JPG', 0, 15);

    //         pdf.save("download.pdf");
    //     });
    // }
    render() {
        var redirect = this.state.redirect
        let products = this.state.products
        let user = this.state.user
        let total = 0
if((user.plus!==undefined)&& products.carts){
products.carts.map(product1 => {
    let product=product1.productdetail[0]
                product.pricedrop !== undefined
                    ? product.plusprice === null
                        ? total = parseInt(product.price) - parseInt(product.pricedrop)  + total
                        : total = parseInt(product.price) - parseInt(product.pricedrop) - parseInt(product.plusprice)  + total

                    : product.plusprice !== null
                        ? total = parseInt(product.price)- parseInt(product.plusprice) + total
                        : total = parseInt(product.price) + total

})
        }
if((user.plus===undefined)&& products.carts){

    products.carts.map(product1 => {
        let product=product1.productdetail[0]

        product.pricedrop !== undefined
                ? total = parseInt(product.price) - parseInt(product.pricedrop) + total
            : total = parseInt(product.price) + total
})
}
       

        return (

            <div style={{
                display: "grid"
            }}>
                <div id='print'>
                    <div>
                        <h2>Total billing Amount : Rs.{total}</h2>
                    </div>
                    <div style={{
                        marginTop: '15px'
                    }}>
                        {products.length !== 0
                            ? <div>
                                    <div
                                        style={{
                                        display: 'flex',
                                        marginLeft: '-200px',
                                        width: '800px',
                                        overflow: 'auto'
                                    }}>
                                        <Buynowlist
                                            products={this.state.products}
                                            place={"cart"}
                                            callAPI={this.callAPI}
                                            user={this.state.user}
                                            total={total}/>

                                        <Card
                                            style={{
                                            float: 'left',
                                            marginLeft: '10px',
                                            marginTop: '10px'
                                        }}>

                                            <CardContent>
                                                <CardMedia
                                                    image="https://booster.io/wp-content/uploads/product-add-to-cart-e1438362099361.png"
                                                    title="Paella dish"
                                                    onClick={() => {
                                                    this.setState({redirect: true})
                                                }}
                                                    style={{
                                                    width: '200px',
                                                    height: '200px',
                                                    cursor: 'pointer'
                                                }}/>

                                            </CardContent>

                                        </Card>

                                    </div>
                                    <div></div>
                                    <div>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            style={{
                                            marginTop: '20px'
                                        }}
                                            onClick={() => {
                                            this
                                                .props
                                                .callchild("exit")
                                        }}>Back
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            style={{
                                            marginLeft: '300px',
                                            marginTop: '20px'
                                        }}
                                            onClick={() => {
                                            this
                                                .props
                                                .callchild("valid",total)
                                        }}>Next
                                        </Button>
                                    </div>
                                </div>
                            : <h1>Nothing To Show</h1>}
                    </div>
                    {redirect
                        ? <Redirect to="/"/>
                        : ""}
                </div>

            </div>
        )
    }
}

export default Buynow