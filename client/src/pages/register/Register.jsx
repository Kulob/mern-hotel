import React, { useState, useEffect } from 'react';
import './register.scss';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsAuth,
  registerStart,
  registerSuccess,
  registerUser,
} from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';

const Register = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [info, setInfo] = useState({});
  const [per, setPerc] = useState(null);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
          switch (snapshot.state) {
            case 'paused':
              break;
            case 'running':
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
        },
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...info };
      dispatch(registerUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
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
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <FontAwesomeIcon icon={faDownload} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button disabled={per !== null && per < 100} onClick={handleClick}>
                Зарегистрироваться
              </button>
            </form>
            <Link to="/login" className="">
              Уже зарегистирированы?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
