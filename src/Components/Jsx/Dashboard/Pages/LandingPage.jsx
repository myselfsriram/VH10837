import React, { Component } from 'react'
import '../../../Css/LandingPage.css'
import { Link } from 'react-router-dom';



class LandingPage extends Component {
    render() {
        return (
            <div id="landingPage">
                 <div  id="landingImage" style={{width: "60%", height: "100vh", float:"left"}}>
                     <h1>Welcome Home.</h1>
                     
                 </div>
                 <div id="landingText" style={{width: "40%", height: "100vh", float:"right"}}>
                     <div  style={{paddingTop:"50%", paddingLeft:"20%"}}>
                        <Link   style={{width:"350px",borderRadius:"50px"}} className="btn btn-primary"to="/Dashboard/Booking"> Book Tickets </Link>
                        <Link style={{width:"350px", borderRadius:"50px"}} className="btn  mt-4 btn-primary"to="/Dashboard/TrainStatus">Train Status </Link>
                    </div>
                 </div>


            </div>
        )
    }
}

export default LandingPage
