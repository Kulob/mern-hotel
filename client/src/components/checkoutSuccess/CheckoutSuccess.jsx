import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import './checkoutSuccess.scss'
import { format } from 'date-fns';


const CheckoutSuccess = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  // const [destination, setDestination] = useState(location.state.destination);
  // const items = location.state.stripeData;
  // const data = location.state.data;
  const {data, loading, error} = useFetch(`api/hotels/find/${id}`)
  const {user} = useContext(AuthContext)
  const [orderId, setOrderId] = useState(null)

  const {dates, options} = useContext(SearchContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
 
  const totalPrice = days * data.cheapestPrice * options.room
  console.log(data);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(`api/orders/${user._id}`, {
          userId: user._id,
          hotelName: data.name,
          amount: totalPrice,
          arrivalDate: format(dates[0].startDate, "dd/MM/yyyy"),
          departureDate: format(dates[0].endDate,"dd/MM/yyyy"),
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [data, user]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
      style={{
        display:'flex',
        gap: '30px',
        marginBottom: '20px'
      }}
      >
      <img
      src='https://firebasestorage.googleapis.com/v0/b/fileupload-33fc8.appspot.com/o/images%2Fcomplete-order.jpg?alt=media&token=7614456e-4055-4a14-b51e-4dd518ee6847' alt="" />
      <div
      style={{
        display:'flex',
        flexDirection:'column',
        gap:'10px'
      }}
      >
      <span 
        style={{
          fontSize: '24px',
          fontWeight: '700'
        }}
      >{data.name}</span>
      <span>{data.address}</span>
      <span>{`${format(dates[0].startDate, "dd/MM/yyyy")} до ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
      <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
      <span className='price'>Cумма:</span>
      <span className='dashed'></span>
      <b>{totalPrice} ₽</b>
      </div>
      </div>
      </div>

      {orderId
        ? `Заказ был создан успешно. Ваш номер заказа - это ${orderId}`
        : `Успешно. Ваш заказ находится в стадии подготовки...`}
      <Link to='/'>
      <button style={{ padding: 10, marginTop: 20 }}>Перейти на главную страницу</button>
      </Link>

    </div>
  )
}

export default CheckoutSuccess;