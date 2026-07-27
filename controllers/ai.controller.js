import slideService from "../services/slide.service.js"
import scriptService from "../services/script.service.js"
import aiService from "../services/ai.service.js"

const aiController = {
  generateScript: async (req, res) => {
    try {
      const slideId = req.params.id
      const level = req.body?.level || "standard"

      if (!["standard", "formal"].includes(level)) {
        return res.status(400).json({
          message: "Level must be standard or formal"
        })
      }

      const slide = await slideService.getSlideById(slideId)

      if (!slide) {
        return res.status(404).json({ message: "Slide not found" })
      }

      const slideText = slide.extractedTextClean || slide.extractedTextRaw

      if (!slideText) {
        return res.status(400).json({
          message: "Please run OCR before generating script"
        })
      }

      const previousSlide = await slideService.getPreviousSlide(
        slide.presentationId,
        slide.slideNo
      )

      const previousText =
        previousSlide?.extractedTextClean ||
        previousSlide?.extractedTextRaw ||
        ""

      const aiResult = await aiService.generateScript({
        slideText,
        previousText,
        level
      })

      const newScript = await scriptService.createScript({
        slideId,
        content: aiResult.content,
        level,
        isAiGenerated: aiResult.source === "ollama"
      })

      res.status(201).json({
        message: "Script generated successfully",
        source: aiResult.source,
        data: newScript
      })
    } catch (err) {
      console.log("Error generating script:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default aiController