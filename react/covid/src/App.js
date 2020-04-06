


import React from 'react';
import './App.css';
import Map from './map'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Sampledata from './sampledata';
import Activity from './activity';
import Statistics1 from './statistics1';
import Statistics2 from './statistics2';
import Datamap from './datamap'
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapdata: {
        total: {},
        tamilnadu: {},
        activity: []
      }
    }
  }
  componentDidMount = () => {
    console.log("hihihi")
    this.mapdata()
  }

  mapdata = async () => {
    const response = await fetch('http://localhost:9000/mapdata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await response.json();

    this.setState({
      mapdata: body
    })
  }
  render() {
    var total = this.state.mapdata.tamilnadu
    var tamilnadu = this.state.mapdata.tamilnadu
    var activity = this.state.mapdata.activity
    // console.log(this.state.mapdata.total,tamilnadu,activity)
    return (
      <div className="main">
        <div className="map">
          <div className="server"></div>

          <div className="fusionmap">
            <Map mapdata={this.state.mapdata.data} />
          </div>
          <div className="progressbar">
            <CircularProgressbar className="circularprogressbar" value={100} text={"Total"} strokeWidth={12}
              styles={buildStyles({
                pathColor: `#ff0000`,
              })} />
            <CircularProgressbar className="circularprogressbar" value={tamilnadu.recovered * 100 / tamilnadu.confirmed} text={`Recov`} strokeWidth={12}
              styles={buildStyles({
                pathColor: `#32cd32`,
              })} />
            <CircularProgressbar className="circularprogressbar" value={tamilnadu.deaths * 100 / tamilnadu.confirmed} text={`Death`} strokeWidth={12}
              styles={buildStyles({
                pathColor: `#696969`,
              })} />
            <CircularProgressbar className="circularprogressbar" value={tamilnadu.active * 100 / tamilnadu.confirmed} text={`Active`} strokeWidth={12}
              styles={buildStyles({
                pathColor: `#00bfff`,
              })} />
          </div>
          <div className="bottombar">
            <div className="linearprogress">
              Total cases  [{total.confirmed}]
          <LinearProgress variant="determinate" value={100} />
            </div>
            <div className="linearprogress">
              Recovered [{total.recovered}]
          <LinearProgress variant="determinate" value={total.recovered * 100 / total.confirmed} color="secondary" />
            </div><div className="linearprogress">
              Deaths [{total.deaths}]
          <LinearProgress variant="determinate" value={total.deaths * 100 / total.confirmed} />
            </div><div className="linearprogress">
              Active [{total.active}]
          <LinearProgress variant="determinate" value={total.active * 100 / total.confirmed} color="secondary" />
            </div>

          </div>
        </div>

        <div className="data">
          <div>
            <Datamap total={this.state.mapdata.total} tamilnadu={this.state.mapdata.tamilnadu} />
          </div>
          <div className="statistics">
            <div><Statistics1 total={this.state.mapdata.total} /></div>
            <div><Statistics2 tamilnadu={tamilnadu} /></div>
          </div>
          <h5>[Statistics]</h5>

          <div>

            <Activity activity={activity} />

          </div>
        </div>
        {/* <div className={classes.root} >
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            COVID-19  Tamilnadu Districts-wise Info

          </Typography>
        </Toolbar>
      </AppBar>
      <Map /> 
      <Map />
      <Sampledata />
    </div> */}
      </div>
    );
  }
}