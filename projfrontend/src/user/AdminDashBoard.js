import React from 'react'
import Base from  "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import {Link } from "react-router-dom";



const  AdminDashBoard = () => {

    const {user : { name,email,role}} = isAutheticated();

    const adminLeftSide = () => {
        return (
            <div className="card " style={{backgroundColor:"#f90"}}>
                <h3 className="card-header bg-dark text-white">Admin Navigation</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to ="/admin/create/category" className=" nav-link text-success">
                        Create Categories
                        </Link>
                        <Link to ="/admin/categories" className=" nav-link text-success">
                        Manage categories
                        </Link>
                        <Link to ="/admin/create/product" className=" nav-link text-success">
                        Create Product
                        </Link>
                        <Link to ="/admin/products" className=" nav-link text-success">
                        Manage Products
                        </Link>
                        <Link to ="/admin/orders" className=" nav-link text-success">
                        Manage orders
                        </Link>
                        

                    </li>
                </ul>
            </div>
        )

    }
    const adminRightSide = () => {
     return(
         <div className="card mb-4">
             <h3 className="card-header">Admin Information</h3>
             <ul className="list-group">
                 <li className="list-group-item">
                    <span className="badge bg-success mr-2">
                         Name :
                     </span> {name}
                 </li>
                 <li className="list-group-item">
                    <span className="badge bg-success mr-2">
                         Email :
                     </span> {email}
                 </li>
                 <li className="list-group-item">
                    <span className="badge bg-danger">Admin Area</span>
                 </li>
             </ul>
         </div>
     )

    }






    return (
        <Base title =" welcome to Admin Area" description="Manage all the work here"
        className="container bg-warning p-4">

        <div className="row">
            <div className="col-3">{adminLeftSide()}</div>
            <div className="col-9">{adminRightSide()}</div>
        </div>
        
        

        </Base>
    )
}

export default AdminDashBoard;