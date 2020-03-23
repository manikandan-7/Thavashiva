import React, {Component} from 'react'

class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {
            desc: "",
            buttonname: "Add Favorite",
            buttondisabled: false

        }
        this.handleClick = this
            .handleClick
            .bind(this)
    }
    handleClick(props) {
        this.setState({desc: props})
    }

    handleFav = (e) => {
        let user = (localStorage.getItem("current"))

        var existingEntries = JSON.parse(localStorage.getItem(user + "fav"));
        if (existingEntries == null) 
            existingEntries = [];
        existingEntries.push(this.props.article);
        localStorage.setItem(user + "fav", JSON.stringify(existingEntries));

        this.setState({buttonname: "Added", buttondisabled: true})
    }

    render() {
        let product = this.props.product
        let index = this.props.index
        let classname
        (index % 2 === 0)
            ? classname = "articlecontent"
            : classname = "articlecontent"
        return (
            <div className="maincontainer" id={product.productid}>
                <div className="container" key={index}>
                    <div className="articles">
                        <div className="article">
                            <div className={classname}>
                                <input
                                    type="button"
                                    value={this.state.buttonname}
                                    disabled={this.state.buttondisabled}
                                    onClick={(e) => this.handleFav(e)}/>
                                <div className="contentleft">
                                    {product.image}
                                </div>
                                <div className="articlecenter">
                                    <div className="articletopic">
                                        <p onClick={() => this.handleClick(product.desc)}>{product.desc}</p>
                                    </div>
                                    <div className="author">
                                        {product.name}
                                    </div>
                                    <div className="abstract">
                                        {this.state.desc}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Container