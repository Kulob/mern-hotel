import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0 }&max=${max || 99999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Поиск</h1>
            <div className="lsItem">
              <label>Место/название объекта</label>
              <input placeholder={destination} 
              onChange={(e) => setDestination(e.target.value)}
              type="text" />
            </div>
            <div className="lsItem">
              <label>Дата заезда/Дата отъезда</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} дo ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Опции</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                  Мин. цена <small>за ночь</small>
                  </span>
                  <input type="number" className="lsOptionInput" 
                  onChange={(e) => setMin(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                  Макс. цена <small>за ночь</small>
                  </span>
                  <input type="number" className="lsOptionInput" 
                  onChange={(e) => setMax(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Взрослых</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Детей</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Номер</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Поиск</button>
          </div>
          <div className="listResult">
            {loading ? ("loading")
            :(<>
            {data.map((item) => (

            <SearchItem item={item} key={item._id}/>
            ))}
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
