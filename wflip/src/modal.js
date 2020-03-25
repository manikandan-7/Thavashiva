import React from "react";
import {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import Modal from '@material-ui/core/Modal';
import Signup from './signup'
import Login from './login'
import Additems from './additems'
import Notifscom from './notifscom'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

function getModalStyle() {
    const top = 50
    const left = 50
    return {top: `${top}%`, left: `${left}%`, transform: `translate(-${top}%, -${left}%)`};
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function SimpleModal(props) {
    var views1
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open,
        setOpen] = React.useState(false);
    var [views,
        setViews] = React.useState(props.cartcount)
    const callApicarts = async() => {
        const response = await fetch('http://localhost:9000/getorderviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body = await response.json();
        localStorage.setItem("cartcount", JSON.stringify(body))

        await setViews(parseInt(body) + 1)

        console.log(body)

        console.log(views)

    }

    const handleOpen = async() => {
        setOpen(true);

    };

    const handleClose = async() => {
        setOpen(false);

    };
    let comp = props.name
    views = (localStorage.getItem(("cartcount")))
    console.log(views)
    useEffect(() => {
        callApicarts()
    }, []);
    return (
        <div>
            {comp === "Signup"
                ? <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        style={{
                        float: "right",
                        marginTop: "-15px",
                        marginLeft: "1164px",
                        position: 'fixed',
                        zIndex: 30
                    }}>
                        {comp}
                    </Button>
                : comp === "Login"
                    ? <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                            style={{
                            float: "right",
                            marginTop: "-15px",
                            marginLeft: "1084px",
                            position: 'fixed',
                            zIndex: 30
                        }}>
                            {comp}
                        </Button>
                    : comp === "Add Items"
                        ? <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                style={{
                                float: "right",
                                marginTop: "-15px",
                                marginLeft: "850px",
                                position: 'fixed',
                                zIndex: 30
                            }}>
                                {comp}
                            </Button>
                        : comp === "Cart"
                            ? <Link to="/mycart">
                                    <Badge
                                        badgeContent={parseInt(props.cartcount) + 1}
                                        color="error"
                                        style={{
                                        zIndex: 300,
                                        position: 'fixed',
                                        marginLeft: '1220px',
                                        marginTop: '-15px'
                                    }}>
                                        <Button
                                            className="cart"
                                            variant="contained"
                                            color="primary"
                                            style={{
                                            float: "right",
                                            marginLeft: '-50px'
                                        }}>
                                            {comp}
                                        </Button>
                                    </Badge>

                                </Link>
                            : comp === "Home"
                                ? <Link to="/">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{
                                            float: "right",
                                            marginTop: "-15px",
                                            marginLeft: "1164px",
                                            position: 'fixed',
                                            zIndex: 30
                                        }}>
                                            {comp}
                                        </Button>
                                    </Link>
                                : comp === "Notifs"
                                    ? <Link to="/notifs">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{
                                                float: "right",
                                                marginTop: "-15px",
                                                marginLeft: "967px",
                                                position: 'fixed',
                                                zIndex: 30
                                            }}>
                                                {comp}
                                            </Button>
                                        </Link>
                                    : <Link to="/mywish">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{
                                            float: "right",
                                            marginTop: "-15px",
                                            marginLeft: "1060px",
                                            zIndex: 30,
                                            position: 'fixed'
                                        }}>
                                            {comp}
                                        </Button>
                                    </Link>
}
 
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    {comp === "Signup"
                        ? <Signup close={handleClose}/>
                        : comp === "Login"
                            ? <Login close={handleClose} callAPI={props.callAPI}/>
                            : comp === "Add Items"
                                ? <Additems close={handleClose}/>
                                : comp === "Notifs"
                                    ? <Notifscom/>
                                    : ""
}

                </div>
            </Modal>
        </div>
    );
}