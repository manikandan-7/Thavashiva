import React ,{useEffect}from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
}));

export default function Snackbars(props) {
    
    const classes = useStyles();
    const [open,
        setOpen] = React.useState(false);
    

   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if(props.title!==""){
        setOpen(true)
        }
    }, [props.title])


    return (
        <div className={classes.root}>
              <Link
                        to={{
                        pathname: "/viewproduct/"+parseInt(props.body),
                        productid: parseInt(props.body)
                    }}>
            <Snackbar  open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {props.title}
                </Alert>
            </Snackbar>
            </Link>
        </div>
    );
}