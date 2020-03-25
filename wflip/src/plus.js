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
import Pluscom from './pluscom'

class Registerplus extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          
        }
    }
   
    componentDidMount() {
        this.callAPI()
    }
   
    callAPI = async() => {
      

    }

    render() {
       
            return (
                <div>
                    <Navbar place="cart" plus="plus" />
            <div
                style={{
                marginTop: '30px',
                paddingTop: '30px'
            }}></div>
                    <img style={{marginLeft:'300px'}} src="https://assets.mspimages.in/wp-content/uploads/2019/09/Flipkart-Big-Billion-Day-Banner-02.jpg"/>
                   <Pluscom />
                </div>
            );
         
    }
}
export default Registerplus



