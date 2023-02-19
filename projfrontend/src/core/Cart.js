import React,{useEffect,useState} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";

import { loadCart } from "./helper/cartHelper";
import { withRouter } from "react-router-dom";
import Paymentb from "./Paymentb";



 const Cart =() => {

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
      setProducts(loadCart())
  }, [reload])
    
const loadAllProducts = products =>{
    return(
        <div>
            {products.map((product,index) =>(
               <Card
               key={index}
               product={product}
               removeFromCart={true}
               addtoCart={false}
               setReload={setReload}
               reload={reload} />
            ))}
        </div>
    )
}
const loadCheckout =() =>{
    return(
        <div>
            <h2>This section for checkout</h2>
        </div>
    )
}

  return (
    <Base title="Cart Page" description="Ready to cheakout">
      <div className="row text-center" style={{backgroundColor:"#F0F4F9"}}>
      <div className="col-6"style={{marginTop:"12px",marginBottom:"12px"}} >{products?.length>0 ? loadAllProducts(products) :(<h3>No Products in Cart</h3>) }</div>
      <div className="col-6" style={{marginTop:"12px",marginBottom:"12px"}}><Paymentb products={products} setReload={setReload}/></div>
      </div>
    </Base>
  );
 }

  export default Cart;

