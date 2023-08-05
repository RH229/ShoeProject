import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { API_CLIENT } from "../shared/services/api-client";
import Header from "./Header";
import Footer from "./Footer";
import '../App.css';
export default function NewArrival() {
  const [cart, setCart] = useState([]);

  const addToCart = (data) =>{
    setCart([...cart, { ...data, quantity : 1}])
    console.log(cart);
  }


  let cardStyle = {
    display: "inline-block",
    top: "5vh",
    margin: "20px",
    width: "18rem",
  };

  const [shoe, setShoe] = useState([]);
  useEffect(() => {
    const promise = API_CLIENT.get(process.env.REACT_APP_PIZZA_URL);
    promise
      .then((result) => {
        console.log("Pizza Data", result.data.Vegetarian);
        setShoe(result.data.Vegetarian);
      })
      .catch((err) => console.log("Network error"));
  }, []);
  const createCard = (shoe) =>{
    return (
      <Card style={cardStyle}>{cardInternal(shoe)}</Card>
    )
  }
  const cardInternal = (shoe) =>{
    return(

    <><Card.Img variant="top" src={shoe.assets.menu[0].url} /><Card.Body>
      <Card.Title>{shoe.name}</Card.Title>
      <Card.Text>
      {shoe.menu_description}
      </Card.Text>
      <Card.Text>
      Rs.900
      </Card.Text>
      <Button onClick={() => addToCart(shoe)} variant="primary">Add To Cart</Button>
    </Card.Body></>
    )
  }
  // let newstyle={
  //   fontFamily: 'Ubuntu',

  // }
  return (
    <>
      <Header />
      <div className="container p-1 ">
        <h1 className="text-center Newarrivals-style">NEW ARRIVALS</h1>
        <hr></hr>
        {shoe.map((shoe,index) => createCard(shoe))}
        {/* <Card style={cardStyle}> */}
          {/* <Card.Img variant="top" src={Banner1} />
          <Card.Body>
            <Card.Title>Puma a15</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Buy Now</Button>
          </Card.Body> */}
        {/* </Card> */}
      </div>
      <Footer/>
    </>
  );
}
