import React from 'react';
import {useEffect} from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Ratingvalue from './ratingvalue'
import { act } from 'react-dom/test-utils';




const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function Ratingcarousal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const maxSteps = props.products.length;

  const [activeStep, setActiveStep] = React.useState(0);
  const [product,
    setproduct] = React.useState([])
    const [submit,setsubmit]=React.useState(true)
    const [change,setchange]=React.useState(props.change)

  const handleNext = async() => {
   await  setActiveStep(prevActiveStep => prevActiveStep + 1);
   viewproduct()

    setchange(!change)

  };

  const handleBack = () => {      setchange(!change)

    setActiveStep(prevActiveStep => prevActiveStep - 1);

    viewproduct()
  

    setchange(!change)

  };
  const viewproduct = async() => {
    console.log(props.products[activeStep].productid)

    const response = await fetch('http://localhost:9000/viewproduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productid: props.products[activeStep].productid})
    });
    var body = await response.json()
    console.log(body)
    setproduct(body)

}
console.log(activeStep)
const handleLater = () => {
    props.handleLater()
}

const handleSubmit = (value,text) => {
    if(activeStep<maxSteps-1)
    handleNext()
    else props.handleClose()
    setchange(!change)
setsubmit(false)
console.log(maxSteps,activeStep)
    props.handleSubmit(value, text,product.productid)
   
}

useEffect(()=>{
    viewproduct()
},[change])
  return (
    <div className={classes.root}>
        <div>
<Paper square elevation={0} className={classes.header}>
        <Typography>{props.products[activeStep].name}</Typography>
      </Paper>
      <h2 id="transition-modal-title">Rating</h2>
                        <p>Tell us about your recently purchased {product.name}</p>
                        <img src={product.image} style={{width: '200px',height: '200px'}}></img>
                       
                                <Ratingvalue
                                submit={submit}
                            handleSubmit={handleSubmit}
                            handleLater={handleLater}/>
                            </div>
        
   
      

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}