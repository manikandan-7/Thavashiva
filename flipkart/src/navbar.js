import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SimpleModal from './modal';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Redirect} from 'react-router';
import Searchbar from './searchbar'
import Navmenu from './navmenu'
import Registerplus from './plus'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

class Navbar extends Component {
    constructor(props) {

        super(props)

        this.state = {
            auth: this.props.auth,
            home: this.props.home,
            isAdmin: this.props.isAdmin,
            setAnchorEl: null,
            anchorEl: null,
            reqstatus: "",
            user:[],
            company:[]
        }

        this.handleLogout = this
            .handleLogout
            .bind(this)
        this.handleReqstatus = this
            .handleReqstatus
            .bind(this)
        this.adminstatus = this
            .adminstatus
            .bind(this)
        this.reqstatus = this
            .reqstatus
            .bind(this)
    }
    getuser= async() => {
        const response1 = await fetch('http://localhost:9000/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current")
            })
        });
        var body = await response1.json();
        console.log(body)
        this.setState({user: body})


        // const response = await fetch('http://localhost:9000/getcompany', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: localStorage.getItem("current")
        //     })
        // });
        // var body1 = await response.json();
        // console.log(body1)
        // this.setState({company: body1})

    }
    adminstatus = async() => {
        const response1 = await fetch('http://localhost:9000/adminstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.props.auth})
        });
        var body = await response1.text();
        if (this.state.auth === "null") {
            this.setState({isAdmin: ""});
        } else if (body === "true") {
            await this.setState({isAdmin: true, auth: this.props.auth})
        } else {
            await this.setState({isAdmin: false, auth: this.props.auth})
        }
    }
    reqstatus = async() => {
        // const response = await fetch('http://localhost:9000/reqstatus', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: localStorage.getItem("current")
        //     })
        // });
        // var body = await response.text();
        // console.log(body)
        // if(body==="Blocked") body="Blocked"
        // else if (body === "true") 
        //     body = "Requested"
        // else 
        //     body = "Request"
        await this.setState({reqstatus: "Request"})
    }
    componentDidMount() {
        this.adminstatus()
        this.reqstatus()
        this.getuser()
    }

    handleLogout = async() => {
        const response1 = await fetch('http://localhost:9000/updateorderstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                remindset: true,
                accesstoken: localStorage.getItem("accessToken")
            })
        })
        const response = await fetch('http://localhost:9000/logouttoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("accessToken")
            })
        });
        var body = await response.text();

        console.log(body)
        localStorage.setItem("current", "null")
        this.setState({setAnchorEl: null, anchorEl: null})
        window
            .location
            .reload(true)
    }
    async handleReqstatus() {
        if (this.state.reqstatus === "Request") {
            this.setState({reqstatus: "Requested"})
            const response = await fetch('http://localhost:9000/reqadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current")
            })
        });
        var body = await response.text();
        console.log(body)
        }

    }

    render() {
        const auth = localStorage.getItem("current")
        const isAdmin = this.state.isAdmin
        const home = this.props.place
        const company=this.state.company
       
        if ((home === undefined || auth === "null") && auth === undefined) 
            return <Redirect to='/'></Redirect>

        var reqstatus = this.state.reqstatus
        if (home === "home") {
            var height = "-360px"
        } else if (home === "notifs") 
            var height = "30px"
        else 
            var height = "-130px"

        const classes = useStyles
        return (
            <div className={classes.root}>
                <AppBar
                    style={{
                    position: 'fixed',
                    zIndex: 10
                }}>
                    <Toolbar>
                        {localStorage.getItem("current") !== "null"
                            ? <Navmenu
                                    isAdmin={isAdmin}
                                    reqstatus={reqstatus}
                                    handleReqstatus={this.handleReqstatus}
                                    company={company}
                                    />
                            : ""}
                        {this.state.user.plus==="false"? <Typography variant="h6" className={classes.title}>
                            Flipkart
                        </Typography>:""}
                        {this.state.user.plus!=="false"? <Typography variant="h6" className={classes.title}>
                            Flipkart +
                        </Typography>:""}
                       
                        {localStorage.getItem("current") !== "null"&& isAdmin===false && this.props.plus!=="plus" && this.state.user.plus==="false"
                            ? <Link to='/registerplus'><Button
                            style={{
                            width: 'fit-content',
                            marginLeft:'210px'
                        }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickAccept}
                            className={classes.submit}>
                            Become + member
                        </Button>
                        </Link>
                            : ""}
                        
                    </Toolbar>

                </AppBar>
                {auth === "null" && (
                    <div>
                        <SimpleModal name={"Signup"}/>
                        <SimpleModal name={"Login"} callAPI={this.props.callAPI}/>
                    </div>
                )}
                {auth !== "null"
                ?this.state.user.issuper!=="true"
                    ? isAdmin
                        ? (<SimpleModal name={"Add Items"}/>)
                        : ""
                    : ""
                :""}
                {auth !== "null"
                ? this.state.user.issuper==="true"
                    ? isAdmin
                        ? (<SimpleModal name={"Notifs"}/>)
                        : ""
                    : ""
                :""}

                {auth !== "null"
                    ? home !== "home"
                        ? (<SimpleModal name={"Home"}/>)
                        : (<SimpleModal name={"Cart"} cartcount={this.props.cartcount}/>)
                    : ""}
                {auth !== "null"
                
                 ?(<SimpleModal name={"Wishlist"}/>):""}

            </div>
        )
    }
}

export default(Navbar);