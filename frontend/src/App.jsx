import "./App.css";
import Attendance from "./Routes/Attendance/Attendance";
import Landing from "./Routes/Landing/Landing";
import Marks from "./Routes/Marks/Marks";
import Questionnaire from "./Routes/Questionnaire/Questionnaire";
import Registration from "./Routes/Registration/Registration";
import Traits from "./Routes/Traits/Traits";
import Dashboard from "./Routes/dashboard/Dashboard";
import Loading from "./Components/Shared/Loading/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initialInvoke from "./InitialInvoke";
import Login from "./Routes/Login/Login";
import Upload from "./Routes/Upload/Upload";
import { useEffect, useState } from "react";
import { url } from "./api";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function App() {
  initialInvoke();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const fetchBackend = async () => {
      axios
        .get(`${url}`)
        .then((response) => {
          console.log(response.data);
          setConnected(true);
        })
        .catch((err) => console.log(err));
    };
    fetchBackend();
  }, []);
  return (
    <>
      {!connected ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <CircularProgress />
          <h2 style={{ color: "white", textAlign: "center" }}>
            The Backend Server is not connected yet because of free hosting.{" "}
            <br />
            This process can take up to 40 seconds!
          </h2>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/marks" element={<Marks />}></Route>
            <Route path="/traits" element={<Traits />} />
            <Route path="/profquestion" element={<Questionnaire />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
