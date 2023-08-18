import React, { Component } from 'react'
import {  Modal , Button } from 'react-bootstrap'


class BookingHistory extends Component{

    constructor(){
        super()

        this.state ={
            trans :[],
            details:[{}],
            len : 0,
            show:false,
            errors:""
        }

        this.handleCancle=this.handleCancle.bind(this)
        this.onHide=this.onHide.bind(this)
        

    }

    handleCancle(index){
        var form={
            transaction_id: this.state.trans[index][0].data.transaction_id,
            token: localStorage.getItem("token"),
        }

        console.log(form)

        fetch("http://127.0.0.1:8000/booking/cancel_ticket_by_transaction/",{
        method: 'POST',
        headers : {'Content-type': 'application/json'},
        body: JSON.stringify(form)
        })  
        
        .then( data =>{ 
         
                this.setState({
                    show:true
                })
            

        })
        .catch( error => console.error(error))

 }
    componentDidMount(){
        var token= {
            "token" : localStorage.getItem("token")
        }
        

        fetch("http://127.0.0.1:8000/user/user_bookings_history/",{
            method: 'POST',
            headers : {'Content-type': 'application/json'},
            body: JSON.stringify(token)
        })  
        .then( data =>{ 
            if (data.status !="200")
            {
                this.setState({
                    errors: "No previous bookings!"
                })
            }


            else if(data.status=="200") {
                data.json().then( body =>{
                    this.setState({
                        details: body,
                        errors:""
                    })
                })

            }
        
        })

    }


    onHide(){
        this.setState({
            show:false
        })

        window.location.reload();


    }



    
    render(){

        // console.log("debugg:"+ this.state.details.bookings)
        var obj = this.state.details.bookings
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {           
                // console.log(key, obj[key]);
                var val = obj[key];
                
                var temp = []

                for (var k in val){
                    if(val.hasOwnProperty(k)){
                        temp.push(val[k])
                    }
                }

                this.state.trans.push(temp)

                // val.map((item,index) =>(
                //     console.log(item)

                // ))
            }
        }
        //console.log(this.state.trans)

       

        return(

                    <div id="booking-history" className="booking-history" style={{paddingTop:"80px", margin: "0 60px"}}>

                        <p style={{marginBottom:"0px", fontSize:"40px"}}>Booking History</p>

                        { this.state.errors.length > 0 &&  
                             <p style={{marginTop:"20px", marginLeft:"4px",color:"red"}}>{this.state.errors}</p>}


                        
                        {
                            
                             this.state.trans.map((item,index) => (

                            <div key={index} className="history-table">
                            <p style={{marginBottom:"0px", marginLeft:"-40px", fontSize:"20px"}}> {index + 1}. </p>    
                            <div className="ticket" style={{paddingTop:"0px"}}>
                            <table className="table table-bordered table-xs-responsive">
                            <tbody>
                                <tr>
                                    {/* {console.log(item)}
                                    {console.log(index)} */}
                                      
                                    <td>Transcation ID : {item[0].data.transaction_id}</td>
                                    <td>Train Name : {item[0].data.train.train_name}</td>
                                </tr>
                                {/* <tr>
                                    <td>Train Number : {} </td>   
                                    <td>Train Name : {item[0].data.train.train_name}</td>
                                </tr> */}
                                <tr>
                                    <td>From : {item[0].data.boarding} </td>
                                    <td>To : {item[0].data.destination}</td>
                                </tr>
                                <tr>
                                    <td>Arrival : {item[0].data.train.arrival_time.replace("T"," ").replace("Z"," ")}</td>

                                    <td>Departure : {item[0].data.train.departure_time.replace("T"," ").replace("Z"," ")} </td>   
                                </tr>
                            </tbody>
                                
                            </table>

                            </div>

                            <table className="table table-bordered table-xs-responsive">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Ticket ID</th>
                                                <th>Name</th>
                                                <th>Age</th>
                                                <th>Sex</th>
                                                <th>Seat No</th>
                                                <th>Berth</th>
                                            </tr>
                                        </thead>



                                        <tbody>

                                            
                                            {    item.map((a,i) => (
                                               
                                                 
                                                <tr key={i}>

                                                    

                                                    
                                                    <td>{a.data.ticket_number}</td>
                                                    <td>{a.data.passenger.name}</td>
                                                    <td>{a.data.passenger.age}</td>
                                                    <td>{a.data.passenger.gender}</td>
                                                    <td>{a.data.seat_no}</td>
                                                    <td>{a.data.passenger.berth}</td>
                                                </tr>

                                                    
                                            ))    
                                            }
                                        </tbody>
                            </table>

                        <div style={{textAlign:"center"}}>  

                            <button className = " cancel-button" onClick={() => { this.handleCancle(index)}} >Cancel Booking</button>

                        <hr  style={{
                            margin: "30px -30px",
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .4,
                            opacity: 0.3,
                            borderColor : '#000000'
                        }}/>

                        </div>



                        </div>


                        
                        


                        )) }



                <Modal style={{height:"400px"}}
                  show={this.state.show}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"                  
                  centered
                >
                  
                    <Modal.Body style={{margin: '10px'}}>
                        <p style={{textAlign:"center"}}>{localStorage.getItem("full_name") }, your booking has been sucessfully cancelled! </p>
                        
                    </Modal.Body>
                    <Modal.Footer>
    
                        
                            <Button  variant="primary" onClick={this.onHide}>Ok</Button>

                    </Modal.Footer>

                </Modal>
                        

                    </div>



             
        )
    }
}

export default BookingHistory