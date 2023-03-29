import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Бесплатное такси</span>
        <span className="siSubtitle">
        номера с кондиционером
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Бесплатная отмена бронирования</span>
        <span className="siCancelOpSubtitle">
        Вы можете отменить заказ позже, поэтому зафиксируйте эту выгодную цену сегодня!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Отлично</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice} ₽</span>
          <span className="siTaxOp">Включает налоги и сборы</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Посмотреть свободных мест</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SearchItem;
