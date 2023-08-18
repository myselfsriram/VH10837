import React, { Component } from 'react'
import '../../../Css/Account.css'

class Account extends Component {
    constructor(){
        super();
        this.state={
            Aname:"",
            age:"",
            email:"",
            phoneNo:"",
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.updateProfile=this.updateProfile.bind(this)

    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
            
        })
            
    }

    componentDidMount(){
        var token= {
            "token" : localStorage.getItem("token")
        }
         console.log(token)

        fetch("http://127.0.0.1:8000/user/get_user_data/",{
            method: 'POST',
            headers : {'Content-type': 'application/json'},
            body: JSON.stringify(token)
        })  
        .then( data =>{ 
            if (data.status =="200")
            {
                
                data.json().then( body =>{
                    this.setState({
                        Aname: body.full_name,
                        age: body.age,
                        email: body.email,
                        phoneNo:body.phoneNo
                    })


                })

            }

        
        })

        

    }

    updateProfile(event){
        event.preventDefault();
        
        var forms={
            token: localStorage.getItem("token"),
            full_name: this.state.Aname,
            email: this.state.email,
            phoneNo:this.state.phoneNo,
            age: this.state.age
        }

        console.log(forms)

        fetch("http://127.0.0.1:8000/user/set_user_data/",{
            method: 'POST',
            headers : {'Content-type': 'application/json'},
            body: JSON.stringify(forms)
        })  
        .then( data =>{ 
            if (data.status =="200")
            {
                
                alert("Details updated!")

            }
        
        })




    }

    delProfile(event){
        event.preventDefault();

        var token= {
            "token" : localStorage.getItem("token")
        }
        

        fetch("http://127.0.0.1:8000/user/delete_user/",{
            method: 'POST',
            headers : {'Content-type': 'application/json'},
            body: JSON.stringify(token)
        })  
        .then( data =>{ 
            if (data.status =="200")
            {
                alert("User sucessfully deleted!")
                this.props.history.push("/Login")
            }
        
        })



    }


     
    render() {
  
   
        return (
            <div id="main-content" >
            <h3  id="account-title">Account Details</h3>


                <div className="account">
                    
                    <div className="form-area"> 
    
                        <form id="account-form">

                            <div >
                                <label for="Aname">Name:</label>
                                <input id="Aname" value={this.state.Aname} name="Aname" type="text" onChange={this.handleChange} className="form-control" placeholder="Name"  />
                                
                                <label for="Age">Age:</label>
                                <input  id="Age" value={this.state.age} name="age" type="number" onChange={this.handleChange} className="form-control" placeholder="Age" />
                                
                                <label for="email">Email:</label>
                                <input id="email" value={this.state.email}  name="email" type="text" onChange={this.handleChange} className="form-control" placeholder="Email" />
                                
                                <label for="phoneNo">Phone:</label>
                                <input id="phone" value={this.state.phoneNo} name="phoneNo" type="text" onChange={this.handleChange} className="form-control" placeholder="Phone Number"  />
                            </div>
                            
                            <button  id="account-button" type="button" onClick={this.updateProfile} id="submit" name="submit" className="submit_booking mt-4 pull-right">Update</button>
                            <button  type="button" onClick={this.delProfile}  name="submit" className="account-butto mt-3 pull-right">Delete Account</button>

                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default Account
