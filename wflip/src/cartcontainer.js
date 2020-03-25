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
import {Redirect} from 'react-router';

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

class Cartcontainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            setExpanded: false,
            buttonname: "Remove",
            buttondisabled: false,
            favcolor: "grey",
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
        this.handlePricedrop = this
            .handlePricedrop
            .bind(this)
    }
    componentDidMount(){
        this.getuser()
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
    handlePricedrop = async() => {
        const response = await fetch('http://localhost:9000/pricedrop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productid: this.props.product.productid})
        });
        const body = await response.text();
        console.log(body)
        alert("Price dropped for the product id " + this.props.product.productid)
        this.setState({pricedropdisable: true})
    }
    calldefault = async() => {
        let user = (localStorage.getItem("current"))

        const response = await fetch('http://localhost:9000/userdefault1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user,
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
        if (body === "fav") {
            this.setState({favcolor: "yellow"})
        }
        if (body === "item") {
            this.setState({buttonname: "Remove", buttondisabled: false})
        }
        if (body === "favitem") {
            this.setState({favcolor: "yellow", buttonname: "Remove", buttondisabled: false})
        } else {
            this.setState({buttonname: "Remove"})
        }

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
                this
                    .props
                    .callAPI()

                this.calldefault()
            } else if (this.state.favcolor === "grey") {
                const response = await fetch('http://localhost:9000/delfav1', {
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
                    return <Redirect to='/'/>
                }
                this
                    .props
                    .callAPI()

                this.calldefault()
            }
        })

    }

    handleCart = async e => {
        let user = (localStorage.getItem("current"))
        let button = this.state.buttonname === "Remove"
            ? "Remove"
            : "Removed"
        this.setState({
            buttonname: button

        }, async() => {

            const response = await fetch('http://localhost:9000/delitems1', {
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

            this
                .props
                .callAPI()

            this.calldefault()

        })
    }
    render() {
        const classes = useStyles
        const product = this.props.product
        console.log("cart")
        var user=this.state.user
        console.log(user.plus,product.plusprice,product.pricedrop)

        return (
            <Card
                className={classes.card}
                style={{
                width: '260px',
                display: 'inline-block',
                marginLeft: '50px',
                marginTop: '50px'
            }}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title="Paella dish"
                    style={{
                    width: '200px',
                    height: '200px'
                }}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.productid}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.desc}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {user.plus!==undefined ? 
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
                <CardActions disableSpacing>
                    <Button
                        variant="outlined"
                        color="secondary"
                        style={{
                        marginLeft: '0px'
                    }}
                        value={this.state.buttonname}
                        disabled={this.state.buttondisabled}
                        onClick={(e) => this.handleCart(e)}>{this.state.buttonname}</Button>
                </CardActions>
            </Card>
        );
    }
}

export default Cartcontainer