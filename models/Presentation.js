import mongoose from "mongoose";

const presentationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    totalTargetTime: {
      type: Number,
      default: 0
    },
    filePath: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Presentation = mongoose.model("Presentation", presentationSchema);

export default Presentation;