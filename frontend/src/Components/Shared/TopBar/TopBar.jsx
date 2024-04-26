import styles from "./TopBar.module.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from "@mui/material";
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { logout, setUsername } from "../../../redux/slices/userSlice";
import { url } from "../../../api";
import {useNavigate} from "react-router"
import { useEffect } from "react";

const TopBar = () => {


  useEffect(() => {

  })

  const getCurrentFormattedDate = () => {
    const currentDate = new Date();


    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };


    return new Intl.DateTimeFormat("en-US", options).format(currentDate);
  };


  const formattedDate = getCurrentFormattedDate();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/")
    }
  })

  const logoutHandler = async () => {
    try{
      const response = await axios.get(`${url}/auth/logout`, {withCredentials: true});
      dispatch(setUsername(""))
      dispatch(logout())
      alert(response.data)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.branding}>
          <img src="/logo.svg" alt="Logo" />
          <h1>SPAS</h1>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
          <button className={styles.searchButton}>
            <img src="/Icons/search.svg" alt="SearchButton" />
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <p>{formattedDate}</p>
        <div className={styles.navLinks}>
          <img src="/Icons/darkmode.svg" alt="Toggle" />
          <img onClick={() => navigate("/upload")} src="/Icons/upload.svg" alt="upload" />
          {/* <img src="/Icons/account.svg" alt="logout" /> */}
          {isLoggedIn && <Button onClick={logoutHandler} sx={{color: "#b6bfd0"}}>Logout</Button>}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
