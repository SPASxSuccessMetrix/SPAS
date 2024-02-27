import express, { Request, Response } from "express";
import { User } from "../models/User";
import { verifyJWT } from "../verify";

const router = express.Router();

router.post("/insert", verifyJWT, async (req: Request, res: Response) => {
  const { studentName, questionData, enrollment } = req.body;
  const questions = ["classActivities", "excessiveSpeaking", "interaction"];

  try {
    // let user: any = await User.findOne({ enrollment });
    // if (!user) {
    //     return res.status(404).json("Student not found!");
    // }

    // questions.forEach((question, i) => {
    //     console.log(question)
    //     user[question] = questionData[i];
    // });
    // console.log(user)

    // await user.save();

    let user: any = await User.findOne({ enrollment });
    if (!user) {
      return res.status(404).json("Student not found!");
    }

    const update: any = {};

    questions.forEach((question, i) => {
      update[question] = questionData[i];
    });

    const result = await User.updateOne({ enrollment: enrollment }, update);
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
