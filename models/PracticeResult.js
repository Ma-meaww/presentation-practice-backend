import mongoose from "mongoose"

const practiceResultSchema = new mongoose.Schema(
  {
    presentationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
      required: true
    },
    totalActualTime: {
      type: Number,
      required: true
    },
    totalTargetTime: {
      type: Number,
      required: true
    },
    overTimeSlideCount: {
      type: Number,
      default: 0
    },
    lastPracticedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const PracticeResult = mongoose.model("PracticeResult", practiceResultSchema)

export default PracticeResult