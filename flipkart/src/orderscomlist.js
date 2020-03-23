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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


class Orderscomlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            status:""
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
        console.log(this.props.sectionId,this.props.item.productid)
        const response = await fetch('http://localhost:9000/getorderlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.sectionId,
                productid:this.props.item.productid,
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body = await response.json();
        console.log(body)
        this.setState({status:body[0].status})
    }
    handleChange = async(event) => {
        this.setState({status: event.target.value},async()=>{
            const response = await fetch('http://localhost:9000/updateorderstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.props.sectionId,
                    productid:this.props.item.productid,
                    status:this.state.status,
                    accesstoken: localStorage.getItem("accessToken")
                })
            });
        });
        
    };
    handleClickAccept=async()=>{
        const response = await fetch('http://localhost:9000/updateorderstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.sectionId,
                productid:this.props.item.productid,
                returnresponse:"yes",
                accesstoken: localStorage.getItem("accessToken")
            })
    })
    this.props.callApi()
}
handleClickReject=async()=>{
    const response = await fetch('http://localhost:9000/updateorderstatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.props.sectionId,
            productid:this.props.item.productid,
            returnresponse:"no",
            accesstoken: localStorage.getItem("accessToken")
        })
})
this.props.callApi()
}

    render() {
        const classes = this.useStyles;
        var item=this.props.item
        console.log(item)
        var status=this.state.status
        var sectionId=this.props.sectionId
        console.log(sectionId)
        return (
            <div>
                 <List
                                    component="div"
                                    disablePadding
                                    style={{
                                    marginLeft: '50px'
                                }}>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                    {this.props.name==="solditems" && 
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={status}
                            onChange={this.handleChange}>
                            <MenuItem value="received">Order Received</MenuItem>
                            <MenuItem value="packing">Packing</MenuItem>
                            <MenuItem value="shipping">Shipping</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                        <FormHelperText>Select order delivery status</FormHelperText>
                    </FormControl>}
                    {this.props.name==="returnitems" && 
                    <div>
                    <Button
                    style={{width:'fit-content'}}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleClickAccept}
                    className={classes.submit}>
                    Accept
                </Button>
                <Button
                style={{width:'fit-content',marginLeft:'15px'}}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={this.handleClickReject}

                className={classes.submit}>
                Reject
            </Button></div>
                    } 

                </ListItem>
                </List>
            </div>
        )
    }
}

export default Orderscomlist
