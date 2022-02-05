import React, { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";
import {
  validateCategory,
  validateProductName,
  validateUrl,
  validatePrice,
} from "../../helpers/ValidateFields";
import Swal from "sweetalert2";
const ProductEdit = ({db, getApi}) => {
const [product, setProduct] = useState({});
// Parametros
const {id} = useParams()
// Referencias
const productNameRef =  useRef('');
const productPriceRef =  useRef('');
const productUrlRef =  useRef('');
const navigate = useNavigate();



// useEffect

useEffect(async()=>{
  try {
    const res = await fetch(`${db}/${id}`);
    const productApi= await res.json();
    console.log(productApi)
    setProduct(productApi)
    
  } catch (error) {
    console.log(error)
    
  }
},[])


const handleSubmit= (e) =>{
  e.preventDefault();
 
  //Validar datos
  if (
    !validateProductName(productNameRef.current.value) ||
    !validatePrice(productPriceRef.current.value) ||
    !validateUrl(productUrlRef.current.value) ||
    !validateCategory(product.category)
  ) {
    Swal.fire("Ops!", "Invalid data, please correct it went wrong", "error");
    return;
  
  }
  console.log('datos correctos')

  //Guardo el obejo

  const productUpdated = {
    name : productNameRef.current.value,
    price: productPriceRef.current.value,
    url: productUrlRef.current.value,
    category: product.category
  };

  // 

  Swal.fire({
    title: "Are you sure you want to save changes?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, save it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`${db}/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productUpdated),
        });

         if (res.status === 200) {
          Swal.fire("Updated!", "Your file has been updated.", "success");
            getApi();
          navigate("/productTable");
         }
      } catch (error) {
        console.log(error);
      }
    }
  });




}
  return (
    <div>
      <Container className="py-5">
        <h1>Edit Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control type="text" placeholder="Ej: Café" defaultValue={product.name}
            ref={productNameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control type="number" placeholder="Ej: 50" defaultValue={product.price} ref={productPriceRef}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              defaultValue={product.url} ref={productUrlRef}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
               value = {product.category}
            onChange = {({target})=>
            setProduct({...product, category: target.value})}>
              <option value="">Select an option</option>
              <option value="hot drinks">Hot drinks</option>
              <option value="cold drinks">Cold drinks</option>
              <option value="sandwich">Sandwich</option>
              <option value="sweet">Sweet</option>
              <option value="salty">Salty</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-orange">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductEdit;
