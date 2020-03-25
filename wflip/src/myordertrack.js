import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  return ['Order received', 'Packing', 'Shipping', 'Delivered'];
}

export default function Myordertrack(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(props.steps);
  const steps = getSteps();
console.log(props)
useEffect(()=>{
    setActiveStep(props.steps)
},[props.steps])
  return (
    <div className={classes.root} style={{float:'left',width:'600px',marginTop:'100px',marginLeft:'50px'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
    </div>
  );
}