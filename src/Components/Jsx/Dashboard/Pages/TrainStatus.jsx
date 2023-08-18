import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import "../../../Css/TrainStatus.css"

class TrainStatus extends Component {
    
    constructor(){
        super()
        this.state={
            
            trainNo : "",
            trainName : "",
            arrival : "",
            departure : "",
            total_seats:"",
            remaining_seats:"",
            show : false,
            errors:" "

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.state = {
          show: false
        };
      }

    showTable = (event) => {

        var id = this.state.trainNo

       event.preventDefault();
       fetch(`http://127.0.0.1:8000/booking/gettrain/${id}`) 
           .then( data =>{ 
                console.log(data.status)
                if (data.status != "200")
                {
                    this.setState({
                        errors: "Train does not exist. Please try again."
                    })
                }

                else{

                        this.setState({
                            errors: ""
                        })

                        data.json().then(body => {
                            this.setState({
                                trainName: body.train_name,
                                arrival: body.arrival_time,
                                departure: body.departure_time,
                                total_seats: body.total_seats,
                                remaining_seats: body.remaining_seats,
                                
                            })
                        })
                        
                        
                        this.setState({
                            show: true
                        });
                    

                    }

            })
            .catch( error => console.error(error))

    }

    

    

    handleChange(event){
        this.setState({
            [ event.target.name ] : event.target.value,
            show:false
          })


      }

      async handleSubmit(event){
        event.preventDefault();
           
        this.props.history.push('/Dashboard/Receipt');  
     }
    
    
    
    
    render() {
        return (

            <div className="trainstatus">

                <div className="trainstat">

                    <h3 style={{marginTop:"10px",marginBottom:"10px"}}>Train Status</h3>

                    <div  className = "status-textbox">

                    <FontAwesomeIcon icon = {faTrain} />
                    <input className= "TrNo" name="trainNo" type="text" value={this.state.trainNo} onChange={this.handleChange} placeholder="Enter Train Number" required>

                    </input>

                    

                    </div>

                    <button className = "status-button" onClick={this.showTable}>Check Status</button>
                        

                    <div className = "status-table">

                    { this.state.errors.length > 0 &&  
                             <p className='error'>{this.state.errors}</p>}   
                         
                    {
                        this.state.show &&
                        <table className="table  table-bordered ">
                            <thead className="thead-dark" >
                                 <tr>
                                    <th>Train No</th>
                                    <th>Train Name</th>
                                    <th>Arrival Time</th>
                                    <th>Destination Time</th>
                                    <th>Total Seats</th>
                                    <th> Remaining Seats</th>
                                </tr>
                            </thead>
                             <tbody>
                                <tr>
                                    <td>{this.state.trainNo}</td>
                                    <td>{this.state.trainName}</td>
                                    <td>{this.state.arrival.replace("T"," ").replace("Z"," ")}</td>
                                    <td>{this.state.departure.replace("T"," ").replace("Z"," ")}</td>
                                    <td>{this.state.total_seats}</td>
                                    <td>{this.state.remaining_seats}</td>

                                </tr>

                            </tbody>
                         </table>
                    }

                    </div>

                </div>

            </div>


            
        )
    }
}

export default TrainStatus