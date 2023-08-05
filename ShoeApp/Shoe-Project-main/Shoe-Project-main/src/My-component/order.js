import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Card from "react-bootstrap/Card";
import { API_CLIENT } from "../shared/services/api-client";
import Header from "./Header";
import Footer from "./Footer";
import '../App.css';
import Update from "./Update";
function Order({ setProduct }) {
  const [load, setLoad] = useState(true);

    const navigate = useNavigate()
    let cardStyle = {
        display: "inline-block",
        top: "5vh",
        margin: "20px",
        width: "18rem",
    };

    const [order, setOrder] = useState([]);
    async function fetchOrders() {
        const token = localStorage.getItem("TOKEN");
        console.log(token);
        if (token) {
            await API_CLIENT.get(process.env.REACT_APP_ORDER_FETCH_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => {
                    console.log("ha",res.data);
                    setOrder(res.data.order);
                    setLoad(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    useEffect(() => {
        fetchOrders();
    }, []);

    const createCard = (shoe) => {
        return (
            <Card style={cardStyle}>{cardInternal(shoe)}</Card>
        )
    }
    const cardInternal = (shoe) => {
        return (

            <><Card.Img variant="top" src={shoe.image} /><Card.Body>
                <Card.Title>{shoe.product}</Card.Title>
                <Card.Text>
                    {shoe.address}
                </Card.Text>
                <Card.Text>
                    {shoe.price}
                </Card.Text>
            </Card.Body></>
        )
    }

    return (
        <>
        <Header/>
            <div className="container p-1 ">
                <h1 className="text-center Men-style">PREVIOUS ORDERS for {localStorage.getItem('NAME')}</h1>

                <hr></hr>
                {load  ?  <><Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack> </>:order.map((shoe, index) => createCard(shoe))}
                {/* // {order.map((shoe, index) => createCard(shoe))} */}
            </div>
        </>
    );
}
export default Order;
