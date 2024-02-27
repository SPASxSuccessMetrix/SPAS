import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({}, {strict: false})

export const Marks = mongoose.model('marks', marksSchema)
