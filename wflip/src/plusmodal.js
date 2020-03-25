import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Payment from './payment'

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

export default function Plusmodal(props) {
    const classes = useStyles();
    const [open,
        setOpen] = React.useState(props.open);
    console.log(open)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.handleClose()
    };
    useEffect(() => {
        props.open
            ? handleOpen()
            : handleClose()
    }, [props.open])
    return (
        <div>

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
                        {props.option==="899"?<div> <h1>Flipkart Plus Membership</h1>
                        <h2 id="transition-modal-title">One year subscription</h2></div>:""}
                       
                        {props.option==="1599"?<div> <h1>Flipkart Plus Membership</h1>
                        <h2 id="transition-modal-title">Two years subscription</h2></div>:""}
                        {props.option==="2247"?<div> <h1>Flipkart Plus Membership</h1>
                        <h2 id="transition-modal-title">Three years subscription</h2></div>:""}

                        <div
                            style={{
                            width: '600px'
                        }}>
                            <div style={{width:'300px',marginLeft:'300px'}}>
                                <Payment name="plus" option={props.option}/>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}