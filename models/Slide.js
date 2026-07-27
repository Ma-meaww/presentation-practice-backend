import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
  {
    presentationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
      required: true
    },
    slideNo: {
      type: Number,
      required: true
    },
    imagePath: {
      type: String
    },
    extractedTextRaw: {
      type: String
    },
    extractedTextClean: {
      type: String
    },
    ocrStatus: {
      type: String,
      enum: ["pending", "processing", "success", "failed"],
      default: "pending"
    },
    targetTime: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Slide = mongoose.model("Slide", slideSchema);

export default Slide;