import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

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

export default function Ratingvalue(props) {
    const classes = useStyles();

    const [value,
        setValue] = React.useState(2);
    const [text,
        settext] = React.useState("")

    const handleLater = () => {
        props.handleLater()
    }

    const handleSubmit = () => {
        props.handleSubmit(value, text)
        settext("")
        setValue(2)
    }
    const handleChange = (e) => {
        settext(e.target.value)
    }

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                }}/>
            </Box>
            <TextField
                value={text}
                placeholder="Your valuable feedback ! !"
                onChange={(e) => handleChange(e)}/>
            <Button
                style={{
                width: 'fit-content',
                marginLeft: '10px'
            }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.submit}>
                Submit
            </Button>
            <Button
                style={{
                width: 'fit-content',
                marginLeft: '10px'
            }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLater}
                className={classes.submit}>
                Review later
            </Button>
        </div>
    );
}