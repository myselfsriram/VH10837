import React, { Component } from 'react'
import randomstring from 'randomstring'
import moment from 'moment'
import "../../../Css/Receipt.css"



class Receipt extends Component{

    constructor(){
        super()
        this.state={

            txnId : "",
            dateTime : moment().format('MMMM Do YYYY, h:mm:ss a'),
            amt : 0,
            data:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ticketView = this.ticketView.bind(this);
    }

    /*handleChange(event){
        this.setState({
            [ event.target.name ] : event.target.value
          })
      }*/

    async ticketView(event){
       event.preventDefault();


        var form={
            transaction_id: this.state.txnId,
            token: localStorage.getItem("token")
        }
      fetch("http://127.0.0.1:8000/booking/get_transaction_tickets/",{
        method: 'POST',
        headers : {'Content-type': 'application/json'},
        body: JSON.stringify(form)
    })  
    .then(response => 
        response.json()
        
      )
    .then( data =>{
        console.log(data)
        this.props.history.push({pathname : '/Dashboard/Ticket' , state : data})
        
    })
     
    
    }

    async handleSubmit(event){
        event.preventDefault();
           
         this.props.history.push('/Dashboard'); 
     }

    handleChange(event){
        this.setState({
            [ event.target.name ] : event.target.value
          })
    }

    render() {
        
        
        this.state.data = this.props.history.location.state;
        this.state.txnId= this.state.data.transaction_id;
        this.state.amt= this.state.data.price
        console.log(this.state.data)

        return (

            <div className="receipt">
                    <div className="receipt-box">
                        <h2>Your Transaction is Successful !</h2>
                        <form autoComplete="off">

                        <div className="receipt-label">
                            <label>Transaction ID : {this.state.txnId}</label>
                        </div>

                        <div className="receipt-label">
                            <label>Date : {this.state.dateTime} </label>
                        </div>
                        
                        <div className="receipt-label">
                            <label>Amount :  ₹ {this.state.amt}</label>
                        </div>

                        <input className="receipt-home" type="submit" onClick={this.handleSubmit} value="Go to Dashboard"/><br/>
                        <input className="ticket-view" type="submit" onClick={this.ticketView} value="View Booked Tickets"/><br/>
                        </form>
                        


                    </div>
                </div>
            
        )
    }
}

export default Receipt;