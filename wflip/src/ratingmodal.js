import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Ratingvalue from './ratingvalue'
import Ratingcarousal from './ratingcarousal';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function Ratingmodal(props) {
    console.log(props.products)
    const classes = useStyles();
    const [open,
        setOpen] = React.useState(props.open);
    const [product,
        setproduct] = React.useState(props.products)
    
        const [change,setchange]=React.useState(true)

    const handleOpen = async() => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async(value, text,productid) => {
      setchange(!change)
      console.log(productid,"submit modal")
        const response = await fetch('http://localhost:9000/updateorderstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                productid: productid,
                rating: value,
                feedback: text,
                accesstoken: localStorage.getItem("accessToken")
            })
        });
    }

    const handleLater = async() => {
        const response = await fetch('http://localhost:9000/updateorderstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                productid: props.products.productid,
                remind: true,
                accesstoken: localStorage.getItem("accessToken")
            })
        })
        handleClose()
    }
useEffect(()=>{
  props.productrating()
  if(props.products.length===0) handleClose()
},[product])

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Tell us about your product
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500
            }}>
                <Fade in={open}>
                    <div className={classes.paper}>

                    <Ratingcarousal products={product} handleSubmit={handleSubmit} handleLater={handleLater} change={change} handleClose={handleClose}/>
                        
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}