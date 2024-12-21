// import { create } from "domain";
import mongoose from "mongoose";

const weatherLogSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        ref: "users"
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        ref: "users"
    },
    weather:{
        type : Object,
        required: true,
    },
    activity:{
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const weatherSchema = mongoose.models.weatherlog || mongoose.model("weatherlog", weatherLogSchema);

export default weatherSchema;