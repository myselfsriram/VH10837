import React, { Component } from 'react'
import '../../../Css/Passenger.css'

class Passenger extends Component {
    constructor(props){
        super(props)
        this.state={
         
        pax : [{
                name:"",
                age: 0,
                gender : "",
                berth : ""
            }] ,
            seats:"",
            error:""

        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.ageChange = this.ageChange.bind(this);
        this.sexChange = this.sexChange.bind(this);
        this.berthChange = this.berthChange.bind(this);
    }

    nameChange(event,index){
        this.state.pax[index].name = event.target.value
        this.setState({
            pax : this.state.pax
        })
        
    }

    berthChange(event,index){
        this.state.pax[index].berth = event.target.value
        this.setState({
            pax : this.state.pax
        })
        
    }

    ageChange(event,index){
        this.state.pax[index].age = event.target.value
        this.setState({
            pax : this.state.pax
        })

    }
       

    sexChange(event,index){
        this.state.pax[index].gender = event.target.value
        this.setState({
            pax : this.state.pax
        })
        
    }

    addPax = e => {
        e.preventDefault()
        if (this.state.pax.length < this.state.seats ) {
            
            this.setState({pax : [...this.state.pax,{}]})
        }
    }

   

    async handleSubmit(event){
        event.preventDefault();

        console.log(this.state.pax)
        console.log(this.state.seats)

        if (this.state.pax.length == this.state.seats ) {

            this.setState({
                error:""
            })

                console.log(this.state.pax)

                var form={
                    boarding: localStorage.getItem("boarding") ,
                    destination: localStorage.getItem("destination") ,
                    token:localStorage.getItem("token"),
                    passenger_list: this.state.pax,
                    train_id: localStorage.getItem("train_id")
            }

            console.log(form)

            fetch("http://127.0.0.1:8000/booking/bookticket/",{
                method: 'POST',
                headers : {'Content-type': 'application/json'},
                body: JSON.stringify(form)
            })  

            .then( data =>{ 
                if (data.status=="201")
                {
                     data.json().then(body => {
                         
                         console.log(body);

                         let path = `/Dashboard/Payment`;
                         this.props.history.push({pathname : path , state : body})
                    })
                }
     
            })
             
            .catch( error => console.error(error))
     
    
        }

        else{
            this.setState({
                error:`Enter ${this.state.seats} passenger details!`
            })
        }
    }
    


    render() {

        this.state.seats = this.props.history.location.state;

        return (
            <div id="content" style={{marginTop:"90px"}} >
                <div id="train-deets">
                    <h4 style={{float:"left",fontWeight:"bold"}}> Passenger Details   </h4> 
                    <h4>(Seats reserved for 15 minutes)</h4>
                    <button  onClick={(e) => this.addPax(e)} className="btn  mb-4 btn-primary pull-right" style={{float:"right",width:"80px"}}>Add</button>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <table className="table table-bordered table-xs-responsive">
                        <thead className="thead-dark">  
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Berth Preference</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                             this.state.pax.map((person,index) => (
                                <tr key={index}>
                                    
                                    <td><input className = "Name" name="name" type="text" value={person.name} onChange={e => {this.nameChange(e,index)}} placeholder="Name" required/></td>
                                    
                                    <td><input className ="Age" name="age" placeholder="Age" type="number" min="0" max="100" value={person.age} onChange={e => {this.ageChange(e,index)}}  required/></td>
                                    
                                    <td>
                                    <select className="Sex" name="sex" onChange={e => {this.sexChange(e,index)}} value={person.gender} required>
                                    <option hidden value=" ">Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Others</option>
                                    </select>
                                    </td>
                                    
                                    <td>
                                    <select className="Berth" name="berth" onChange={e => {this.berthChange(e,index)}} value={person.berth} required>
                                    <option hidden value=" ">Berth</option>
                                    <option value="Lower Berth">Lower Berth</option>
                                    <option value="Middle Berth">Middle Berth</option>
                                    <option value="Upper Berth">Upper Berth</option>
                                    <option value="Side Lower">Side Lower</option>
                                    <option value="Side Upper">Side Upper</option>
                                    </select>
                                    </td>
                                    


                                </tr>
                            ))
                        }
                            
                        </tbody>
                    </table>

                
                    
                     <div className="text-center">

                        <input style={{margin:"0 auto" ,width:"350px"}} className="pax-submit" className="btn mt-4 btn-primary" type="submit"  value="Make Payment"/>
                        { this.state.error.length > 0 &&  
                             <p  style={{marginTop:"20px"}}className='error'>{this.state.error}</p>}
                        
                    </div>

                    </form>
                </div>
                
        )
    }
}

    

export default Passenger

