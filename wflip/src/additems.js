import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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
    }
}));

class Additems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            image: "",
            name: "",
            price: "",
            desc: "",
            responseToPost: "",
            return:false
        }
        this.handleSubmit = this
            .handleSubmit
            .bind(this)
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:9000/addproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.state.id, image: this.state.image, name: this.state.name, price: this.state.price, desc: this.state.desc,return:this.state.return})
        });
        const body = await response.text();

        this.setState({responseToPost: body});
        if (body === "Item Added") {
            this
                .props
                .close()
        }
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
                        Add Items
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="Product Id"
                            name="id"
                            autoFocus
                            value={this.state.id}
                            onChange={e => this.setState({id: e.target.value})}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            label="Product Image"
                            name="image"
                            autoFocus
                            value={this.state.image}
                            onChange={e => this.setState({image: e.target.value})}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Product Name"
                            name="name"
                            autoFocus
                            value={this.state.name}
                            onChange={e => this.setState({name: e.target.value})}/>
                        <TextField
                            type="number"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Product Price"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            value={this.state.price}
                            onChange={e => this.setState({price: e.target.value})}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="desc"
                            label="Product Description"
                            name="desc"
                            autoComplete="desc"
                            autoFocus
                            value={this.state.desc}
                            onChange={e => this.setState({desc: e.target.value})}/>

                        <FormControlLabel
                            value={this.state.return}
                            onChange={e => this.setState({return: !this.state.return})}
                            control={< Switch color = "primary" />}
                            label="Return available"
                            labelPlacement="start"/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Launch
                        </Button>
                        {this.state.responseToPost}
                    </form>
                </div>
            </Container>
        );
    }
}

export default Additems