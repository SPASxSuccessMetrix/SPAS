import express, {Request, Response} from "express";
import { Marks } from "../models/marks";
import { verifyJWT } from "../verify";
const router = express.Router();

router.post("/insert", verifyJWT ,async (req: Request, res: Response) => {
    const data: any[] = req.body.data;
    try{
        for(const item of data){
            const existingItem = await Marks.findOne(item);
            if (!existingItem) {
                const marks = new Marks(item);
                await marks.save();
            }
        }
        res.status(200).json({message: "inserted Successfully"})
    }catch(err){
        res.status(400).json(err)
    }

})


export default router;