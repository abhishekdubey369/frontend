// import { create } from "domain";
import mongoose from "mongoose";
import { Activity } from "../types/activity";

const activitySchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    activity:{
        type : Activity ,
        required: [true, "Activity is required"],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
});

const Activity = mongoose.models.activity || mongoose.model("activity", activitySchema);

export default Activity;