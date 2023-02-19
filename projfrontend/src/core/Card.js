import React,{useState,useEffect} from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";


const Card = ({ product ,addtoCart = true,
  removeFromCart = false,setReload =f => f
  ,reload=undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count)



    const cartTitle = product ? product.name :"A photo from Pixles"
    const cartDescription = product ? product.description :"Default "
    const cartPrice = product ? product.price :"NA"

    const addToCart =( ) =>{
      addItemToCart(product,() => setRedirect(true))
    }

    const getARedirect =(redirect) =>{
      if(redirect){
        return <Redirect to="/cart/" />
      }
    }

    const showAddToCart = (addtoCart) =>
    {
      return (
        addtoCart &&
        <button
        onClick={addToCart}
        className="btn btn-block btn-outline mt-2 mb-2 rounded"
        style={{backgroundColor:"#f90",color:"#FFF9F5" }}
      >
        Add to Cart
      </button>
      )
    }
    const showRemoveFromCart = (removeFromCart) =>
    {
      return(
        removeFromCart &&
        <button
              onClick={() => {removeItemFromCart(product._id);
                setReload(!reload);
              }}
              className="btn btn-block  mt-2 mb-2 rounded"
              style={{backgroundColor:"rgb(71 89 107)",color:"#FFF9F5" }}
            >
              Remove from cart
            </button>
      )
    }

  
  return (
    <div className="card text-white border-outline-warning"  style={{border:"1px  solid #f90"  }}>
      <div className="card-header lead" style={{backgroundColor:"#FFF9F5" ,border:"none" ,color:"#212832"}} >{cartTitle}</div>
      <div className="card-body" style={{backgroundColor:"#FFF9F5"}}>
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead  text-wrap " style={{color:"#212832" ,fontSize:"17px"}} >
          {cartDescription}
        </p>
        <p className="btn  rounded  btn-sm px-4" style={{border:"1px  solid #f90" , color:"#212832" ,fontWeight:"normal"}}>${cartPrice}</p>
        <div className="row">
          <div className="col-12">
           {showAddToCart(addtoCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
