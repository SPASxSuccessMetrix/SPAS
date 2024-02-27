import styles from "./landing.module.css";
import Spline from "@splinetool/react-spline";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Landing = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <TopBar />
        <div className={styles.mainContent}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Revolutionize <br /> your student <br /> analysis today!
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris.
            </p>
            <div className={styles.buttonClass}>
              <Button onClick={() => navigate("/signup")} variant="contained">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Spline scene="https://prod.spline.design/BwIYUOsE4q8yqUTu/scene.splinecode" />
      </div>
    </div>
  );
};

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.topBar}>
      <div className={styles.branding}>
        <img src="/logo.svg" alt="Logo" />
        <h1>SPAS</h1>
      </div>
      <div className={styles.topBarRight}>
        <button
          onClick={() => navigate("/login")}
          className={styles.loginButton}
        >
          Login
        </button>
        <Button
          onClick={() => navigate("/signup")}
          className={styles.signupButton}
          variant="contained"
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Landing;
