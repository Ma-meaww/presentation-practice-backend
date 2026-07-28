import Presentation from "../models/Presentation.js"
import Slide from "../models/Slide.js"
import Script from "../models/Script.js"
import PracticeResult from "../models/PracticeResult.js"

const presentationService = {
  getAllPresentations: async (userId) => {
    return await Presentation.find({ userId }).sort({ createdAt: -1 })
  },

  getPresentationById: async (id) => {
    return await Presentation.findById(id)
  },

  createPresentation: async (data) => {
    const presentation = new Presentation(data)
    return await presentation.save()
  },

  updatePresentation: async (id, data) => {
    return await Presentation.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" }
    )
  },

  deletePresentation: async (id) => {
    const slides = await Slide.find({ presentationId: id })
    const slideIds = slides.map((slide) => slide._id)

    await Script.deleteMany({
      slideId: { $in: slideIds }
    })

    await Slide.deleteMany({
      presentationId: id
    })

    await PracticeResult.deleteMany({
      presentationId: id
    })

    return await Presentation.findByIdAndDelete(id)
  }
}

export default presentationService