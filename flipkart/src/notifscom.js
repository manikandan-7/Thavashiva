import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Navbar from './navbar'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Notifscalendar from './notifscalendar';
import BlockIcon from '@material-ui/icons/Block';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium
    };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
const names = ['Pending Approval', 'Existing Sellers', 'Blocked Sellers', 'Rejected Sellers'];

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    noLabel: {
        marginTop: theme.spacing(3)
    }
}));

class Notifscom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            requests: [],
            sellers: [],
            blockedsellers: [],
            rejected: [],
            status: "approved",
            person: []
        }
        this.handleDelete = this
            .handleDelete
            .bind(this)
        this.handleAccept = this
            .handleAccept
            .bind(this)
    }
    componentDidMount() {
        this.callAPI()
    }
    getsellers = async() => {
        const response2 = await fetch('http://localhost:9000/rejectedsellers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const body2 = await response2.json();

        console.log((body2))
if(body2===0) body2=[]
        this.setState({rejected: body2})

        const response1 = await fetch('http://localhost:9000/blockedsellers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const body1 = await response1.json();
        console.log((body1))

        this.setState({blockedsellers: body1})

        const response = await fetch('http://localhost:9000/getadmins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const body = await response.json();
        console.log((body))

        this.setState({sellers: body})
    }
    async callAPI() {
        const response = await fetch('http://localhost:9000/notifs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        });
        const body = await response.json();
        console.log((body))

        this.setState({requests: body},()=>{
            this.getsellers()

        })
    }
    async handleDelete(request) {
        const response = await fetch('http://localhost:9000/notifsdel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: request.email})
        });
        const body = await response.json();

        console.log((body))

        this.callAPI()
    }
    async handleAccept(request) {
        console.log("EMail:" + request.email)
        const response = await fetch('http://localhost:9000/makeadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: request.email})
        });
        const body = await response.json();
        console.log((body))
        this.callAPI()
    }
    async handleBlock(request) {
        const response = await fetch('http://localhost:9000/removeseller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: request.email})
        });

        this.callAPI()
    }
    handleChange = async(event) => {
        this.setState({
            status: event.target.value
        }, async() => {
            console.log(this.state.status)
        })

    };

    handleChange1 = event => {
        this.setState({person: event.target.value})
    };

    handleChangeMultiple = event => {
        const {options} = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({person: value})
    };

    render() {
        const classes = useStyles
        var rejected = this.state.rejected
        var requests = this.state.requests
        var sellers = this.state.sellers
        let status = this.state.status
        let person = this.state.person
        let blockedsellers = this.state.blockedsellers
        return (
            <div className={classes.root}>
                <Navbar place={"notifs"}/>
                <Grid
                    container
                    spacing={2}
                    style={{
                    marginTop: '28px'
                }}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                        marginTop: '60px'
                    }}>

                        <FormControl
                            className={classes.formControl}
                            style={{
                            marginLeft: '500px'
                        }}>
                            <ListItemText primary={"Filter Sellers"}/>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={this.state.person}
                                onChange={this.handleChange1}
                                input={< Input id = "select-multiple-chip" />}
                                renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (<Chip key={value} label={value} className={classes.chip}/>))}
                                </div>
                            )}
                                MenuProps={MenuProps}>
                                {names.map(name => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Typography variant="h6" className={classes.title}>
                            Manage Sellers
                        </Typography>

                        {((person.length === 0 || person.includes("Pending Approval")) && requests.length !== 0) && <div className={classes.demo}>
                            <List >

                                {requests.map((request, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={request.email}/>
                                            <ListItemText
                                                style={{
                                                color: 'orange'
                                            }}
                                                primary={"Status:Pending Approval"}/>

                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon
                                                        style={{
                                                        color: 'red'
                                                    }}
                                                        onClick={() => this.handleDelete(request)}/>
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete">
                                                    <AddCircleIcon
                                                        style={{
                                                        color: 'blue'
                                                    }}
                                                        onClick={() => this.handleAccept(request)}/>
                                                </IconButton>
                                            </ListItemSecondaryAction>

                                        </ListItem>
                                    )
                                })}

                            </List>
                        </div>
}

                        {((person.length === 0 || person.includes("Existing Sellers")) && sellers.length !== 0) && <div className={classes.demo}>
                            <List >

                                {sellers.map((request, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={request.email}/>
                                            <ListItemText
                                                style={{
                                                color: 'green'
                                            }}
                                                primary={"Status:Verified"}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">

                                                    <BlockIcon
                                                        style={{
                                                        color: 'red'
                                                    }}
                                                        onClick={() => this.handleBlock(request)}/>
                                                </IconButton>

                                            </ListItemSecondaryAction>

                                        </ListItem>
                                    )
                                })}

                            </List>
                        </div>
}
                        {((person.length === 0 || person.includes("Blocked Sellers")) && blockedsellers.length !== 0) && <div className={classes.demo}>
                            <List >
                                {blockedsellers.map((request, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={request.email}/>
                                            <ListItemText
                                                style={{
                                                color: 'red'
                                            }}
                                                primary={"Status:Blocked"}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <AddCircleIcon
                                                        style={{
                                                        color: 'blue'
                                                    }}
                                                        onClick={() => this.handleAccept(request)}/>
                                                </IconButton>

                                            </ListItemSecondaryAction>

                                        </ListItem>
                                    )
                                })}

                            </List>
                        </div>
}

                        {((person.length === 0 || person.includes("Rejected Sellers")) && rejected.length !== 0) && <div className={classes.demo}>
                            <List >
                                {rejected.map((request, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={request.email}/>
                                            <ListItemText
                                                style={{
                                                color: 'blue'
                                            }}
                                                primary={"Status:Request Rejected"}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <AddCircleIcon
                                                        style={{
                                                        color: 'blue'
                                                    }}
                                                        onClick={() => this.handleAccept(request)}/>
                                                </IconButton>

                                            </ListItemSecondaryAction>

                                        </ListItem>
                                    )
                                })}

                            </List>
                        </div>
}

                    </Grid>
                </Grid>

            </div>

        );
    }
}

export default Notifscom