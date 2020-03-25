import {useEffect} from 'react'
import React from 'react'
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
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        minwidth: 345
    },
    media: {
        height: '400px',
        width: '300px',
        marginLeft: '30%'
        // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme
            .transitions
            .create('transform', {duration: theme.transitions.duration.shortest})
    },

    avatar: {
        backgroundColor: red[500]
    }
}));

export default function Viewproductcontent(props) {
    const classes = useStyles();
    const [expanded,
        setExpanded] = React.useState(false);
    const [buttonname,
        setButtonname] = React.useState("Add To Cart");
    const [buttondisabled,
        setButtondisabled] = React.useState(false);
    const [favcolor,
        setFavcolor] = React.useState("grey");

    const calldefault = async() => {
        if (props.product === undefined) {}
        let user = (localStorage.getItem("current"))

        const response = await fetch('http://localhost:9000/userdefault1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user, productid: props.product.productid})
        });
        const body = await response.text();
        console.log(body)
        if (body === "fav") {
            setFavcolor("yellow")
        }
        if (body === "item") {
            setButtondisabled(true)
            setButtonname("Added")
        }

        if (body === "favitem") {
            setFavcolor('yellow')
            setButtonname("Added")
            setButtondisabled(true)
        }

    }

    const handleFav = async() => {
        setFavcolor("yellow")

        let user = (localStorage.getItem("current"))
        if (favcolor === "grey") {
            const response = await fetch('http://localhost:9000/addfav1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    email:localStorage.getItem("current"),
                    productid: props.product.productid,
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
                    productid: props.product.productid,
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
            setFavcolor("grey")
        }
    }
    const handleCart = async e => {
        let user = (localStorage.getItem("current"))

        if (favcolor !== "Added") {
            const response = await fetch('http://localhost:9000/additems1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    productid: props.product.productid,
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
            setButtonname("Added")
            setButtondisabled(true)
        } else {
            const response = await fetch('http://localhost:9000/delitems1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    productid: props.product.productid,
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
    }

    useEffect(() => {
        calldefault()
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            className={classes.card}
            style={{
            marginTop: '30px'
        }}>

            <CardMedia
                className={classes.media}
                image={props.product.image}
                title="Paella dish"/>
            <CardContent>
                <Typography variant="body2" component="p">
                    {props.product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.product.price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handleFav}
                    style={{
                    color: favcolor
                }}>
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton aria-label="Add to cart" onClick={handleCart}>
                    <Button variant="contained" color="secondary" disabled={buttondisabled}>
                        {buttonname}
                    </Button>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded
                })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>
                        {props.product.desc}
                    </Typography>

                </CardContent>
            </Collapse>

            <CardContent>
                <Typography paragraph>Other Sellers:</Typography>
                <Typography paragraph>
                    {props
                        .products
                        .map((product1) => {

                            return (<div>

                                <Link
                                    to={{
                                    pathname: "/viewproduct",
                                    productid: product1
                                }}>
                        {props.product.productid!==product1.productid &&

                                    <li>{product1.name}
                                        for {product1.price}
                                        -{product1.seller}</li>
                        }
                                </Link>

                            </div>)
                        })}
                </Typography>

            </CardContent>
        </Card>
    );
}