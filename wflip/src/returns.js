import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Returnscom from './returnscom'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Navbar from './navbar';

class Returnitems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            products: [],
            productcount: 0,
            open: true
        }
    }
   
    componentDidMount() {
        this.callAPI()
    }
   
    callAPI = async() => {
        var response = await fetch('http://localhost:9000/getordernotifsusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({return:"true",
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        var body = await response.json();
        console.log(body)
        this.setState({users: body})

        response = await fetch('http://localhost:9000/getorderviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.sectionId,
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        body = await response.json();
        console.log(body)
        this.setState({productcount: body})

    }

    render() {
        var users = this.state.users
        const classes = this.useStyles;
var open=this.state.open
        if (this.state.productcount !== 0) {
            return (
                <div>
                    <Navbar place="cart"/>
            <div
                style={{
                marginTop: '30px',
                paddingTop: '30px'
            }}></div>
                    <List
                        subheader={< li />}
                        style={{
                        width: '100%',
                        maxWidth: 460,
                        position: 'relative',
                        maxHeight: 300
                    }}>
                        {users.map((sectionId,index) => (<Returnscom name={"returnitems"} sectionId={sectionId} index={index} callApi={this.callAPI}/>))}

                    </List>
                   
                </div>
            );
        } else 
            return <h1>You've caught up all ! !</h1>
    }
}
export default Returnitems