import React, {Component} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class Viewscom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.callAPI()
    }
    callAPI = async() => {
        const response = await fetch('http://localhost:9000/getviewnotifs', {
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
    render() {
        var sectionId = this.props.sectionId
        const products = this.state.products
        if (products.length !== 0) {
            return (
                <div>
                    <li
                        key={`section-${sectionId}`}
                        style={{
                        backgroundColor: 'inherit'
                    }}>
                        <ul
                            style={{
                            padding: '0px',
                            backgroundColor: 'inherit'
                        }}>
                            <ListSubheader>{`User : ${sectionId}`}</ListSubheader>
                            {products.map(item => (

                                <ListItem key={`item-${sectionId}-${item.name}`}>
                                    <Link
                                        to={{
                                        pathname: "/viewproduct",
                                        productid: item.productid
                                    }}>
                                        <ListItemText primary={`${item.name} ${item.price}`} style={{color:'black'}}/>
                                    </Link>
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                </div>
            )
        } else 
            return ""
    }
}

export default Viewscom
