import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Plusmodal from './plusmodal'
import Checkout from './checkout'

const useStyles = makeStyles(theme => ({

    root: {},
    media: {
        height: 280
    }
}));
export default function Pluscom() {
    const classes = useStyles();
    const [open,
        setOpen] = React.useState(false);
    const [option1,
        setOption] = React.useState(0)

    const handleOpen = async(option1) => {
        setOption(option1)
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const email = localStorage.getItem("current")

    return (
        <Card className={classes.root} style={{
            display: 'flex'
        }}>
            <CardActionArea
                style={{
                width: '270px',
                marginLeft: '150px'
            }}
                onClick={() => handleOpen("899")}>
                <CardMedia
                    className={classes.media}
                    image="https://www.countrylifeinbc.com/wp-content/uploads/2018/03/icon-1y.png"
                    title="1-year"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        10% offer . Now at Rs.899 -only.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Become a plus member and save 10% on your one year annual subscription
                    </Typography>
                </CardContent>
                <div style={{
                    marginLeft: '75px'
                }}>
                    <Checkout name={email} description="Flipkart Plus Subscription" amount="899"/>
                </div>
            </CardActionArea>
            <CardActionArea
                style={{
                width: '270px',
                marginLeft: '50px'
            }}
                onClick={() => handleOpen("1599")}>
                <CardMedia
                    className={classes.media}
                    image="https://www.countrylifeinbc.com/wp-content/uploads/2018/03/icon-2y.png"
                    title="2-years"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        20% offer . Now at Rs.1599 -only.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Become a plus member and save 20% on your one year annual subscription
                    </Typography>
                </CardContent>
                <div style={{
                    marginLeft: '75px'
                }}>

                    <Checkout name={email} description="Flipkart Plus Subscription" amount="1599"/>
                </div>
            </CardActionArea>
            <CardActionArea
                style={{
                width: '270px',
                marginLeft: '50px'
            }}
                onClick={() => handleOpen("2247")}>
                <CardMedia
                    className={classes.media}
                    image="https://www.countrylifeinbc.com/wp-content/uploads/2018/03/icon-3y.png"
                    title="3-years"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        25% offer . Now at Rs.2247 -only.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Become a plus member and save 25% on your one year annual subscription
                    </Typography>
                </CardContent>
                <div style={{
                    marginLeft: '75px'
                }}>

                    <Checkout name={email} description="Flipkart Plus Subscription" amount="2247"/>
                </div>
            </CardActionArea>

           
        </Card>
    );
}