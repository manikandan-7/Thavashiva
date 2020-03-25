import React, {Component} from 'react'
import Container from './container'
import Productcontainer from './productcontainer'
import Cartcontainer from './cartcontainer'
import Favcontainer from './favcontainer'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom'
import { trackPromise } from 'react-promise-tracker';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

class Table extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            key:"",
            offset:0,
            cartcount:localStorage.getItem("cartcount"),
            isadmin:false,
            user:[]
        }
        this.handleClick=this.handleClick.bind(this)
        this.handlechange=this.handlechange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.callApi=this.callApi.bind(this)
        this.callback=this.callback.bind(this)
    }
callback(props){
    this.setState({cartcount:props})
    this.props.cartcount(this.state.cartcount)
}
    componentDidMount() {

       
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
      }
    
    handleClick=async()=>{
        let user = (localStorage.getItem("current"))
       
            const response = await fetch('http://localhost:9000/addorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    accesstoken: localStorage.getItem("accessToken")
                })
            });
            const body = await response.text();
            console.log(body)
    }
    listenToScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
            this.setState({
                offset: this.state.offset + 8
            }, () => this.callApi())
        }
    }
    handleSubmit =async e=>{
        e.preventDefault();
        localStorage.setItem('searchkeyword',this.state.key);
        e.target.searchcontent.value=null;
        await this.props.history.push('/');
    }
    getuser=async()=>{
        const response = await fetch('http://localhost:9000/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:localStorage.getItem("current")})
        });
        const body = await response.json();
        console.log(body)
        this.setState({user:body})
    }
    callApi=()=>{
        this.getuser()
        if(this.props.scroll===true){
        window.removeEventListener('scroll', this.listenToScroll)
        }

        trackPromise(
        fetch('http://localhost:9000/searchproducts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ key:this.state.key,offset:this.state.offset }),
                        }).then((response)=>{
                            return response.json()
                        })
                        .then(data=>
                        {            let productdata=[...this.state.products,...data]

                            this.setState({
                                products:productdata,
                                isadmin:this.props.isadmin
                            })
                        }))        
    }
    handlechange =e=> {
        this.setState({
            key:e.target.value,
        },()=>{
            this.props.resetoffset(this.state.key)

            localStorage.setItem('searchkeyword',this.state.key);

            if(this.state.key.length>0){
                trackPromise(
                    fetch('http://localhost:9000/searchproducts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ key:this.state.key }),
                        }).then((response)=>{
                            return response.json()
                        })
                        .then(data=>
                        {
                            this.setState({
                                products:[...data]
                            })
                        }))
                        .catch(err=>console.log(err));
            }
        })

    }
    render() {
        const classes = useStyles
        let products
this.state.key===""?products = this.props.products:products = this.state.products
        let place = this.props.place
        let user=this.state.user
        console.log(products)
        return (
            <div style={{marginTop:'30px'}}>
                <div className="search">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input
                list="searchkey"
                placeholder="Search"
                name="searchcontent"
                className="searchinput"
                style={{marginLeft:'150px',position:'fixed',marginTop:'-10px',zIndex:30}}
                onChange={(e)=>{this.handlechange(e)}}
            />
            <datalist id="searchkey">
                {this.state.products.map(product=>{
                    return(
                        <option value={product.name} data-value={product.id} key={product.id}/>
                    )
                })}
            </datalist>
        </form>
      </div>
                {place === "home"
                    ? ((products.length!==0)
                        ?products.map((product, index) => {
                            return (<Productcontainer
                                product={product}
                                index={index}
                                auth={this.props.auth}
                                isadmin={this.props.isadmin}
                                place={place}
                                callback={this.callback}/>)
                        })
                        : <div style={{position:'absolute',marginTop:'60px'}}>Nothing To Show</div>)
                    : place === "cart"
                        ? (products)
                            ? products.carts.map((product, index) => {
                                return (<Cartcontainer
                                user={user}
                                    product={product.productdetail[0]}
                                    index={index}
                                    callAPI={this.props.callAPI}
                                    buynow={this.props.buynow}
                                   />
                                    
                                    )
                            })
                            : ""
                        : place === "favs"
                            ? (products)
                                ? products.favorites.map((product, index) => {
                                    return (<Favcontainer product={product.productdetail[0]} index={index} callAPI={this.props.callAPI}/>)
                                })
                                : ""
                            : ""
}
                {this.props.buynow === "buynow"
                    ? <Link to="/buynow">
                            <Button className={classes.root} variant="contained" color="secondary">
                                Buy now
                            </Button>
                        </Link>
                    : ""}

            </div>
        );
    }
}

export default Table