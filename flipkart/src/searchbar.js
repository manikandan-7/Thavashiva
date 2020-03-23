import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class searchbar extends Component{
    constructor(props){
        super(props);
        this.state={
            key:"",
            products:[]
        }
    }
    handleSubmit =async e=>{
        e.preventDefault();
        localStorage.setItem('searchkeyword',this.state.key);
        e.target.searchcontent.value=null;
    }
    handleChange =e=> {
        this.setState({
            key:e.target.value
        },()=>{
            localStorage.setItem('searchkeyword',this.state.key);

            if(this.state.key.length>=0){
                    fetch('http://localhost:9000/searchproducts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ key:this.state.key }),
                        }).then((response)=>{
                            return response.json()
                        })
                        .then(data=>
                        {
                            this.setState({
                                products:[...data]
                            })
                        })
                        .catch(err=>console.log(err));
            }
        })
    }
  render(){
  return (
      <div className="search">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input
                list="searchkey"
                placeholder="Search"
                name="searchcontent"
                className="searchinput"
                style={{marginLeft:'20px'}}
                onChange={this.handleChange}
            />
            <datalist id="searchkey">
                {this.state.products.map(product=>{
                    return(
                        <option value={product.name} data-value={product.id} key={product.id}/>
                    )
                })}
            </datalist>
        </form>
      </div>
  );
}
}
export default withRouter(searchbar);