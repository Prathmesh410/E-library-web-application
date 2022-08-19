import React,{useEffect,useState} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";


export default function Home() {

  const [products, setproducts] = useState([])
  const [error, seterror] = useState(false);

  const loadAllProduct =()=>{
    getProducts().then(data=>{
      if(data.error){
        seterror(data.error)
      }
      else{
        setproducts(data);
      }
    })
  }

  useEffect(() => {
    loadAllProduct()
  }, [])



  return (
    <Base title="Home Page" description="welcome to the home page">
      <div className="row text-center">
        <h1 className="text-white">All of Products</h1>
        <div className="row">
          {products.map((product,index) =>{
            return(
              <div key={index} className="col-4 mb-4">
                  <Card product={product}/>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
}
