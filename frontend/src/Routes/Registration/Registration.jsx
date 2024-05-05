/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import {useState} from "react";
import styles from "./registration.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { url } from "../../api";
import {useDispatch} from "react-redux"
import { login, setRole } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

const Registration = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollment, setEnrollment] = useState("")
  const [password, setPassword] = useState("");


  const submitRequest = async (e) => {
    e.preventDefault();
    const body = {
      name: fullName,
      email,
      enrollment: enrollment.toUpperCase(),
      password
    }
    try{
      const response = await axios.post(`${url}/auth/register`, body, {withCredentials: true});
      console.log(response);
      alert("Signup successful!");
      dispatch(login())
      dispatch(setRole(response?.data?.role))
      navigate("/home");
    }catch(err){
      console.log(err)
      alert("Signup Failed!")
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img className={styles.logo} src="logo2.svg" alt="" />
        <h2>SPAS</h2>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <h1>Create your account</h1>
          <p>
            Already have an account ? <Link style={{color: "#6C9F96"}} to={"/login"}>Login</Link>
          </p>
        </div>
        <form className={styles.container}>
          <div className={styles.inputContainer}>
            <h3>Full name</h3>
            <input
              onChange={(e) => setfullName(e.target.value)}
              value={fullName}
              className={styles.input}
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div className={styles.inputContainer}>
          <h3>Email</h3>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={styles.input}
              type="email"
              placeholder="Enter Your email"
            />
            </div>
            <div className={styles.inputContainer}>
            <h3>Enrollment</h3>
            <input
              onChange={(e) => setEnrollment(e.target.value)}
              value={enrollment}
              className={styles.input}
              type="text"
              placeholder="Enter Your Enrollment No."
            />
          </div>
          <div className={styles.inputContainer}>
            <h3>Password</h3>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={styles.input}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className={styles.buttonDiv}>
            <Button onClick={submitRequest} className={styles.signupButton} variant="contained">
              Signup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
