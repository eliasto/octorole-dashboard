import React from "react";
import { useLocation } from "react-router-dom";

function Product() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

    return (
      <div className="h-screen bg-gray-900">
        <p>hey {id}</p>
      </div>
    );
    
  }
  
  export default Product;