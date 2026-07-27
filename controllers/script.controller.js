import scriptService from "../services/script.service.js"

const scriptController = {
  getScriptsBySlideId: async (req, res) => {
    try {
      const slideId = req.params.slideId
      const scripts = await scriptService.getScriptsBySlideId(slideId)
      res.status(200).json(scripts)
    } catch (err) {
      console.log("Error fetching scripts:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  getScriptById: async (req, res) => {
    try {
      const scriptId = req.params.id
      const script = await scriptService.getScriptById(scriptId)
      if (!script) {
        return res.status(404).json({ message: "Script not found" })
      }
      res.status(200).json(script)
    } catch (err) {
      console.log("Error fetching script by ID:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  createScript: async (req, res) => {
    try {
      const newScript = await scriptService.createScript(req.body)
      res.status(201).json(newScript)
    } catch (err) {
      console.log("Error creating script:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  updateScript: async (req, res) => {
    try {
      const scriptId = req.params.id
      const updatedScript = await scriptService.updateScript(scriptId, req.body)
      if (!updatedScript) {
        return res.status(404).json({ message: "Script not found" })
      }
      res.status(200).json(updatedScript)
    } catch (err) {
      console.log("Error updating script:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  deleteScript: async (req, res) => {
    try {
      const scriptId = req.params.id
      const deletedScript = await scriptService.deleteScript(scriptId)
      if (!deletedScript) {
        return res.status(404).json({ message: "Script not found" })
      }
      res.status(200).json(deletedScript)
    } catch (err) {
      console.log("Error deleting script:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default scriptController