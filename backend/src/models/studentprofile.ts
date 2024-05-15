import mongoose from "mongoose"

const studentProfileSchema = new mongoose.Schema({
    Enrollment: {type: String, unique: true},
    Name: {type: String, unique: true},

}, {strict: false, collection: "studentprofile"} )

export const StudentProfile = mongoose.model('studentprofile', studentProfileSchema);