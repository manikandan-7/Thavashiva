import React from 'react';
import {withRouter} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            email: '',
            password: '',
            confirmPassword:"",
            responseToPost: ''
        }
       
    }
    componentDidMount() {
        let re
        this
            .callApi()
            .catch(err => console.log(err));

            ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
                if (value !== this.state.password) {
                    return false;
                }
                return true;
            });

            ValidatorForm.addValidationRule('havenumber', (value) => {
                re = /[0-9]/;
                if(!re.test(this.state.password)) {
                    return false;
                }
                return true;
            });
            ValidatorForm.addValidationRule('havelength', (value) => {
                if(this.state.password.length<6) {
                    return false;
                }
                return true;
            });
            ValidatorForm.addValidationRule('havesmall', (value) => {
                re =  /[a-z]/;
                if(!re.test(this.state.password)) {
                    return false;
                }
                return true;
            });
            ValidatorForm.addValidationRule('havecaps', (value) => {
                re =  /[A-Z]/;
                if(!re.test(this.state.password)) {
                    return false;
                }
                return true;
            });
    }

    callApi = async() => {
        const response = await fetch('http://localhost:9000/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        });
        const body = await response.json();
        if (response.status !== 200) 
            throw Error(body.message);
        
        return body;
    };

    handleSubmit = async e => {
        const response = await fetch('http://localhost:9000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password,name:this.state.name})
        });
        const body = await response.text();

        this.setState({responseToPost: body});
        if (body === "User created") {
            // this
            //     .props
            //     .close()
            this.props.history.push("/login")
            window
                .location
                .reload(true)
        }
        e.preventDefault();

    };

    render() {
        const classes = useStyles;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form}>
                    <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Name"
                    onChange={e => this.setState({name: e.target.value})}
                    name="Name"
                    value={this.state.name}
                    validators={['required']}
                    errorMessages={['Name cannot be empty']}
                />
                <TextValidator
                    label="Email"
                    onChange={e => this.setState({email: e.target.value})}
                    name="email"
                    value={this.state.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                 <TextValidator
                    label="Password"
                    onChange={e => this.setState({password: e.target.value})}                    
                    name="password"
                    type="password"
                    validators={['required','havelength','havecaps','havesmall','havenumber']}
                    errorMessages={['this field is required','atleast 6 or more letters required','atleast one caps letter required','atleast one small letter required','password should contain one number']}
                    value={this.state.password}
                />
                <TextValidator
                    label="Repeat password"
                    onChange={e => this.setState({confirmpassword: e.target.value})}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={this.state.confirmpassword}
                />
                 <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{marginTop:'15px',width:'200px'}}
                            onClick={(e) => this.handleSubmit(e)}>
                            Sign up
                        </Button>
            </ValidatorForm>
                        
                       
                        {this.state.responseToPost}
                    </form>
                </div>
            </Container>
        );
    }
}

export default withRouter(Signup)