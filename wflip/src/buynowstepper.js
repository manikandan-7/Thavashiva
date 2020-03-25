import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from './navbar'
import Buynow from './buynow'
import Payment from './payment'
import Userdetails  from './userdetails'
import Map1 from './map'
import { Redirect } from 'react-router';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Check product details', 'Check user details', 'Payment details'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Check product details';
    case 1:
      return 'Check user details';
    case 2:
      return 'Payment details';
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
const [reset, setreset] = React.useState(false)  
const [total, settotal] = React.useState(0) 
const steps = getSteps();

  const handleNext = () => {
    console.log(total)
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if(total!==undefined)

    settotal(total)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    setreset(true)
  };

  const handleReset = () => {
    setActiveStep(0);
  };
var amount
  function form(props,total){
    console.log(total)
amount=total
    if(props==="valid")
      handleNext()
    else if(props==="exit")
      handleBack()
    else if(props==="back")
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    if(total!==undefined)
    settotal(total)

  }
  var button
  if(activeStep!==0){
    button="none"
  }
 

  return (
    <div style={{marginTop:'25px'}}>        <Navbar auth={localStorage.getItem("current")} />
    <div className={classes.root} style={{marginTop:'30px',position:'absolute'}}>
      <Stepper alternativeLabel activeStep={activeStep} style={{marginTop:'25px'}}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
{ reset?<Redirect to="/mycart" />:""}
      <div >
        
        {activeStep === steps.length ? (
          <div  >
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div style={{marginLeft:'400px'}}>
            {activeStep===0?<Buynow callchild={form}/>:activeStep===1?<Userdetails callchild={form}/>:activeStep===2?<Payment callchild={form} total={total}/>:""}
            <div>
              
            </div>
          </div>
             

        )
        }
      </div>
    </div>
    </div>
  );
}