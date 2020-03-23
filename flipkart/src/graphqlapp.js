import {useQuery} from '@apollo/react-hooks';
import React,{useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200
        }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));



export default function App() {
  
    const classes = useStyles();
    const [updatename, setupdatename] = useState("")
    const [updateaddress, setupdateaddress] = useState("")
    const [email,setemail] = useState("")
    const [updateemail, setupdatemail] = useState(email)
    const [emailid, setemailid] = useState("")

    const [getemail, setgetemail] = useState("")
    const [name, setname] = useState("")
    const [address, setaddress] = useState("")
    const [showusers, setshowusers] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [filter, setfilter] = useState("ASC")
    const [filterby, setfilterby] = useState("email")
const [updateopen, setupdateopen] = useState(false)

const [filteropen, setfilterOpen] = React.useState(false);
const [filterbyopen, setfilterbyOpen] = React.useState(false);


const handlefilterChange = event => {
  setfilter(event.target.value);
};
const handlefilterbyChange = event => {
  setfilterby(event.target.value);
};


const handlefilterClose = () => {
  setfilterOpen(false);
};
const handlefilterbyClose = () => {
  setfilterbyOpen(false);
};

const handlefilterOpen = () => {
  setfilterOpen(true);
};
const handlefilterbyOpen = () => {
  setfilterbyOpen(true);
};
    const updatemodelopen = () => {
      setupdateopen(true);
    };

    const handleOpen = () => {
      setOpen(true);
    };
    const updatemodelclose = () => {
      setupdateopen(false);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit=()=>{
      addTodo()

      handleClose()
      window.location.reload(true)

    }
    const updatesubmit=()=>{
      updateTodo()

      updatemodelclose()
      window.location.reload(true)

    }
const deleteuser=(emailid)=>{
  setemail(emailid)
  deleteTodo()
  window.location.reload(true)
}

const viewusers=()=>{
  setshowusers(true)
}

    const updateUser= gql `
      mutation {
        updateUser(email:"${email}", name: "${updatename}", address: "${updateaddress}") {
          name
          email
          address
        } 
      }`;

    const addUser= gql `
      mutation {
        addUser(email:"${email}", name: "${name}", address: "${address}") {
          name
          email
          address
        } 
      }`;
      const deleteUser= gql `
      mutation {
        deleteUser(email:"${email}") {
          email
        } 
      }`;
    const datas = gql `
    {
      user(email:"${getemail}"){
        email
        name
        address
      }
    }`;
    const datass = gql `
    {
      users(filterby:"${filterby}",filter:"${filter}"){
        email
        name
        address
      }
    }`;
 

    var {data, loading, error} = useQuery(datas);
    var {data:users,loading:usersload,error:userserror} = useQuery(datass);

    if(!loading && !error){
      
    }
    const [addTodo, { dataas }] = useMutation(addUser);
    const [updateTodo, { dataaas }] = useMutation(updateUser);
    const [deleteTodo,{deletee}] = useMutation(deleteUser);



    console.log(error)
    console.log(users)
    console.log("hi")

    if (loading) 
        return <p>Loading...</p>; 
    if (error) 
        return ( <form className={classes.root} noValidate autoComplete="off">

        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setemail(e.target.value)}/>
        <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e)=>setgetemail(email)}>
                    Get Details
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleOpen}>
                    Add User
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={viewusers}>
                    View Users
                </Button>
                <div>
  
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={filteropen}
          onClose={handlefilterClose}
          onOpen={handlefilterOpen}
          value={filter}
          onChange={handlefilterChange}
        >
          
          <MenuItem value={"ASC"}>Ascending</MenuItem>
          <MenuItem value={"DESC"}>Descending</MenuItem>
        </Select>

        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={filterbyopen}
          onClose={handlefilterbyClose}
          onOpen={handlefilterbyOpen}
          value={filterby}
          onChange={handlefilterbyChange}
        >
          
          <MenuItem value={"email"}>Email</MenuItem>
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"address"}>Address</MenuItem>

        </Select>
      </FormControl>
    </div>
  {
                          showusers&&users?
                          users.users.map((user,index)=>{
                            return(
                          <div>
                            <div>{index+1}. {user.email}</div>
                            <div>{user.name}</div>
                            <div>{user.address}</div>
                            <div>
                            <Button
                            type="button"
                            style={{width:'fit-content'}}
                            variant="contained"
                            color="primary"
                            onClick={()=>{updatemodelopen();setemail(user.email)}}
                            className={classes.submit}>
                            Update
                        </Button>
                        <Button
                            type="button"
                            style={{width:'fit-content',marginLeft:'20px'}}
                            variant="contained"
                            color="primary"
                            onClick={()=>{deleteuser(user.email)}}
                            className={classes.submit}>
                            Delete
                        </Button></div>
                          </div>)
                          })
                          :""
                        }

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={updateopen}
        onClose={updatemodelclose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} >
          <div className={classes.paper}         style={{visibility:'inherit',opacity:1}}>
          <div><TextField id="outlined-basic" label="Email" variant="outlined" value={email}/></div>
          <div><TextField id="outlined-basic" label="Name" variant="outlined" value={updatename} onChange={(e)=>setupdatename(e.target.value)}/></div>
          <div><TextField id="outlined-basic" label="Address" variant="outlined" value={updateaddress} onChange={(e)=>setupdateaddress(e.target.value)}/></div>
          <Button
                    type="button"
                    
                    variant="contained"
                    color="secondary"
                    onClick={updatesubmit}>
                    Update
                </Button>
          </div>
        </Fade>
      </Modal>
                <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div><TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setemail(e.target.value)}/></div>
          <div><TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setname(e.target.value)}/></div>
          <div><TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e)=>setaddress(e.target.value)}/></div>
          <Button
                    type="button"
                    
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Add
                </Button>
          </div>
        </Fade>
      </Modal>
    </form>)
    return (
        <React.Fragment>
            <form className={classes.root} noValidate autoComplete="off">

                <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(e)=>setgetemail(email)}
                            className={classes.submit}>
                            Get Details
                        </Button>
            </form>


            <div className="container">
                <p>Email : {data.user.email}</p>
                <p>Name : {data.user.name}</p>
                <p>Address : {data.user.address}</p>
                <Button
                            type="button"
                            style={{width:'fit-content'}}
                            variant="contained"
                            color="primary"
                            onClick={updatemodelopen}
                            className={classes.submit}>
                            Update
                        </Button>
                        <Button
                            type="button"
                            style={{width:'fit-content'}}
                            variant="contained"
                            color="primary"
                            onClick={deleteuser}
                            className={classes.submit}>
                            Delete
                        </Button>
                        
                        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={updateopen}
        onClose={updatemodelclose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} >
          <div className={classes.paper}         style={{visibility:'inherit',opacity:1}}
>
          <div><TextField id="outlined-basic" label="Email" variant="outlined" value={email}/></div>
          <div><TextField id="outlined-basic" label="Name" variant="outlined" value={updatename} onChange={(e)=>setupdatename(e.target.value)}/></div>
          <div><TextField id="outlined-basic" label="Address" variant="outlined" value={updateaddress} onChange={(e)=>setupdateaddress(e.target.value)}/></div>
          <Button
                    type="button"
                    
                    variant="contained"
                    color="secondary"
                    onClick={updatesubmit}>
                    Update
                </Button>
          </div>
        </Fade>
      </Modal>

            </div>
            
        </React.Fragment>
    );
}