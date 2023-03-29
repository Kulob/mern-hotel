import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import { checkIsAuth, loginUser } from '../../redux/slice/authSlice'
import './login.css'
import axios from 'axios'

const Login = () => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const dispatch = useDispatch();
  // const {status} = useSelector((state) => state.auth)
  // const isAuth = useSelector(checkIsAuth)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(status) {
  //     // toast(status)
  //    }
  //    if(isAuth) {
  //     // navigate('/')
  //   }
  // },[status, isAuth, navigate])

  // const handleSubmit = async(e) =>{
  //   e.preventDefault();
  //   try {
  //    await dispatch(loginUser({ username, password }))
      
  //     navigate('/')
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://mern-hotel-api.vercel.app/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
      <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Войти
        </button>
        <Link to='/register'
        className=' flex justify-center items-center text-white text-xs'
        >Нет аккаунта?</Link>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login
