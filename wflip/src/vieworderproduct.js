import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class Vieworderproduct extends React.Component { 
    constructor(props) {
        super(props)
    
        this.state = {
             returnstatus:"Return Item",
             returnstatusbutton:false,
             products:[]
        }
    }
     useStyles = makeStyles({
        card: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
      handleTrackorder=()=>{
                this.props.handletrack()
      }
      handleReturn=async(item)=>{
        const response = await fetch('http://localhost:9000/updateorderstatus', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            return:"true",
              productid:this.props.product.productid,
              accesstoken: localStorage.getItem("accessToken")
          })
      });
      const body = await response.json();
      console.log(this.props.product.productid)
      this.setState({products: body})
      this.props.handleShow(this.props.product)
      }
        

    render(){

        var item=this.props.product

  const classes = this.useStyles;
  let returnstatus=this.state.returnstatus
  let returnstatusbutton=this.state.returnstatusbutton
  let products=this.state.products
  let order=this.props.order
  console.log(item)
  return (
      item.length!==0?
    <Card className={classes.card} style={{float:'left',marginLeft:'100px',marginTop:'50px'}}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2" color="textSecondary" gutterBottom>
          {item.name}
        </Typography>
        <img src={item.image} style={{width:'300px',height:'250px'}}/>
        <Typography variant="h5" component="h2">
          {item.desc}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {item.price}
        </Typography>
        <Typography variant="body2" component="p">
          <br />
          {(item.createdAt&&("Ordered on - "+ item.createdAt.slice(0,10)))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={this.handleTrackorder}>Track Order</Button>
 {order.return==="false" && <Button style={{marginLeft:'20px'}} disabled={false} size="small" onClick={(item)=>{this.handleReturn(item)}}>Return Product</Button>}
 {order.return==="true"&&  <Button style={{marginLeft:'20px'}} disabled={true} size="small" onClick={(item)=>{this.handleReturn(item)}}>Return requested</Button>}
 {order.return==="yes"&&  <Button style={{marginLeft:'20px'}} disabled={true} size="small" onClick={(item)=>{this.handleReturn(item)}}>Return accepted</Button>}
 {order.return==="no"&&  <Button style={{marginLeft:'20px'}} disabled={true} size="small" onClick={(item)=>{this.handleReturn(item)}}>Return unavailable</Button>}

      </CardActions>
    </Card>
 :"" );
}
}


export default Vieworderproduct