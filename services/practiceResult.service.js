import PracticeResult from "../models/PracticeResult.js"

const practiceResultService = {
  getPracticeResultByPresentationId: async (presentationId) => {
    return await PracticeResult.findOne({ presentationId })
  },

  createOrUpdatePracticeResult: async (presentationId, data) => {
    return await PracticeResult.findOneAndUpdate(
      { presentationId },
      {
        $set: {
          ...data,
          presentationId,
          lastPracticedAt: new Date()
        }
      },
      {
        returnDocument: "after",
        upsert: true
      }
    )
  },

  updatePracticeResult: async (id, data) => {
    return await PracticeResult.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" }
    )
  },

  deletePracticeResult: async (id) => {
    return await PracticeResult.findByIdAndDelete(id)
  }
}

export default practiceResultService