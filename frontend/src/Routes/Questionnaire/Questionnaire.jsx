/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import styles from "./questionnaire.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { url } from "../../api";

import { learningPreferences, questions } from "../../../data";

const Questionnaire = () => {


  const radioValues = [1,2,3,4,5];



  const [studentName, setStudentName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [gender, setGender] = useState("")
  const [questionData, setQuestionData] = useState({})
  const [sec1Questions, setSec1Questions] = useState({})


  const submitHandler = async () => {
    const body = {
      studentName,
      enrollment: enrollment.toUpperCase(),
      gender,
      sec1Questions,
      questionData
    }

    if(enrollment === ""){
      alert("Please enter your enrollment Number!")
      return
    }else if(studentName === ""){
      alert("Please enter your name!")
      return
    }else if(gender === ""){
      alert("Please select your gender!")
      return
    }

    const sec1Keys = Object.keys(sec1Questions);
    const questionDataKeys = Object.keys(questionData);
    if(sec1Keys.length !== learningPreferences.length || questionDataKeys.length !== questions.length){
      alert("Please Select All the Questions!")
      return
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
          <div className={styles.inputContainer}>
            <div className={styles.input}>
            <label htmlFor="">Student's Name</label>
            <input onChange={(e) => setStudentName(e.target.value)} type="text" placeholder="Student's Name" />
            </div>
            <div className={styles.input}>
            <label htmlFor="">Student's Enrollment No.</label>
            <input onChange={(e) => setEnrollment(e.target.value)} type="text" placeholder="Enrollment no." />
            </div>
            <div className={styles.input}>
              <label >Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} >
                <option >Select your gender</option>
                <option >Female</option>
                <option >Male</option>
                <option >Non Binary</option>
                <option >Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
 {/* Section 2 */}
        <div className={styles.section1}>
          {
            learningPreferences.map((item) => {
              return(
                <div className={styles.sec1Questions} key={item?.id}>
                  <p>{item?.question}</p>
                  <select onChange={(e) => setSec1Questions({...sec1Questions, [item.question]: e.target.value})}>
                    {
                      item?.options?.map((option) => {
                        return <option>{option}</option>
                      })
                    }
                  </select>
                </div>
              )
            })
          }
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
