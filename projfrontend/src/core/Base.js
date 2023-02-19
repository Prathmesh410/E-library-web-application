import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = " p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid min-vh-100 mh-100">
      <div className="jumbotron text-center" style={{color : "#212832"}}>
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children} </div>
    </div>
    <footer className="footer mt-auto p-3">
      <div className="container-fluid text-center py-3" style={{backgroundColor:"#F0F4F9" ,color:"#212832"}}>
        <h4 className="lead" style={{fontWeight:"normal"}}>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-lg rounded" style={{backgroundColor:"#f90", color:"#FFF9F5"}}>Contact Us</button>
      </div>
    </footer>
  </div>
);

export default Base;