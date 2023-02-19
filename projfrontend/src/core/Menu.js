
import React,{Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout,isAutheticated } from '../auth/helper';



const currentTab = (history,path) =>{
    if(history.location.pathname === path){
        return{color :"#f90" }  
    }
    else{
        return {color :"#212832"}
    }
}
const Menu = ({history})=> (
    <div style={{backgroundColor:"#F0F4F9" }}>
        <ul className="nav nav-tabs" >
        <li className="nav-item">
            <Link style={currentTab(history,"/")} className="nav-link" to="/">
                Home
            </Link>
        </li>
        <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">
                Cart
            </Link>
        </li>
       {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
            <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                U.Dashboard
            </Link>
        </li>
       )}
       
        {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
            <Link  style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                A.Dashboard
            </Link>
        </li>
        )}
        
      {
          !isAutheticated() && (
            <Fragment>
            <li className="nav-item">
                <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
                    signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">
                    signin
                </Link>
            </li>
            </Fragment>
          )
      }
           {isAutheticated() && (
               <li className="nav-item">
                   <span 
                   className="nav-link"
                   style={{color : "#b96100"}}
                   onClick={()=>{
                       signout(()=>{
                           history.push("/");
                       })
                   }}>
                       Signout
                   </span>
               </li>
           )} 
        
        </ul>
    </div>
)

export default withRouter(Menu);