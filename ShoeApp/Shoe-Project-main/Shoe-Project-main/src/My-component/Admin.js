import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

import Card from "react-bootstrap/Card";
import { API_CLIENT } from "../shared/services/api-client";
import Header from "./Header";
import Footer from "./Footer";
import '../App.css';
import Update from "./Update";
function Admin( {setProduct }) {
  const navigate = useNavigate()

  
  const [shoe, setShoe] = useState([]);
  function deleteProduct(shoe) {
      const promise = API_CLIENT.post(process.env.REACT_APP_DELETE_PRODUCT_URL, shoe.shoe);
      
      promise.then((result) =>{
      })
      .catch(err =>{
      })

      // setShoe(shoe);

  }
  function updateProduct(shoe) {

      setProduct(shoe);
      
      navigate('/update');

  }


  let cardStyle = {
    display: "inline-block",
    top: "5vh",
    margin: "20px",
    width: "18rem",
  };


   useEffect(() => {
    async function fetchProducts() {
      let promise =  await API_CLIENT.get(process.env.REACT_APP_PRODUCTS_URL);
      
    // promise = await promise.json();
    // console.log("##### "+ promise);
    if(promise)
    {
      if (promise.status === 200) {
        setShoe(promise.data.result);
        // alert('Found success.')
    } else {
        alert('Error.')
    }
    }
    
  }
  fetchProducts();
}, []);

  const createCard = (shoe) =>{
    return (
      <Card style={cardStyle}>{cardInternal(shoe)}</Card>
    )
  }
  const cardInternal = (shoe) =>{
    return(

    <><Card.Img variant="top" src={shoe.image} /><Card.Body>
      <Card.Title>{shoe.name}</Card.Title>
      <Card.Text>
      {shoe.description}
      </Card.Text>
      <Card.Text>
      {shoe.price}
      </Card.Text>
      <Button  variant="primary" onClick={() => {deleteProduct({shoe})}}>DELETE</Button>
      <Button  variant="primary" onClick={() => {updateProduct({shoe})}}>UPDATE</Button>
    </Card.Body></>
    )
  }
 
  return (
    <>
    {/* <Header/> */}
      <div className="container p-1 ">
        <h1 className="text-center Men-style">PREVIOUS PRODUCT for {localStorage.getItem('NAME')}</h1>
      <Button  variant="primary" onClick={() => {  navigate('/seller')}}>ADD NEW</Button>
      <Button  variant="primary" onClick={() => {localStorage.clear()
 navigate('/')
                    }}>LOGOUT</Button>

        <hr></hr>
        {shoe.map((shoe,index) => createCard(shoe))}
      </div>
      <Footer/>
    </>
  );
}
export default Admin;
