import practiceResultService from "../services/practiceResult.service.js"

const practiceResultController = {
  getPracticeResultByPresentationId: async (req, res) => {
    try {
      const presentationId = req.params.presentationId
      const practiceResult =
        await practiceResultService.getPracticeResultByPresentationId(
          presentationId
        )
      if (!practiceResult) {
        return res.status(404).json({ message: "Practice result not found" })
      }
      res.status(200).json(practiceResult)
    } catch (err) {
      console.log("Error fetching practice result:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  createOrUpdatePracticeResult: async (req, res) => {
    try {
      const presentationId = req.params.presentationId
      const practiceResult =
        await practiceResultService.createOrUpdatePracticeResult(
          presentationId,
          req.body
        )
      res.status(200).json(practiceResult)
    } catch (err) {
      console.log("Error saving practice result:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  updatePracticeResult: async (req, res) => {
    try {
      const practiceResultId = req.params.id
      const updatedPracticeResult =
        await practiceResultService.updatePracticeResult(
          practiceResultId,
          req.body
        )
      if (!updatedPracticeResult) {
        return res.status(404).json({ message: "Practice result not found" })
      }
      res.status(200).json(updatedPracticeResult)
    } catch (err) {
      console.log("Error updating practice result:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  deletePracticeResult: async (req, res) => {
    try {
      const practiceResultId = req.params.id
      const deletedPracticeResult =
        await practiceResultService.deletePracticeResult(practiceResultId)
      if (!deletedPracticeResult) {
        return res.status(404).json({ message: "Practice result not found" })
      }
      res.status(200).json(deletedPracticeResult)
    } catch (err) {
      console.log("Error deleting practice result:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default practiceResultController