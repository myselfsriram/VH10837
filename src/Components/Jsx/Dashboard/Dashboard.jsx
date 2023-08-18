import React, { Component } from 'react'
import LandingPage from './Pages/LandingPage'
import Booking from './Pages/Booking'
import Account from './Pages/Account'
import DashNav from './DashNav'
import Train from './Pages/Train'
import { Switch, Route } from 'react-router-dom';
import TrainStatus from './Pages/TrainStatus'
import Payment from './Pages/Payment'
import Receipt from './Pages/Receipt'
import Passenger from './Pages/Passenger'
import BookingHistory from './Pages/BookingHistory'
import Ticket from './Pages/Ticket'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashNav history={this.props.history}/>
                <Switch>
                                {/* different pages */}
                   <Route  path="/Dashboard/Booking"> <Booking history={this.props.history}/> </Route> 
                   <Route  path="/Dashboard/Account"> <Account history={this.props.history}/> </Route>
                   <Route  path="/Dashboard/Train"> <Train history={this.props.history}/> </Route>
                   <Route  path="/Dashboard/TrainStatus"><TrainStatus history={this.props.history}/> </Route>
                   <Route  path="/Dashboard/Payment" ><Payment history={this.props.history}/> </Route>
                    <Route  path="/Dashboard/Receipt" > <Receipt history={this.props.history}/> </Route>
                    <Route  path="/Dashboard/Passenger"> <Passenger history={this.props.history}/> </Route> 
                    <Route  path="/Dashboard/BookingHistory"> <BookingHistory history={this.props.history}/> </Route> 
                    <Route  path="/Dashboard/Ticket"> <Ticket history={this.props.history}/> </Route> 
                   <Route  path="/Dashboard"> <LandingPage/> </Route>

                </Switch>            
            </div>
        )
    }
}

export default Dashboard
