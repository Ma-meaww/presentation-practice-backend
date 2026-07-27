import { fromPath } from "pdf2pic"
import fs from "fs"
import path from "path"

const pdfService = {
  convertPdfToImages: async (pdfPath, presentationId) => {
    const outputDir = path.join("uploads", "slides", String(presentationId))

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    console.log("--- เริ่มแปลง PDF ---")

    const convert = fromPath(pdfPath, {
      density: 150,
      saveFilename: "slide",
      savePath: outputDir,
      format: "jpeg",
      width: 1280,
      height: 960,
    })

    const results = await convert.bulk(-1, {})
    console.log("--- แปลง PDF สำเร็จ ---", results)

    return results.map((result, index) => ({
      slideNo: index + 1,
      imagePath: result.path.split(path.sep).join("/"),
    }))
  },
}

export default pdfService