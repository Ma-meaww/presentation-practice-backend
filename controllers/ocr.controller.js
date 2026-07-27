import slideService from "../services/slide.service.js"
import ocrService from "../services/ocr.service.js"

const ocrController = {
  runOcr: async (req, res) => {
    try {
      console.log("RUN OCR HIT:", req.params.id)

      const slideId = req.params.id

      const slide = await slideService.getSlideById(slideId)

      if (!slide) {
        return res.status(404).json({
          message: "Slide not found"
        })
      }

      if (!slide.imagePath) {
        return res.status(400).json({
          message: "Slide imagePath is required for OCR"
        })
      }

      const ocrResult = await ocrService.runImageOcr(slide)

      const updatedSlide = await slideService.updateSlide(slideId, ocrResult)

      if (ocrResult.ocrStatus === "failed") {
        return res.status(500).json({
          message: "OCR failed",
          error: ocrResult.error || "OCR returned empty text",
          data: updatedSlide
        })
      }

      return res.status(200).json({
        message: "OCR completed successfully",
        data: updatedSlide
      })
    } catch (err) {
      console.log("Error running OCR:", err)

      return res.status(500).json({
        message: "Internal server error",
        error: err.message
      })
    }
  }
}

export default ocrController