import React from 'react';
import {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import Checkout from './checkout'

export default function Payment(props) {
    const [redirect,
        setredirect] = useState(false)
    const handleClick = async() => {
        let user = (localStorage.getItem("current"))

        const response = await fetch('http://localhost:9000/addorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                accesstoken: localStorage.getItem("accessToken")
            })
        });
        const body = await response.text();
        console.log(body)
    }
    const handleSubmit = async(e) => {
        if (e === "exit") {
            props.callchild("exit")
        }
        e.preventDefault()
        if (props.name!=="plus"){
        const response = await fetch('http://localhost:9000/checkpayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        const body = await response.text();
        console.log(body)
        if (body === "valid") {
            handleClick()
            alert("Payment Completed !!")
            setredirect(true)
        }
      }
      else if(props.name==="plus"){
        const response = await fetch('http://localhost:9000/checkpayment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({subscription:props.option})
      })
      const body = await response.text();
      console.log(body)
      if (body === "valid") {
          handleClick()
          alert("Payment Completed !!")
          setredirect(true)
      }
    }
      }
    
  
    return (
        <React.Fragment >
            <form
                onSubmit={(e) => {
                handleSubmit(e)
            }}
                style={{
                marginLeft: '-300px',
                width: 'fit-content'
            }}>
                <Grid container spacing={3}>
                <img src="https://www.b2bpay.com.au/wp-content/themes/b2b-2018/assets/images/creditcards.png" style={{marginBottom:'30px'}} />
                    <Checkout  handleSubmit={handleSubmit} name={localStorage.getItem("current")} amount={props.total} description="Order"/>
                    {props.name === "plus"
                        ? <div>
                                <Button type="submit" variant="contained" color="primary">Pay Rs.{props.option}
                                </Button>
                            </div>
                        : ""}
                    {props.name !== "plus"
                        ? <div>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    style={{marginLeft:'30px'}}
                                    onClick={() => {
                                    handleSubmit("exit")
                                }}>Exit
                                </Button>
                               
                            </div>
                        : ""}

                </Grid>
            </form>
            {redirect
                ? <Redirect to="/"/>
                : ""}
        </React.Fragment>
    );

}