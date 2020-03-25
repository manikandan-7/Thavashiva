import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';



const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function Botbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{position:'fixed',bottom:0,left:'580px',width:'fit-content'}}
    >
        <Link to="/buynow">
 <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Buy now
                        </Button> </Link>   </BottomNavigation>
  );
}