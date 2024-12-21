import mongoose from "mongoose";

const weatherLogSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
    },
    weather: {
      type: Object,
      required: true,
    },
    activity: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const WeatherLog =
  mongoose.models.WeatherLog || mongoose.model("WeatherLog", weatherLogSchema);

export default WeatherLog;
