import useFetch from '../../hooks/useFetch';
import './featured.css';

const Featured = () => {
  const { data, loading, error } = useFetch(
    'https://mern-hotel-api.vercel.app/api/hotels/countByCity?cities=москва,краснодар,туапсе',
  );
  return (
    <div className="featured">
      {loading ? (
        'Loading please wait'
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.fonstola.ru/images/201504/fonstola.ru_175102.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Москва</h1>
              <h2>{data[0]} отели</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663254836_12-mykaleidoscope-ru-p-nochnoi-krasnodar-krasivo-12.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Краснодар</h1>
              <h2>{data[1]} отель</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://avatars.dzeninfra.ru/get-zen_doc/242954/pub_5faac5711261131085eec3d0_5faac872ea8df61cb6cbf0a6/scale_1200"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Туапсе</h1>
              <h2>{data[2]} отели</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
