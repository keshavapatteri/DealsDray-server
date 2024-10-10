import mongoose from "mongoose";
// Define the Employee Schema
const employeeSchema = new mongoose.Schema({
   
    Image: {
        type: String, // URL or path to the image
        required: false
    },
    Name: {
        type: String,
        required: true
    },                 
    Email: {
        type: String,
        required: true,
        unique: true,
        
    },
    Mobile: {
        type: String,
        required: true,
        
    },
    Designation: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Change as necessary
        required: true
    },
    Course: {
        type: String,
        required: false
    },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
    Createdate: {
        type: Date,
        default: Date.now
    }
});


export const Employee = mongoose.model("Employee", employeeSchema);