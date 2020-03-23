import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Map1 from './map'
import Button from '@material-ui/core/Button';

class Userdetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            checked: false
        }
      
    }

    componentDidMount() {
        this.callApi()
    }

    callApi = async() => {
        const response = await fetch('http://localhost:9000/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem("current")
            })
        });
        const body = await response.json();
        console.log(body)
        this.setState({user: body})
    }

    handleSubmit=async(e)=> {
        
        console.log(new FormData(e.target))
        console.log(e)
        if(e==="back"){
          this.props.callchild("back")
        }
        if (e === "exit") {
            this
                .props
                .callchild("exit")
        }
        if (e === "valid") {
            this
                .props
                .callchild("valid")
        }
        const response = await fetch('http://localhost:9000/checkaddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:localStorage.getItem("current"),
                firstname: e.target.firstName.value,
                lastname: e.target.lastName.value,
                address1: e.target.address1.value,
                city: e.target.city.value,
                zip: e.target.zip.value,
                country: e.target.country.value
            })
        });
        const body = await response.text();
        console.log(body)
        
        if (e === "exit") {
            this
                .props
                .callchild("exit")
        }
        this
        .props
        .callchild("valid")

    }
    render() {
        const body = this.state.user
        var checked = this.state.checked
        return (
            <React.Fragment >
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Typography gutterBottom>
                    Name : {body.name}
                </Typography>
                <Typography gutterBottom>
                    E-mail : {body.email}
                </Typography>
                <Typography gutterBottom>
                    Mobile : {body.phone}
                </Typography>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={< Checkbox color = "secondary" name = "saveAddress" onClick = {
                        () => {
                            this.setState({
                                checked: !checked
                            })
                        }
                    } />}
                        label="Use another address"/>
                </Grid>
                {checked
                    ? <form
                            onSubmit={(e) => {
                            this.handleSubmit(e)
                        }}>

                            <Grid
                                container
                                spacing={3}
                                style={{
                                width: '400px',
                                overflow:'auto'
                            }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        autoComplete="fname"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="lname"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address1"
                                        name="address1"
                                        label="Address line 1"
                                        fullWidth
                                        autoComplete="billing address-line1"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="address2"
                                        name="address2"
                                        label="Address line 2"
                                        fullWidth
                                        autoComplete="billing address-line2"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="billing address-level2"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="state" name="state" label="State/Province/Region" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete="billing postal-code"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="country"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        autoComplete="billing country"/>
                                </Grid>

                            </Grid>
                            <div style={{marginTop:'20px'}}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                    this.handleSubmit("back")
                                }}>Back
                                </Button>
                                <Button type="button" variant="contained" color="primary"
                                style={{marginLeft:'220px'}} onClick={() => {
                                    this.handleSubmit("valid")
                                }} >
                                    Next
                                </Button>
                            </div>
                        </form>
                    : ""
}
            </React.Fragment>
        );
    }
}

export default Userdetails