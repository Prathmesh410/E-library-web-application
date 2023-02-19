import React ,{useState} from "react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import {signup} from "../auth/helper"


const Signup = () => {

const [values, setvalues] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success :false

})

const {name,email, password,error,success} =values 

const handleChange = name => event => {
    setvalues({...values, error:false, [name]: event.target.value})
};

const onSubmit = event =>{
    event.preventDefault()
    setvalues({...values, error : false})
    signup({name,email,password})
    .then(data=>{
        if(data.error){
            setvalues({...values,error :data.error,success: false})
        }
        else{
            setvalues({...values,name:"",
            email:"",
            password:"",
            error:"",
            success :true})
        }
    })
    .catch(console.log("error in signup"));
    
};

const successMessage =()=>{
    return(
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
    <div
     className="alert alert-success" style={{display: success ? "": "none"}}>
        new account was created successfully.Please <Link to="/signin">login Here</Link>

    </div>
    </div>
    </div>
    
    )
}
const errorMessage =()=>{
   return( 
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
   <div className="alert alert-danger" style={{display: error ? "": "none"}}>
        {error}

    </div>
    </div>
    </div>
    )
}

    const signupform = ()=> {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <lable style={{color:"#212832"}} className="lead">Name</lable>
                            <input className="form-control" onChange={handleChange("name")} type="text"
                            value={name}/>
                        </div>
                        <div className="form-group">
                            <lable style={{color:"#212832"}} className="lead">Email</lable>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email}/>
                        </div>
                        <div className="form-group">
                            <lable style={{color:"#212832"}} className="lead">Password</lable>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password}/>
                        </div>
                        <button onClick={onSubmit} className="btn  rounded  btn-block" style={{marginTop:"8px" , backgroundColor:"#f90",color:"#FFF9F5"}}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return(
        <Base title=" Signup page" description="A page where you can signup">
           {successMessage()}
           {errorMessage()}
            {signupform()}
            {/* <p className="text-white text-center">
                
                {JSON.stringify(values)}
            </p> */}

        </Base>
    );
};
export default  Signup;
