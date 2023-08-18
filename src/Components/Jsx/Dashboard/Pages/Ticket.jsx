import React, { Component } from 'react'
import "../../../Css/Ticket.css"

export class Ticket extends Component {
    constructor(){
        super();
        this.state={
            txnId: [],
            txns : []
        };

    this.handleSubmit=this.handleSubmit.bind(this)
    }


    handleSubmit(){
        this.props.history.push('/Dashboard')
    }


    render() {

        this.state.txnId = this.props.history.location.state;
        var obj = this.state.txnId.transaction_tickets
        console.log(obj)
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var val = obj[key];
              this.state.txns.push(val)
            }
          }

        console.log(this.state.txns)

        return (
            <div id="content">

                <div id="ticket-details">
                <table className="table table-bordered table-xs-responsive table-hover">
                        <thead className="thead-dark">  
                        <tr>
                            <th>Ticket Number</th>
                            <th>Train Name</th>
                            <th>From</th>
                            <th>Departure Time</th>
                            <th>To</th>
                            <th>Arrival Time</th>
                            <th>Passenger Name</th>
                            <th>Age</th>
                            <th>Sex </th>
                            <th>Seat</th>
                            <th>Berth</th>



                        </tr>
                        </thead>
                        <tbody>
                        
                        {
                             this.state.txns.map((item,index) => (
                                <tr key={index}   >
                                    <td>{item.ticket_number}</td>
                                    <td>{item.train.train_name}</td>
                                    <td>{item.boarding}</td>
                                    <td>{item.train.arrival_time.replace("T"," ").replace("Z"," ")}</td>
                                    <td>{item.destination}</td>
                                    <td>{item.train.departure_time.replace("T"," ").replace("Z"," ")}</td>
                                    <td>{item.passenger.name}</td>
                                    <td>{item.passenger.age}</td> 
                                    <td>{item.passenger.gender}</td> 
                                    <td>{item.seat_no}</td>
                                    <td>{item.passenger.berth}</td>


                                </tr>
                            ))
                        }
                            
                        </tbody>
                    </table>
                </div>

                <input className="ticket-home" type="submit" onClick={this.handleSubmit} value="Go to Dashboard"/><br/>

                
                </div>
                
            
        )
    }
}

export default Ticket
