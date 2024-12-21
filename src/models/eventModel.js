import mongoose, { Schema } from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is required"],
    },
    date: {
        type: Date,
        required: [true, "Event date is required"],
    },
    ticketPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    invitedFriends: {
        type: [String],
        default: [],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"],
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    }
});

const EventAct = mongoose.models.event || mongoose.model("event", eventSchema);

export default EventAct;
