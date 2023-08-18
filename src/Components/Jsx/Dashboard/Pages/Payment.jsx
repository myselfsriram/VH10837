import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCreditCard, faUserCircle, faLock, faCalendarMinus} from "@fortawesome/free-solid-svg-icons";
import "../../../Css/Payment.css"


class Payment extends Component {
    
    constructor(){
        super()
        this.state={
            
            cardNumber : "",
            name : "",
            cvv : "",
            expiry : "",
            data:"",
            price:" "

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [ event.target.name ] : event.target.value
          })
      }

      async handleSubmit(event){
        event.preventDefault();
           
        let path = '/Dashboard/Receipt';
        this.props.history.push({pathname : path , state : this.state.data})
     }
    
    
    
    
    render() {

        

        this.state.data = this.props.history.location.state;
        console.log(this.state.data)
        this.state.price="₹ " + this.state.data.price
         

        return (
            <div  id="payment-main" className="payment">
                
                <div className="payment-form">
                    <h3>Enter Credit/Debit Card Details</h3>
                    
                    <form autoComplete="off">
                        
                        <div className="payment-textbox">
                            <FontAwesomeIcon icon = {faUserCircle} />
                            <input classname = "p-name" name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Cardholder Name" required/>
                        </div>

                        <div className="payment-textbox">
                            <FontAwesomeIcon icon = {faCreditCard} />
                            <input classname = "cardNumber" name="cardNumber" type="text" value={this.state.cardNumber} onChange={this.handleChange} placeholder="Card Number" required/>
                        </div>

                        <div className="payment-textbox">
                            <FontAwesomeIcon icon = {faLock} />
                            <input classname = "cvv" name="cvv" type="password" value={this.state.cvv} onChange={this.handleChange} placeholder="CVV/CCV"  required/>
                        </div>

                        <div className="payment-textbox">
                            <FontAwesomeIcon icon = {faCalendarMinus} />
                            <input classname ="expiry" name="expiry" placeholder="Date of Expiry" type="text" value={this.state.expiry} onChange={this.handleChange}  required/>
                            
                        </div>
                        <input className="payment-submit" type="submit" onClick={this.handleSubmit} value={this.state.price} /><br/>
                    </form>


                </div>
            
                
            </div>
        )
    }
}

export default Payment