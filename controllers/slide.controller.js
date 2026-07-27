import slideService from "../services/slide.service.js"

const slideController = {
  getSlidesByPresentationId: async (req, res) => {
    try {
      const presentationId = req.params.presentationId
      const slides = await slideService.getSlidesByPresentationId(presentationId)
      res.status(200).json(slides)
    } catch (err) {
      console.log("Error fetching slides:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  getSlideById: async (req, res) => {
    try {
      const slideId = req.params.id
      const slide = await slideService.getSlideById(slideId)
      if (!slide) {
        return res.status(404).json({ message: "Slide not found" })
      }
      res.status(200).json(slide)
    } catch (err) {
      console.log("Error fetching slide by ID:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  createSlide: async (req, res) => {
    try {
      const newSlide = await slideService.createSlide(req.body)
      res.status(201).json(newSlide)
    } catch (err) {
      console.log("Error creating slide:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  updateSlide: async (req, res) => {
    try {
      const slideId = req.params.id
      const updatedSlide = await slideService.updateSlide(slideId, req.body)
      if (!updatedSlide) {
        return res.status(404).json({ message: "Slide not found" })
      }
      res.status(200).json(updatedSlide)
    } catch (err) {
      console.log("Error updating slide:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  deleteSlide: async (req, res) => {
    try {
      const slideId = req.params.id
      const deletedSlide = await slideService.deleteSlide(slideId)
      if (!deletedSlide) {
        return res.status(404).json({ message: "Slide not found" })
      }
      res.status(200).json(deletedSlide)
    } catch (err) {
      console.log("Error deleting slide:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default slideController