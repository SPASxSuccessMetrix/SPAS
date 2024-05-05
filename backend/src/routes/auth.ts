import express, { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomRequestVerify, verifyJWT } from "../verify";

const router = express.Router();

const secretKey: string | undefined = process.env.jwt_secret;

router.post("/register", async (req: Request, res: Response) => {
  const { name, email, enrollment, password } = req.body;
  if (!secretKey) {
    return "Secret Key is missing!";
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      name,
      email,
      enrollment,
      password: hashedPassword,
    };
    const newUser = new User(payload);
    const response = await newUser.save();
    const token = jwt.sign({ name, email }, secretKey, { expiresIn: "7d" });
    res.status(200).cookie("JWT", token, { httpOnly: true }).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!secretKey) {
      return "Secret Key is missing!";
    }
    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const name = user?.name;
    const validPassword = await bcrypt.compare(password, user?.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const token = jwt.sign({ name, email }, secretKey, { expiresIn: "7d" });
    res.cookie("JWT", token, { httpOnly: true });
    res.status(200).send("Logged in Successfully!");
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("JWT", { httpOnly: true });
  res.status(200).json("Logout successful!");
});

router.get("/me", verifyJWT, async (req: CustomRequestVerify, res: Response) => {
  try{
    const user = await User.findOne({name: req?.user});
    res.status(200).send(user)
  }catch(err){
    res.status(400).send(err)
  }
});

export default router;
