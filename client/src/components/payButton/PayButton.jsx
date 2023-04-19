import axios from 'axios';
import { useContext } from 'react';
import { url } from '../../axios';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';

const PayButton = ({ hotelItems }) => {
  // const {user} = useContext(AuthContext)
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const handleCheckout = () => {
    axios
      .post('https://mern-hotel-api.vercel.app/api/stripe/create-checkout-session', {
        hotelItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
