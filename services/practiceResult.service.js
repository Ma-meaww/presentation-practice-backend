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
        new: true,
        upsert: true
      }
    )
  },

  updatePracticeResult: async (id, data) => {
    return await PracticeResult.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    )
  },

  deletePracticeResult: async (id) => {
    return await PracticeResult.findByIdAndDelete(id)
  }
}

export default practiceResultService