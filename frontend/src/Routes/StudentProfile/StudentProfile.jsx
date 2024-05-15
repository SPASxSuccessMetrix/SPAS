/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import styles from "./studentprofile.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { url } from "../../api";
import Slider from "@mui/material/Slider";

import { studentProfileQuestions as questions } from "../../../data";

const StudentProfile = () => {
  const radioValues = [1, 2, 3, 4, 5];

  const [studentName, setStudentName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [questionData, setQuestionData] = useState({});
  const [hackathonParticipated, setHackathonParticipated] = useState(0);
  const [competitionsParticipated, setCompetitionsParticipated] = useState(0);


  const submitHandler = async () => {
    const body = {
      studentName,
      enrollment: enrollment.toUpperCase(),
      questionData,
      hackathonParticipated,
      competitionsParticipated
    };

    if (enrollment === "") {
      alert("Please enter your enrollment Number!");
      return;
    } else if (studentName === "") {
      alert("Please enter your name!");
      return;
    } 


    try {
      const response = await axios.post(`${url}/questions/studentprofile`, body, {
        withCredentials: true,
      });
      alert("Data submitted successfully!");
    } catch (err) {
      console.log(err)
      alert(err.response.data);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img className={styles.logo} src="logo2.svg" alt="" />
        <h2>SPAS</h2>
      </div>
      <div className={styles.right}>
        <div className={styles.upper}>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <label htmlFor="">Student's Name</label>
              <input
                onChange={(e) => setStudentName(e.target.value)}
                type="text"
                placeholder="Student's Name"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="">Student's Enrollment No.</label>
              <input
                onChange={(e) => setEnrollment(e.target.value)}
                type="text"
                placeholder="Enrollment no."
              />
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div className={styles.lower}>
          {questions.map((question, i) => {
            return (
              <div className={styles.questions} key={i}>
                <p>Q. {question}</p>
                <Slider
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      [i]: e.target.value,
                    })
                  }
                />
              </div>
            );
          })}
          <div className={styles.secondQuestion}>
            <div>
              <p>Hackathons Participated</p>
              <input value={hackathonParticipated} onChange={(e) => !(e.target.value <= 0 || e.target.value >=6) && setHackathonParticipated(e.target.value)} type="number" />
            </div>
            <div>
              <p>Competitions Participated</p>
              <input value={competitionsParticipated} onChange={(e) => !(e.target.value <= 0 || e.target.value >=6) && setCompetitionsParticipated(e.target.value)} type="number" />
            </div>
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <Button
            onClick={submitHandler}
            className={styles.signupButton}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
