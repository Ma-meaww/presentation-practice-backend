import fs from "fs"
import path from "path"
import { pdf } from "pdf-to-img"

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

    fs.mkdirSync(outputDir, { recursive: true })

    console.log("--- เริ่มแปลง PDF ---")
    console.log("PDF input:", inputPath)
    console.log("Output directory:", outputDir)

    let document

    try {
      document = await pdf(inputPath, {
        scale: 2,
      })

      const convertedSlides = []
      const batchId = Date.now()

      let pageNumber = 1

      for await (const imageBuffer of document) {
        const fileName = `${batchId}-slide-${pageNumber}.png`
        const outputPath = path.join(outputDir, fileName)

        await fs.promises.writeFile(outputPath, imageBuffer)

        const relativePath = path
          .relative(process.cwd(), outputPath)
          .split(path.sep)
          .join("/")

        convertedSlides.push({
          slideNo: pageNumber,
          imagePath: relativePath,
        })

        console.log(`แปลงหน้าที่ ${pageNumber} สำเร็จ`)
        pageNumber++
      }

      if (convertedSlides.length === 0) {
        throw new Error("No pages were found in the PDF")
      }

      console.log(
        `--- แปลง PDF สำเร็จ ${convertedSlides.length} หน้า ---`
      )

      return convertedSlides
    } catch (error) {
      console.error("PDF conversion failed:", error)

      throw new Error(
        `Unable to convert PDF: ${
          error instanceof Error
            ? error.message
            : "Unknown PDF conversion error"
        }`
      )
    } finally {
      if (document) {
        await document.destroy()
      }
    }
  },
}

export default pdfService