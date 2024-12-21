// import { create } from "domain";
import mongoose from "mongoose";
import {Event} from "../types/activity";

const eventSchema = mongoose.Schema({
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
    Event:{
        type : Event ,
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

const EventAct = mongoose.models.event || mongoose.model("event", eventSchema);

export default EventAct;