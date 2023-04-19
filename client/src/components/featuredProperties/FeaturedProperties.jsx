import useFetch from '../../hooks/useFetch';
import './featuredProperties.css';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    'https://mern-hotel-api.vercel.app/api/hotels?featured=true',
  );
  return (
    <div className="fp">
      {loading ? (
        'loading'
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">от {item.cheapestPrice} ₽</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.reating}</button>
                  <span>Очень хорошо</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
