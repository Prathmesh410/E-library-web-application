// import React,{useState,useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import { isAutheticated } from '../auth/helper';
// import Base from "../core/Base";
// import { getCategories } from './helper/adminapicall';


// const ManageCategories =()=> {
//     const [categories, setCategories] = useState([]);

//     const {user,token} = isAutheticated();
  
//     const preload = () => {
//       getCategories().then(data => {
//         if (data.error){
//           console.log(data.error);
  
//         }
//         else{
//             setCategories(data);
//         }
//       })
//     }
  
//     useEffect(() => {
//      preload()
//     }, []);

  



//     return (
//         <Base title="Welcome admin" description="Manage products here">
//       <h2 className="mb-4">All Categories:</h2>
//       <Link className="btn btn-info" to={`/admin/dashboard`}>
//         <span className="">Admin Home</span>
//       </Link>
//       <div className="row">
//         <div className="col-12">
//           <div className="row text-center mb-2 ">
//             <div className="col-4">
//               <h3 className="text-white text-left">{
//                 categories.map((category,index) =>
//                 {
//                     return(
//                         <h3 className="text-white" key={index}>{category.name}</h3>
//                     )
//                 })
//             }</h3>
//             </div>
//             <div className="col-4">
//               <Link
//                 className="btn btn-success"
//                 to={`/admin/product/update/productId`}
//               >
//                 <span className="">Update</span>
//               </Link>
//             </div>
//             <div className="col-4">
//               <button onClick={() => {}} className="btn btn-danger">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Base>
//     )
// }
// export default ManageCategories;








import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from "../core/Base";
import { getCategories,deleteCategory } from './helper/adminapicall';


const ManageCategories =()=> {
    const [categories, setCategories] = useState([]);

    const {user,token} = isAutheticated();
  
    const preload = () => {
      getCategories().then(data => {
        if (data.error){
          console.log(data.error);
  
        }
        else{
            setCategories(data);
        }
      })
    }
  
    useEffect(() => {
     preload()
    }, []);

    const deleteThisCategory = categoryId =>{
      deleteCategory(categoryId, user._id,token).then(data =>{
        if (data.error){
          console.log(data.error);
  
        }
        else{
          preload()
        }
  
      })
       
    }



    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      {categories && categories.map((category) =>{
        return(
          <div className="row">
          <div className="col-12">
            <div className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-left" style={{color :  "rgb(33, 40, 50)"}}>{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}/`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        )
      }) }
               

    </Base>
    )
}
export default ManageCategories;




                
