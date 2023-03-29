import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import "./orders.scss";

const Orders = () => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const {user} = useContext(AuthContext)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://mern-hotel-api.vercel.app/api/users/order/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [list]);

  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mern-hotel-api.vercel.app/api/orders/${id}/${user._id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  return (
    <>
      <Navbar/>
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Бронирование</h1>
        </div>
        <table>
          <tr>
            <th>Номер брон</th>
            <th>Название</th>
            <th>Дата заезда</th>
            <th>Дата выезда</th>
            <th>Цена</th>
            <th>Действие</th>
          </tr>
            {
              data.map((order) => (
               <tr key={order._id}>                  
                <td>{order._id}</td>
                <td>{order.hotelName}</td>
                <td>{order.arrivalDate}</td>
                <td>{order.departureDate}</td>
                <td>{order.amount} ₽</td>
                <button onClick={() => handleDelete(order._id)}>Отмена</button>
               </tr>
                
              ))
            }
        </table>
      </div>
    </div>
    </>
  )
}

export default Orders
