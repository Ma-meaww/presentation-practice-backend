import presentationService from "../services/presentation.service.js"

const presentationController = {
  getAllPresentations: async (req, res) => {
    try {
      const userId = req.user.userId
      const presentations = await presentationService.getAllPresentations(userId)
      res.status(200).json(presentations)
    } catch (err) {
      console.log("Error fetching presentations:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  getPresentationById: async (req, res) => {
    try {
      const presentationId = req.params.id
      const presentation = await presentationService.getPresentationById(presentationId)
      if (!presentation) {
        return res.status(404).json({ message: "Presentation not found" })
      }
      res.status(200).json(presentation)
    } catch (err) {
      console.log("Error fetching presentation by ID:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  createPresentation: async (req, res) => {
    try {
      const data = {
        ...req.body,
        userId: req.user.userId
      }

      const newPresentation = await presentationService.createPresentation(data)

      res.status(201).json(newPresentation)
    } catch (err) {
      console.log("Error creating presentation:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  updatePresentation: async (req, res) => {
    try {
      const presentationId = req.params.id
      const updatedPresentation = await presentationService.updatePresentation(
        presentationId,
        req.body
      )
      if (!updatedPresentation) {
        return res.status(404).json({ message: "Presentation not found" })
      }
      res.status(200).json(updatedPresentation)
    } catch (err) {
      console.log("Error updating presentation:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  deletePresentation: async (req, res) => {
    try {
      const presentationId = req.params.id
      const deletedPresentation = await presentationService.deletePresentation(presentationId)
      if (!deletedPresentation) {
        return res.status(404).json({ message: "Presentation not found" })
      }
      res.status(200).json(deletedPresentation)
    } catch (err) {
      console.log("Error deleting presentation:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default presentationController