import express, { Request, Response } from "express";
import { User } from "../models/User";
import { verifyJWT } from "../verify";

const router = express.Router();

router.post("/insert", verifyJWT, async (req: Request, res: Response) => {
  const { studentName, questionData, enrollment, gender, sec1Questions } =
    req.body;
  const questions = [
    "classActivities",
    "excessiveSpeaking",
    "interaction",
    "teamWork",
    "distraction",
    "organizedNotes",
    "peerIrritation",
    "academicDemotivation",
    "creativeSkillRating",
    "alternativeProblemSolving",
  ];

  try {
    let user: any = await User.findOne({ enrollment });
    if (!user) {
      return res.status(404).json("Student not found!");
    }

    const update: any = { ...sec1Questions };

    questions.forEach((question, i) => {
      update[question] = questionData[i];
    });

    console.log(update);

    const result = await User.updateOne(
      { enrollment: enrollment },
      { gender, ...update }
    );
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
