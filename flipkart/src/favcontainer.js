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
            buttonname: "Add To Cart",
            buttondisabled: false,
            favcolor: "yellow"
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
    }
    componentDidMount() {
        this.calldefault()
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
            this.setState({buttonname: "In Cart", buttondisabled: true})
        }
        if (body === "favitem") {
            this.setState({favcolor: "yellow", buttonname: "In Cart", buttondisabled: true})
        } else {
            this.setState({favcolor: "yellow", buttonname: "Add To Cart"})
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
                    return <Redirect to='/'/>
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
                    console.log("exit")

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
            ? "In Cart"
            : "Remove"
        this.setState({
            buttonname: button

        }, async() => {
            if (this.state.buttonname === "Remove") {
                const response = await fetch('http://localhost:9000/additems1', {
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

            } else {
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
            }
        })
        this
            .props
            .callAPI()

        this.calldefault()

    }
    render() {
        const classes = useStyles
        const product = this.props.product
        var favcolor = this.state.favcolor
        console.log("favs")
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
                        {product.price}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
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
                </CardActions>
            </Card>
        );
    }
}

export default Cartcontainer