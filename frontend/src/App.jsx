import "./App.css";
import Attendance from "./Routes/Attendance/Attendance";
import Landing from "./Routes/Landing/Landing";
import Marks from "./Routes/Marks/Marks";
import Questionnaire from "./Routes/Questionnaire/Questionnaire";
import Registration from "./Routes/Registration/Registration";
import Traits from "./Routes/Traits/Traits";
import Dashboard from "./Routes/dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initialInvoke from "./InitialInvoke";
import Login from "./Routes/Login/Login";
import Upload from "./Routes/Upload/Upload";

function App() {
  initialInvoke();
  return (
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
  );
}

export default App;
