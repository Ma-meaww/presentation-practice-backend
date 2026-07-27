import slideService from "../services/slide.service.js"
import scriptService from "../services/script.service.js"
import ocrService from "../services/ocr.service.js"
import aiService from "../services/ai.service.js"

const processController = {
  processSlide: async (req, res) => {
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

      let ocrResult = await ocrService.runImageOcr(slide)

      if (!ocrResult.extractedTextClean && req.body?.extractedTextClean) {
        ocrResult = await ocrService.runMockOcr(slide, req.body)
      }

      const updatedSlide = await slideService.updateSlide(slideId, ocrResult)

      const slideText =
        updatedSlide.extractedTextClean ||
        updatedSlide.extractedTextRaw

      if (!slideText) {
        return res.status(400).json({
          message: "No slide text found"
        })
      }

      const previousSlide = await slideService.getPreviousSlide(
        updatedSlide.presentationId,
        updatedSlide.slideNo
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

      res.status(200).json({
        message: "Slide processed successfully",
        source: aiResult.source,
        slide: updatedSlide,
        script: newScript
      })
    } catch (err) {
      console.log("Error processing slide:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default processController