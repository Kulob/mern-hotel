import axios from "axios";
import { useContext } from "react";
import { url } from "../../axios";
import { AuthContext } from "../../context/AuthContext";

const PayButton = ({ hotelItems }) => {
  const {user} = useContext(AuthContext)
  console.log(user);
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
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