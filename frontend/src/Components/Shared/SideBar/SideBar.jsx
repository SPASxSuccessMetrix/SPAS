/* eslint-disable react/prop-types */
import styles from "./sidebar.module.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";
import {useSelector} from "react-redux"
import { useLocation } from "react-router-dom";

const SideBar = ({ heading, sideBarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const userName = useSelector(state => state.user.username)
  return (
    <div style={sideBarOpen ? { display: "none" } : {}} className={styles.main}>
      <div className={styles.admin}>
        <Avatar
          sx={{ width: "3.9rem", height: "3.9rem" }}
          src="/profile.jp"
          alt={userName}
        />
        <p>{userName}</p>
      </div>
      <div className={styles.sections}>
        <p
          onClick={() => navigate("/home")}
          style={heading === "Dashboard" ? { color: "#4D4C98" } : {}}
        >
          Dashboard
        </p>
        <p
          onClick={() => navigate("/attendance")}
          style={heading === "Attendance" ? { color: "#4D4C98" } : {}}
        >
          Attendance
        </p>
        <p
          onClick={() => navigate("/marks")}
          style={heading === "Marks" ? { color: "#4D4C98" } : {}}
        >
          Marks
        </p>
        <p
          onClick={() => navigate("/traits")}
          style={heading === "Traits" ? { color: "#4D4C98" } : {}}
        >
          Traits
        </p>
        <p
          onClick={() => navigate("/profquestion")}
          style={location === "/profquestion" ? { color: "#4D4C98" } : {}}
        >
          Questionairre
        </p>
      </div>
    </div>
  );
};

export default SideBar;
