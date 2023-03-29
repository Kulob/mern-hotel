import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import {AuthContext} from '../../context/AuthContext'

const Navbar = () => {
  const {toggle, darkMode} = useContext(DarkModeContext)

  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            {darkMode ? 
            <WbSunnyIcon
              className="icon"
              onClick={toggle} />
              : <DarkModeOutlinedIcon
              className="icon"
              onClick={toggle}
            />}
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          {user ? <div className="item">
            <span className="username">{user.username}</span>
            <img
              src={user.img}
              alt=""
              className="avatar"
            />
          </div> : <button>Войти</button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;