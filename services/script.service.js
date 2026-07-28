import Script from "../models/Script.js"

const scriptService = {
  getScriptsBySlideId: async (slideId) => {
    return await Script.find({ slideId })
  },

  getScriptById: async (id) => {
    return await Script.findById(id)
  },

  createScript: async (data) => {
    const script = new Script(data)
    return await script.save()
  },

  updateScript: async (id, data) => {
    return await Script.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" }
    )
  },

  deleteScript: async (id) => {
    return await Script.findByIdAndDelete(id)
  }
}

export default scriptService