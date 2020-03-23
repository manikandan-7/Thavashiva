import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Viewscom from './viewscom'

class Views extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            products: [],
            productcount:0
        }
    }
    componentDidMount(){
        this.callAPI()
    }

    callAPI=async()=>{
        var response = await fetch('http://localhost:9000/getviewnotifsusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
        var users=this.state.users
       
        if(this.state.productcount!==0){
        return (
            <List
                subheader={< li />}
                style={{
                width: '100%',
                maxWidth: 460,
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300
            }}>
                {users.map(sectionId => (<Viewscom sectionId={sectionId}/>))}
            </List>
        );
    }
    else return <h1>You've caught up all ! !</h1>
}
}
export default Views