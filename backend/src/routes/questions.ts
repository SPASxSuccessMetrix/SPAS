import express, { Request, Response } from "express";
import { User } from "../models/User";
import { verifyJWT } from "../verify";
import { StudentProfile } from "../models/studentprofile";
import {exec} from 'child_process'
import { promisify } from 'util';
const execAsync = promisify(exec);

const router = express.Router();

router.post("/insert", verifyJWT, async (req: Request, res: Response) => {
  const { studentName, questionData, enrollment, gender, sec1Questions } =
    req.body;
  // const questions = [
  //   "classActivities",
  //   "excessiveSpeaking",
  //   "interaction",
  //   "teamWork",
  //   "distraction",
  //   "organizedNotes",
  //   "peerIrritation",
  //   "academicDemotivation",
  //   "creativeSkillRating",
  //   "alternativeProblemSolving",
  // ];

  try {
    let user: any = await User.findOne({ enrollment });
    if (!user) {
      return res.status(404).json("Student not found!");
    }

    const update: any = { ...sec1Questions, ...questionData };

    // questions.forEach((question, i) => {
    //   update[question] = questionData[i];
    // });

    const result = await User.updateOne(
      { enrollment: enrollment },
      { gender, ...update }
    );

    const pythonFile = 'python.py';
    const { stdout, stderr } = await execAsync(`python ${pythonFile}`);
    
    console.log(`Python script output: ${stdout}`);
    if (stderr) {
        console.error(`Error executing Python script: ${stderr}`);
    }

    return res.status(200).json({result, ai: stdout});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post(
  "/studentprofile",
  verifyJWT,
  async (req: Request, res: Response) => {
    const {
      studentName,
      enrollment,
      questionData,
      hackathonParticipated,
      competitionsParticipated,
    } = req?.body;

    const questionTags : string[] = [
      "Programming Languages", "Oops Concepts", "Logic building",

      "Communication",

      "Presentation",

      "Teamwork",
    ];

    const questions:any = {}

    questionTags.forEach((question, i) => {
        questions[question] = questionData[i];
    })

    try {
      const user = await StudentProfile.findOne({ Enrollment: enrollment });
      if (!user) {
        const studentProfile = new StudentProfile({
          Name: studentName,
          Enrollment: enrollment,
          ...questions,
          HackathonParticipated: Number(hackathonParticipated),
          CompetitionsParticipated: Number(competitionsParticipated),
        });
        await studentProfile.save();
        res.status(200).json({ message: "Form Submitted Successfully!" });
      }else{
        const resp = await StudentProfile.updateOne(
          {Enrollment: enrollment},
          {...questions, HackathonParticipated: Number(hackathonParticipated), CompetitionsParticipated: Number(competitionsParticipated)}
        )
        res.status(200).send({ message: "Form Submitted Successfully!" });
      }

    } catch (err) {
      res.status(400).send(err)
    }
  }
);

export default router;
