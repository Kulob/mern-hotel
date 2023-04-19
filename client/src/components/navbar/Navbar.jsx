import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../redux/slice/authSlice';

const Navbar = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(user);
  const onClickLogout = async (e) => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      navigate('/');
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className="logo">
            Mirov
            <FontAwesomeIcon icon={faEarthAmericas} />
            nzoda
          </span>
        </Link>
        {user ? (
          <div className="userItems" onClick={() => setOpenPopup(!openPopup)}>
            <img className="avatar" src={user.img} alt="" />
            <span>{user.username}</span>
            <FontAwesomeIcon icon={faArrowDownShortWide} />
            {openPopup && (
              <div className="options">
                <Link to={`/order/${user._id}`}>
                  <button className="order">Бронирования</button>
                </Link>
                <button className="logout" onClick={onClickLogout}>
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#fff', color: '#000' }} className="navButton">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button style={{ backgroundColor: '#fff', color: '#000' }} className="navButton">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
