// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { checkIsAuth, registerUser } from '../../redux/slice/authSlice'
// import './register.css'

// const Register = () => {
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const dispatch = useDispatch();
//   const {status} = useSelector((state) => state.auth)
//   const isAuth = useSelector(checkIsAuth)
//   const navigate = useNavigate()

//   useEffect(()=>{
//     if (status) {
//       toast(status)
//     }
//     if (isAuth) {
//       navigate('/')
//     }
//   },[status, isAuth, navigate])
//   const handleSubmit = () =>{
//     try {
//       dispatch(registerUser({username,email, password}))
//       setUsername('')
//       setEmail('')
//       setPassword('')
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div className="login">
//       <div className="lContainer">
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="lInput"
//         />        
//         <input
//           type="email"
//           placeholder="Email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="lInput"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="lInput"
//         />
//         <button onClick={handleSubmit} className="lButton">
//         Зарегистрироваться
//         </button>
//         <Link to='/login'
//         // className=' flex justify-center items-center text-white text-xs'
//         >Уже зарегистирированы??
//         </Link>
//         {/* {error && <span>{error.message}</span>} */}
//       </div>
//     </div>
//   )
// }

// export default Register

import React,{ useState, useEffect } from "react";
// import "./new.scss";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import axios from "axios";
import './register.scss'
import {storage } from '../../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerStart, registerSuccess, registerUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const Register = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [per, setPerc] = useState(null);
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
    const {status} = useSelector((state) => state.auth)

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInfo((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);


  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id] : e.target.value}));
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if (status) {
      toast(status)
    }
    if (isAuth) {
      navigate('/')
    }
  },[status, isAuth, navigate])
  const handleClick = async(e) => {
    e.preventDefault();
    try {
      const newUser = {...info}
      console.log(newUser);
      await dispatch(registerUser(newUser))
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="new">
      
      <div className="newContainer">
        
        <div className="top">
          <h1>Регистрация</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <FontAwesomeIcon icon={faDownload} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                  onChange={handleChange}
                  type={input.type} 
                  placeholder={input.placeholder} 
                  id={input.id}/>
                </div>
              ))}
              <button disabled={per !== null && per < 100} onClick={handleClick}>Зарегистрироваться</button>
            </form>
      <Link to='/login'
        className=''
        >Уже зарегистирированы?
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;