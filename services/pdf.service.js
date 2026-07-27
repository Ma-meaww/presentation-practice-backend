import { fromPath } from "pdf2pic"
import fs from "fs"
import path from "path"

const pdfService = {
  convertPdfToImages: async (pdfPath, presentationId) => {
    const inputPath = path.resolve(pdfPath)

    const outputDir = path.resolve(
      "uploads",
      "slides",
      String(presentationId)
    )

    if (!fs.existsSync(inputPath)) {
      throw new Error(`PDF file not found: ${inputPath}`)
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    console.log("--- เริ่มแปลง PDF ---")
    console.log("PDF input:", inputPath)
    console.log("Output directory:", outputDir)

    try {
      const convert = fromPath(inputPath, {
        density: 120,
        saveFilename: "slide",
        savePath: outputDir,
        format: "jpeg",
        width: 1280,
        height: 960,
      })

      const results = await convert.bulk(-1, {})

      console.log("--- แปลง PDF สำเร็จ ---")
      console.log("จำนวนหน้า:", results.length)

      return results.map((result, index) => ({
        slideNo: index + 1,
        imagePath: result.path
          .split(path.sep)
          .join("/"),
      }))
    } catch (error) {
      console.error("PDF conversion failed:", error)

      throw new Error(
        `Unable to convert PDF: ${error.message}`
      )
    }
  },
}

export default pdfService