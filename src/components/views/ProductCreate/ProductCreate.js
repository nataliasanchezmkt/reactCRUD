import React, { useState,useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import {
  validateCategory,
  validateProductName,
  validateUrl,
  validatePrice,
} from "../../helpers/ValidateFields";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navigation from '../../layout/Navigation'

const ProductCreate = ({ db, getApi }) => {

  const redirect = useNavigate();
  const session = JSON.parse(sessionStorage.getItem("stateSession")) || false;

  const checkSession=()=>{
    if (!session) {
      redirect("/Login");
    }      
  }

  useEffect(()=>{
    checkSession();
  },[]);



  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [url, seturl] = useState("");
  const [categroy, setcategroy] = useState("");

  // useNavigate
  const navigate = useNavigate();

  // funcion oara crear el producto
  const handleSubmit = (e) => {
    e.preventDefault();

  // validar campos
 if (
      !validateProductName(name) ||
      !validatePrice(price) ||
      !validateUrl(url) ||
      !validateCategory(categroy)
    ) {
      Swal.fire("Ops!", "Invalid data, please correct it went wrong", "error");
      return;
    }

 // Envio los datos para guardarlos
 const newProduct = {
      name,
      price,
      url,
      categroy,
    };

    Swal.fire({
      title: "Are you sure you want to save changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(db, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          });
          console.log(res)

          if (res.status === 201) {
            Swal.fire("Created!", "Your file has been created.", "success");
            getApi();
            navigate("/productTable");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <Navigation/>
      <Container className="py-5">
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              onChange={(e) => setprice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              onChange={(e) => seturl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select onChange={(e) => setcategroy(e.target.value)}>
              <option value="">Select an option</option>
              <option value="hot drinks">Hot drinks</option>
              <option value="cold drinks">Cold drinks</option>
              <option value="sandwich">Sandwich</option>
              <option value="sweet">Sweet</option>
              <option value="salty">Salty</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
