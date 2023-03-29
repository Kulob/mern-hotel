import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { useSelector } from "react-redux";
import Reserve from "../../components/reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";
import StripeCheckout from 'react-stripe-checkout';
import axios from "../../axios";
import PayButton from "../../components/payButton/PayButton";
import { url } from "../../axios";
import { useHistory } from "react-router";
import { userRequest } from "../../requestMethods";
import { format } from "date-fns";


const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const {data, loading, error} = useFetch(`https://mern-hotel-api.vercel.app/api/hotels/find/${id}`)

  const {dates, options} = useContext(SearchContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
 
  const totalPrice = days * data.cheapestPrice * options.room

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    }
    else{
      navigate('/login')
    }
  }
  
  
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

    const makeRequest = async () => {
      try {
        const {data} = await userRequest.post("api/stripe/payment", {
          tokenId: stripeToken.id,
          amount: totalPrice,
        });
          navigate(`/success/${id}`);
        } catch {}
      };
      stripeToken && makeRequest();

  return (
    <div>
      <Navbar />
      <Header type="list" />
  

      {loading ? 'loading'
      : <div className="hotelContainer">
        <span className="startDate">{`${format(dates[0].startDate, "dd/MM/yyyy")} до ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}</span>
      {open && (
        <div className="slider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleMove("l")}
          />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      <div className="hotelWrapper">
        <button className="bookNow" onClick={handleClick}>Забронировать</button>
        <h1 className="hotelTitle">{data.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{data.address}</span>
        </div>
        <span className="hotelDistance">
        Отличное расположение – {data.distance}
        </span>
        <span className="hotelPriceHighlight">
          Забронируйте проживание в этом отеле стоимостью более {data.cheapestPrice} ₽ и получите бесплатное такси до аэропорта
        </span>
        <div className="hotelImages">
          {data.photos?.map((photo, i) => (
            <div className="hotelImgWrapper" key={i}>
              <img
                onClick={() => handleOpen(i)}
                src={photo}
                alt=""
                className="hotelImg"
              />
            </div>
          ))}
        </div>
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{data.title}</h1>
            <p className="hotelDesc">{data.desc}</p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Идеально подходит для проживания на {days}-ночей!</h1>
            <span>
              Этот вариант находится в самом сердце города. Оценка за отличное расположение: 9,7              
            </span>
            <span>Хотите хорошо выспаться? У этого варианта высокие оценки за очень удобные кровати.</span>
            <h2>
              <b>{totalPrice} ₽</b> ({days} ночей)
            </h2>
            <button onClick={handleClick}>Забронировать</button>
            <StripeCheckout
            name="Mirovonzoda"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            amount={totalPrice * 100}
            currency='RUB'
        token={onToken}
        stripeKey="pk_test_51MXT3BFaUcKBXmhhqJ7WYEpUCFqMCHqenMzazMcVn9HM6uZN2AAk2qrBcOPVhOpuE0bESRt6Y5O237axRXu3BYgX00lpDOCEGV"
      >

      <button style={{width:'100%'}} onClick={() => makeRequest()}>Платить сейчас</button>
      </StripeCheckout>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>}
    {openModal && <Reserve setOpenModal={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
