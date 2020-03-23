import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import {withStyles} from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    paper: {
        marginRight: theme.spacing(2)
    }
}));
const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);

function Navmenu(props) {
    const classes = useStyles();
    const [open,
        setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [reqstatus,
        setreqstatus] = React.useState("")

    const [isadmin,
        setisadmin] = React.useState(props.isAdmin)

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleLogout = async() => {
        const response1 = await fetch('http://localhost:9000/updateorderstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("current"),
                remindset: true,
                accesstoken: localStorage.getItem("accessToken")
            })
        })
        const response = await fetch('http://localhost:9000/logouttoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("accessToken")
            })
        });
        var body = await response.text();

        console.log(body)
        localStorage.setItem("current", "null")
        window
            .location
            .reload(true)
        handleClose()
    }

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    console.log(props.reqstatus)
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        setreqstatus(props.reqstatus)
        if (prevOpen.current === true && open === false) {
            anchorRef
                .current
                .focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>

            <div>

                <IconButton
                    onClick={handleToggle}
                    ref={anchorRef}
                    aria-controls={open
                    ? 'menu-list-grow'
                    : undefined}
                    aria-haspopup="true"
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                            transformOrigin: placement === 'bottom'
                                ? 'center top'
                                : 'center bottom'
                        }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>{localStorage.getItem("current")} {props.company.seller}</MenuItem>
                                        {!props.isAdmin
                                            ? <MenuItem onClick={props.handleReqstatus}>{props.reqstatus==="Request"?"Become a seller":props.reqstatus==="Requested"?"Requested for seller":"Seller Blocked"}</MenuItem>
                                            : ""}

                                        {props.isAdmin
                                            ? <MenuItem
                                                    onClick={() => {
                                                    props
                                                        .history
                                                        .push('/solditems')
                                                }}>Sold Items</MenuItem>
                                            : ""}

                                        {props.isAdmin
                                            ? <MenuItem
                                                    onClick={() => {
                                                    props
                                                        .history
                                                        .push('/returnitems')
                                                }}>Return Items</MenuItem>
                                            : ""}

                                        <MenuItem
                                            onClick={() => {
                                            props
                                                .history
                                                .push('/myorders')
                                        }}>My orders</MenuItem>

                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

export default withRouter(Navmenu)