import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../../Css/Dashboard.css'
import '../../Css/Sidebar.css'


import {SidebarData} from './SidebarData'
import {Link} from 'react-router-dom';


class DashNav extends Component {
    constructor(){
        super();
        this.state={
            showMe:false,
        }
        this.handleLogout=this.handleLogout.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleLinkClick=this.handleLinkClick.bind(this)


    }

    handleClick(){
        this.setState({
            showMe: ! this.state.showMe
        })
    }
   
    async handleLogout(event){
        event.preventDefault(); 
        localStorage.clear();
        this.props.history.push('/Login')
    }

    handleLinkClick(){
        this.setState({
            showMe: false
        })
    }
    

    
    
    render() {

        return (
        <div>
            <div id="dashnav" className="sticky-top ">
              <button id="navbutton" ><FontAwesomeIcon style={{color:"white"}} onClick={this.handleClick} icon={ faBars } /> </button>
              <button id="logout" onClick={ this.handleLogout} ><h4 style={{color:"white",margin:"10px 15px 0 0 ", float:"left"}}>Logout</h4> <FontAwesomeIcon icon={faSignOutAlt} />  </button>   
                
            </div>




            <div className={this.state.showMe? 'sidebar  active': 'sidebar'}>
                    <ul className='sidebar-items'  onClick={this.handleLinkClick} >
                        { SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <FontAwesomeIcon className="sidebar-icon" icon={ item.icon } />
                                <Link  to={item.path}>
                                    <p>{item.title}</p>
                                </Link>
                            </li>
                        );
                        })}

                    </ul>
                </div>


        </div>
            
        )
    }
}

export default DashNav
