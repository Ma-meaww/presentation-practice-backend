import Slide from "../models/Slide.js"
import Script from "../models/Script.js"

const slideService = {
  getSlidesByPresentationId: async (presentationId) => {
    return await Slide.find({ presentationId }).sort({ slideNo: 1 })
  },

  getSlideById: async (id) => {
    return await Slide.findById(id)
  },

  getPreviousSlide: async (presentationId, slideNo) => {
    return await Slide.findOne({
      presentationId,
      slideNo: { $lt: slideNo }
    }).sort({ slideNo: -1 })
  },

  createSlide: async (data) => {
    const slide = new Slide(data)
    return await slide.save()
  },

  updateSlide: async (id, data) => {
    return await Slide.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" }
    )
  },

  deleteSlide: async (id) => {
    await Script.deleteMany({ slideId: id })

    return await Slide.findByIdAndDelete(id)
  },

  getPreviousSlide: async (presentationId, slideNo) => {
    return await Slide.findOne({
      presentationId,
      slideNo: { $lt: slideNo }
    }).sort({ slideNo: -1 })
  }
}

export default slideService