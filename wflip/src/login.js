import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter} from 'react-router-dom'

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
}));

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            responseToPost: '',
            setOpen: false
        }
    
    }
    componentDidMount() {
if(localStorage.getItem("current")!=="null")
this.props.history.push("/")
    }

    callApi = async() => {
        const response = await fetch('http://localhost:9000/login', {
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
        e.preventDefault();
        const response = await fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        });
        const body = await response.json();
        console.log(body)
        this.setState({responseToPost:body.signedIn})
        localStorage.setItem("accessToken", JSON.stringify(body.accessToken))
        localStorage.setItem("refreshToken", JSON.stringify(body.refreshToken))

        if (body.signedIn === "Signed In") {
            localStorage.setItem("current", this.state.email)
           

          
            window
                .location
                .reload(true)

        }
        else this.setState({responseToPost:body.status})
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
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                            autoComplete="current-password"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleClick}>
                            Login
                        </Button>
                        {this.state.responseToPost}
                    </form>
                </div>
            </Container>
        );
    }
}

export default withRouter(Login)