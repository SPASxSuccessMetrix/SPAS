/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import {useState} from "react";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { url } from "../../api";
import {useDispatch} from "react-redux"
import { login, setRole } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRequest = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password
    }
    try{
      const response = await axios.post(`${url}/auth/login`, body, {withCredentials: true});
      console.log(response);
      alert("login successful!");
      dispatch(login())
      dispatch(setRole(response?.data?.role))
      navigate("/home");
    }catch(err){
      console.log(err);
      alert("Login Failed!")
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
          <h1>Login to your account</h1>
          <p>
            Don't have an account ? <Link style={{color: "#6C9F96"}} to={"/signup"}>Sign up</Link>
          </p>
        </div>
        <form onSubmit={submitRequest} className={styles.container}>
          <div className={styles.inputContainer}>
            <h3>Email</h3>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={styles.input}
              type="email"
              placeholder="Enter Your email"
              required
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
              required
            />
          </div>
          <div className={styles.buttonDiv}>
            <Button type="submit" className={styles.signupButton} variant="contained">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
