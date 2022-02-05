import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Product = ({product, db, getApi}) => {

  const handleDelete = (id) =>{
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${db}/${id}`,{
            method: 'DELETE',
            headers:{"Contente-Type":"application/json"}
          } );
          if (res.status === 200){
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getApi();

          }
  

      
        } catch (error) {
          console.log(error);
        }
      }
    });

  }
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <p className="truncate-img-link m-0">
{product.url}        </p>
      </td>
      <td> {product.category}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link to={`/productEdit/${product.id}`}className="btn-orange mx-1 text-decoration-none text-center">Update</Link>
          <button className="btn-red mx-1" onClick={()=> handleDelete(product.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
