import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red, yellow} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Redirect from 'react-router';
import Viewproduct from './viewproduct';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import SimpleModal from './modal';
import Popup from './pricedroppopup'
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 350
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme
            .transitions
            .create('transform', {duration: theme.transitions.duration.shortest})
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

class Productcontainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            setExpanded: false,
            buttonname: "Add To Cart",
            buttondisabled: false,
            favcolor: "grey",
            auth: this.props.auth,
            offset: 0,
            loaded: false,
            count: 0,
            cartcount: 0,
            isadmin: false,
            pricedropdisable: false,
            showPopup: false,
            user:[]
        }
        this.handleExpandClick = this
            .handleExpandClick
            .bind(this)
        this.handleCart = this
            .handleCart
            .bind(this)
        this.handleFav = this
            .handleFav
            .bind(this)
        this.showImage = this
            .showImage
            .bind(this)
        this.handlePricedrop = this
            .handlePricedrop
            .bind(this)
    }
    togglePopup(discount) {
        this.setState({
            showPopup: !this.state.showPopup
        });
        discount && this.handlePricedrop(discount)
    }
    handlePricedrop = async(discount) => {
        console.log(discount)
        const response = await fetch('http://localhost:9000/pricedrop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productid: this.props.product.productid, pricedrop: discount})
        });
        const body = await response.text();
        console.log(body)
        alert("Price dropped for the product id " + this.props.product.productid)
        this.setState({pricedropdisable: true})
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
    showImage = () => {
        this.setState({loaded: true});
    }
    calldefault = async() => {
        let user = (localStorage.getItem("current"))

        const response = await fetch('http://localhost:9000/userdefault1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user, productid: this.props.product.productid})
        });
        const body = await response.text();
        console.log(body)
        this.setState({isadmin: this.props.isadmin})
        if (body === "fav") {
            this.setState({favcolor: "yellow"})
        }
        if (body === "item") {
            this.setState({buttonname: "Added", buttondisabled: true})
        }
        if (body === "favitem") {
            this.setState({favcolor: "yellow", buttonname: "Added", buttondisabled: true})
        }

    }
    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll);

        this.calldefault();
        this.getuser()
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    handleFav = async e => {
        let user = (localStorage.getItem("current"))
        let color = this.state.favcolor === "yellow"
            ? "grey"
            : "yellow"
        this.setState({
            favcolor: color
        }, async() => {
            if (this.state.favcolor === "yellow") {
                const response = await fetch('http://localhost:9000/addfav1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: user,
                        email:localStorage.getItem("current"),
                        productid: this.props.product.productid,
                        accesstoken: localStorage.getItem("accessToken")
                    })
                });
                const body = await response.text();
                console.log(body)
                if (body === "Unauthorized") {
                    window
                        .location
                        .reload(true)
                }
            } else {
                const response = await fetch('http://localhost:9000/delfav1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: user,
                        productid: this.props.product.productid,
                        accesstoken: localStorage.getItem("accessToken")
                    })
                });
                const body = await response.text();
                console.log(body)
                if (body === "Unauthorized") {
                    window
                        .location
                        .reload(true)
                }
            }
        })
    }

    handleCart = async e => {
        const response1 = await fetch('http://localhost:9000/getorderviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body1 = await response1.json();
        let imgtodrag = document.getElementsByClassName(this.props.product.productid)[0];
        let viewcart = document.getElementsByClassName('cart')[0];
        let imgtodragImage = imgtodrag.querySelector('.item');

        let disLeft = imgtodrag
            .getBoundingClientRect()
            .left + 50;
        let disTop = imgtodrag
            .getBoundingClientRect()
            .top + 300;
        let cartleft = viewcart
            .getBoundingClientRect()
            .left;
        let carttop = viewcart
            .getBoundingClientRect()
            .top;
        let image = imgtodragImage.cloneNode(true);

        image.style = 'z-index: 1000; width: 200px;opacity:1; position:fixed; top:' + disTop + 'px;left:' + disLeft + 'px;transition: left 2s, top 2s, width 2s, opacity 3s cubic-bezier(1, 1, 1, 1)';
        var rechange = document
            .body
            .appendChild(image);
        setTimeout(function () {
            image.style.left = cartleft + 'px';
            image.style.top = carttop + 'px';
            image.style.width = '40px';
            image.style.opacity = '0';
        }, 200);
        setTimeout(function () {
            rechange
                .parentNode
                .removeChild(rechange);
        }, 2000);
        this.setState({cartcount: body1})

        let user = (localStorage.getItem("current"))

        this.setState({
            buttonname: "Added",
            buttondisabled: true,
            count: this.state.count + 1
        }, async() => {
            if (this.state.favcolor !== "Added") {
                const response = await fetch('http://localhost:9000/additems1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: user,
                        email:localStorage.getItem("current"),
                        productid: this.props.product.productid,
                        accesstoken: localStorage.getItem("accessToken")
                    })
                });
                const body = await response.text();
                console.log(body)
                this
                    .props
                    .callback(this.state.cartcount)

                if (body === "Unauthorized") {
                    window
                        .location
                        .reload(true)
                }
            } else {
                const response = await fetch('http://localhost:9000/delitems1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: user,
                        email:localStorage.getItem("current"),
                        productid: this.props.product.productid,
                        accesstoken: localStorage.getItem("accessToken")
                    })
                });
                const body = await response.text();
                console.log(body)
                if (body === "Unauthorized") {
                    window
                        .location
                        .reload(true)
                }
            }
        })

    }
    render() {
        const product = this.props.product
        var favcolor = this.state.favcolor
        var auth = this.state.auth
        var isadmin = this.props.isadmin
        var user=this.state.user
        return (
        
            <Card
                className={product.productid}
                style={{
                width: '351px',
                display: 'inline-block',
                marginLeft: '50px',
                marginTop: '50px'
            }}>
                {this.state.count
                    ? <SimpleModal cartcount1={"cartcount"}/>
                    : ""}

                <img
                    src="https://react.semantic-ui.com/images/wireframe/image-text.png"
                    alt="Loading"
                    style={this.state.loaded
                    ? {
                        display: "none"
                    }
                    : {
                        height: '200px'
                    }}/>
                

                <img
                    className="item"
                    src={product.image}
                    alt="Loading"
                    onLoad={this.showImage}
                    style={this.state.loaded
                    ? {
                        height: '250px',
                        width:'320px'
                    }
                    : {
                        display: "none"
                    }}/>
                    
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.productid}
                    </Typography>
                    <Link
                        to={{
                        pathname: "/viewproduct",
                        productid: product
                    }}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                            {product.name}
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.desc}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       {user.plus!==undefined? 
                        <div>
                            {product.pricedrop !==undefined
                            ? product.plusprice !== undefined
                                ? <div>
                                        <div style={{textDecoration:'line-through'}}>Rs.{product.price}</div>
                                        <div  style={{textDecoration:'line-through'}}>Now at Rs.{parseInt(product.price) - parseInt(product.pricedrop)}</div>
                                        <div>Plus price Rs.{parseInt(product.price) - parseInt(product.pricedrop) - parseInt(product.plusprice)}</div>
                                    </div>
                                : <div>
                                        <div  style={{textDecoration:'line-through'}}>Rs.{product.price}</div>
                                        <div>Now at Rs.{parseInt(product.price) - parseInt(product.pricedrop)}</div>
                                    </div>
                            : product.plusprice !==undefined
                                ? <div>
                                        <div>Rs.{product.price}</div>
                                    </div>
    : <div>Rs.{product.price}</div>}</div>:""
}


{user.plus===undefined || user.plus===null ? <div>
{product.pricedrop === undefined || product.pricedrop===null
                            ? <div>{product.price}</div>
                            : <div
                                style={{
                                fontSize: 'large'
                            }}>
                                <div
                                    style={{
                                    textDecoration: 'line-through'
                                }}>{product.price}</div>Now at Rs.{parseInt(product.price) - parseInt(product.pricedrop)}
                                </div>
                                }</div>:""}

                    </Typography>
                </CardContent>

                {auth !== "null"
                    ? <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon
                                    onClick={(e) => this.handleFav(e)}
                                    style={{
                                    color: favcolor
                                }}/>
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={{
                                marginLeft: '0px'
                            }}
                                value={this.state.buttonname}
                                disabled={this.state.buttondisabled}
                                onClick={(e) => this.handleCart(e)}>{this.state.buttonname}</Button>

                            {isadmin
                                ? <Button
                                        variant="outlined"
                                        color="secondary"
                                        style={{
                                        marginLeft: '0px'
                                    }}
                                        value="pricedrop"
                                        disabled={this.state.pricedropdisable}
                                        onClick={this
                                        .togglePopup
                                        .bind(this)}>Price drop</Button>
                                : ""}
                            {this.state.showPopup
                                ? <Popup
                                        text='Click "Close Button" to hide popup'
                                        closePopup={this
                                        .togglePopup
                                        .bind(this)}
                                        product={product}
                                        handlePricedrop={this.handlePricedrop}/>
                                : null
}
                        </CardActions>
                    : ""
}
            </Card>

        );
    }
}

export default withRouter(Productcontainer)