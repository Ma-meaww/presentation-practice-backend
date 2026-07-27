import mongoose from "mongoose"

const scriptSchema = new mongoose.Schema(
  {
    slideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slide",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ["standard", "formal"],
      default: "standard"
    },
    isAiGenerated: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Script = mongoose.model("Script", scriptSchema)

export default Script