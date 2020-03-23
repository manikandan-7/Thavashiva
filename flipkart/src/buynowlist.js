import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    card: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

class Buynowlist extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.handleCart=this.handleCart.bind.this
    }
    handleCart=async()=>{
        const response = await fetch('http://localhost:9000/delitems1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productid: this.props.product.productid,
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body = await response.text();
        console.log(body)
            window
                .location
                .reload(true)
    }
    render() {
        const classes = useStyles
        const products = this.props.products
        const user=this.props.user
        return (products.carts.map(product1 => {
            let product=product1.productdetail[0]
            return (
                <Card
                    className={classes.card}
                    style={{
                    float: 'left',
                    marginLeft: '10px',
                    marginTop: '10px',                    
                    width:'fit-content',
                    display:'contents',

                }}>

                    <CardContent>
                        <CardMedia
                            className={classes.media}
                            image={product.image}
                            title="Paella dish"
                            style={{
                            width: '200px',
                            height: '200px'
                        }}/>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography className={classes.pos} color="textSecondary">
                        {user.plus===undefined || user.plus===null? 
                        <div>{product.pricedrop !== undefined
                            ? product.plusprice === null ||  product.plusprice ===undefined
                                ? <div>
                                    
                                        <div>Rs.{parseInt(product.price) - parseInt(product.pricedrop) }</div>
                                    </div>
                                : <div>
                                        <div>Rs.{parseInt(product.price) - parseInt(product.pricedrop)- parseInt(product.plusprice)}</div>
                                    </div>
                            : product.plusprice !== undefined 
                                ? <div>
                                        <div>Rs.{parseInt(product.price) - parseInt(product.plusprice)}</div>
                                    </div>
    : <div>Rs.{product.price}</div>}</div>:""
}                   
{user.plus!==undefined  ? <div>
{product.pricedrop === undefined
                            ? <div>{product.price}</div>
                            : <div>
                            Rs.{parseInt(product.price) - parseInt(product.pricedrop)}
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
                            value="Remove"
                            onClick={()=>{const response =  fetch('http://localhost:9000/delitems1', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    productid: product.productid,
                                    accesstoken: localStorage.getItem("accessToken")
                                })
                            });
                            const body =  response;
                            console.log(body)
                                window
                                    .location
                                    .reload(true)}}>Remove</Button>
                    </CardActions>
                </Card>
            );
        }))
    }
}

export default Buynowlist