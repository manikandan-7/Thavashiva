import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

class Popup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            discount: ""
        }
        this.handlePricedrop = this
            .handlePricedrop
            .bind(this)
    }
    handlePricedrop = async() => {
        this
            .props
            .handlePricedrop()
    }
    handleChange = (e) => {
        this.setState({discount: e.target.value})
    }
    handleConfirm = () => {
        this
            .props
            .closePopup(this.state.discount)
    }
    render() {
        return (
            <div className='popup'>
                <div className='popupinner'>
                    <div style={{
                        marginLeft: '20px'
                    }}>
                        <h1>{this.props.product.name}</h1>
                        <input
                            type="number"
                            value={this.state.discount}
                            onChange={(e) => this.handleChange(e)}/>
                        <div>
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={{
                                marginTop: '10px'
                            }}
                                onClick={() => {
                                this.handleConfirm()
                            }}>Confirm</Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={{
                                marginLeft: '10px',
                                marginTop:'10px'
                            }}
                                onClick={() => {
                                this.props.closePopup()
                            }}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;