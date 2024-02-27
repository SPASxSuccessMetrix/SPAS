/* eslint-disable react/no-unescaped-entities */
//Wow

import { useState } from "react";
import styles from "./questionnaire.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { url } from "../../api";
import TopBar from "../../Components/Shared/TopBar/TopBar";
import SideBar from "../../Components/Shared/SideBar/SideBar";

const Questionnaire = () => {
  // let questions = [
  //   "Student engages actively in classroom activities",
  //   "Student prefers not to speak excessively during lessons",
  //   "Student interacts with various classmates during group activities",
  //   "Student tends to be reserved and quiet in class",
  //   "Student shows empathy and understanding towards classmates",
  //   "Student understands the emotions of peers",
  //   "Student doesn't actively seek interactions with fellow students",
  //   "Student is attentive to and concerned about classmates' concerns",
  //   "Student completes assignments and tasks promptly",
  //   "Student tends to keep classroom materials organized",
  //   "Student prefers a structured and orderly classroom environment",
  //   "Student occasionally struggles with keeping classroom materials organized",
  //   "Student experiences frequent changes in mood during class",
  //   "Student remains relaxed and composed in classroom situations",
  //   "Student rarely experiences feelings of sadness while at school",
  //   "Student is sensitive and occasionally becomes upset during lessons",
  //   "Student demonstrates creativity and imagination in assigned work",
  //   "Student exhibits interest in abstract and complex academic concepts",
  //   "Student finds it challenging to grasp abstract academic concepts",
  //   "Student struggles to generate imaginative ideas for school projects",
  // ];

  let questions = [
    "Student engages actively in classroom activities",
    "Student prefers not to speak excessively during lessons",
    "Student interacts with various classmates during group activities"
  ];

  const radioValues = [1,2,3,4,5];

  const [studentName, setStudentName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [questionData, setQuestionData] = useState({})

  const submitHandler = async () => {
    const body = {
      studentName,
      enrollment: enrollment.toUpperCase(),
      questionData
    }
    try{
      const response = await axios.post(`${url}/questions/insert`, body, {withCredentials: true});
      alert("Data submitted successfully!")
    }catch(err){
      alert(err.response.data)
    }
  }



  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img className={styles.logo} src="logo2.svg" alt="" />
        <h2>SPAS</h2>
      </div>
      <div className={styles.right}>
        <div className={styles.upper}>
          {/* <select name="studentName">
            <option value="" disabled selected>
              Student's Name
            </option>
            <option value="aryan">Aryan Saxena</option>
            <option value="krishnaprasad">Krishnaprasad Awala</option>
            <option value="gunjan">Gunjan Sharma</option>
            <option value="amaan">Amaan Shaikh</option>
            <option value="gagandeep">Gagandeep Bhatia</option>
            <option value="tushar">Tushar Kumar Tailor</option>
          </select> */}
          {/* <div className={styles.inputs}>
            <textarea rows="4" cols="50">
              Traits
            </textarea>
            <textarea rows="4" cols="50">
              Achievements
            </textarea>
          </div> */}
          <div className={styles.inputContainer}>
            <div className={styles.input}>
            <label htmlFor="">Student's Name</label>
            <input onChange={(e) => setStudentName(e.target.value)} type="text" placeholder="Student's Name" />
            </div>
            <div className={styles.input}>
            <label htmlFor="">Student's Enrollment No.</label>
            <input onChange={(e) => setEnrollment(e.target.value)} type="text" placeholder="Enrollment no." />
            </div>
          </div>
        </div>
        <div className={styles.lower}>
          {questions.map((question, i) => {
            return (
              <div className={styles.questions} key={i}>
                <p>Q. {question}</p>
                <div className={styles.radios}>
                  {
                    radioValues.map((value) => {
                      return (
                        <input key={value} onChange={() => setQuestionData({...questionData, [i]: value})} type="radio" value={value} name={`question-${i}`}  />
                      )
                    })
                  }
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.buttonDiv}>
        <Button onClick={submitHandler} className={styles.signupButton} variant="contained" >Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
