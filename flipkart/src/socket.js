import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      open:true,
      transition:undefined
    };
  }

  TransitionUp=(props)=> {
    return <Slide {...props} direction="up" />;
  }


   handleClick = Transition => () => {
    this.setState({
        transition:Transition,
        open:true
    })
  };

   handleClose = () => {
this.setState({
    open:false
})  
};

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const  response  = this.state.response;
    var transition=this.state.transition

    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <div>
              <Button onClick={this.handleClick(this.TransitionUp())}>Up</Button>
      
              <Snackbar
                open={this.state.open}
                onClose={this.handleClose()}
                TransitionComponent={transition}
                message="I love snacks"
              />
            </div>
              : ""}
        </div>
    );
  }
}

export default App;