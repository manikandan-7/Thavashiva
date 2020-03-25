import React, {Component} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Navbar from './navbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Orderslistcom from './orderscomlist'

class Orderscom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            open: false,
            status: "received"
        }
    }
    useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: '120px',
            backgroundColor: theme.palette.background.paper
        },
        nested: {
            paddingLeft: theme.spacing(4)
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    }));
    componentDidMount() {
        this.callAPI()
    }
    callAPI = async() => {
        const response = await fetch('http://localhost:9000/getordernotifs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.sectionId,
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body = await response.json();
        console.log(body)
        this.setState({products: body})

    }
    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = (event) => {
        this.setState({status: event.target.value});
    };
    render() {
        const classes = this.useStyles;

        var sectionId = this.props.sectionId
        const products = this.state.products
        console.log(products)
        var open = this.state.open
        if (products.length !== 0) {
            return (
                <div>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        style={{
                        marginTop: '25px'
                    }}
                        className={classes.root}>

                        <ListItem
                            button
                            onClick={this.handleClick}
                            style={{
                            marginTop: '-30px'
                        }}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={sectionId}/>
 
                            {open
                                ? <ExpandLess/>
                                : <ExpandMore/>}
                        </ListItem>
                        {this.props.name === "solditems" && products.map(item => (
                            <Collapse in={open} timeout="auto" unmountOnExit>

                                <Orderslistcom name={"solditems"} item={item} sectionId={this.props.sectionId}/>

                            </Collapse>
                        ))}
                    </List>
                </div>
            )
        } else 
            return ""
    }
}

export default Orderscom
