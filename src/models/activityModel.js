import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: [true, "User is required"],
    },
    activity:{
        type : Object,
        required: [true, "Activity is required"],
    },
},{
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

const Activity = mongoose.models.activity || mongoose.model("activity", activitySchema);

export default Activity;