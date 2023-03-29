import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import './reserve.css'
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Reserve = ({setOpenModal, hotelId}) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const {data, loading, error} = useFetch(`api/hotels/room/${hotelId}`)
  const {dates} = useContext(SearchContext)
  const navigate = useNavigate()

  const {user} =useContext(AuthContext)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => 
    alldates.includes(new Date(date).getTime()))
    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
      ? [...selectedRooms, value]
      : selectedRooms.filter((item) => item !== value)
    )
  }
  const handleClick = async() => {
    try {
      await Promise.all(
        selectedRooms.map(roomId => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          })
          return res.data;
        })
      )
      setOpenModal(false);
    } catch (error) {
      
    }
  }


  return (
    <div className='reserve'>
      <div className="rContainer">
      <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <span>Выберите свои номера:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
              Максимальное количество людей: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price} ₽</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                <label>{roomNumber.number}</label>

                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}
                />
              </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
        Бронируйте прямо сейчас!
        </button>
        
      </div>
    </div>
  )
}

export default Reserve
