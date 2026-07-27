import slideService from "../services/slide.service.js"
import pdfService from "../services/pdf.service.js"

const uploadController = {
  uploadPdf: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No PDF file uploaded"
        })
      }
 
      const filePath = req.file.path.replaceAll("\\", "/")
 
      res.status(200).json({
        message: "PDF uploaded successfully",
        fileName: req.file.filename,
        filePath: filePath
      })
    } catch (err) {
      console.log("Error uploading PDF:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  uploadSlideImages: async (req, res) => {
    try {
      const presentationId = req.params.presentationId

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "No slide images uploaded"
        })
      }

      const existingSlides = await slideService.getSlidesByPresentationId(presentationId)
      const startSlideNo = existingSlides.length + 1

      const createdSlides = []

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        const imagePath = file.path.replaceAll("\\", "/")

        const slide = await slideService.createSlide({
          presentationId,
          slideNo: startSlideNo + i,
          imagePath,
          ocrStatus: "pending",
          targetTime: Number(req.body.targetTime) || 60
        })

        createdSlides.push(slide)
      }

      res.status(201).json({
        message: "Slide images uploaded and slides created successfully",
        count: createdSlides.length,
        data: createdSlides
      })
    } catch (err) {
      console.log("Error uploading slide images:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  // upload.controller.js

  uploadPdfAndCreateSlides: async (req, res) => {
   
    try {
      const presentationId = req.params.presentationId;
      
      if (!req.file) {
       
        return res.status(400).json({ message: "No PDF file uploaded" });
      }
      // 1. แปลง PDF เป็นรูปภาพ
      const pdfPath = req.file.path.replaceAll("\\", "/");
      
      const convertedSlides = await pdfService.convertPdfToImages(pdfPath, presentationId);

      // 2. เช็คจำนวนสไลด์ที่มีอยู่เดิม
      const existingSlides = await slideService.getSlidesByPresentationId(presentationId);
      let startSlideNo = existingSlides.length + 1;

      const createdSlides = [];
      // 3. ใช้ for...of เพื่อให้แน่ใจว่าบันทึกเสร็จทีละตัว
      for (let i = 0; i < convertedSlides.length; i++) {
        const slideData = convertedSlides[i];
        const slide = await slideService.createSlide({
          presentationId,
          slideNo: startSlideNo + i,
          imagePath: slideData.imagePath,
          ocrStatus: "pending",
          targetTime: Number(req.body.targetTime) || 60
        });
        createdSlides.push(slide);
      }

      console.log("บันทึกทุกอย่างสำเร็จ!");
      // 4. ส่ง Response กลับไป (ถ้ามาถึงตรงนี้ Flutter จะได้รับ isSuccess = true)
      res.status(201).json({
        message: "Converted and created successfully",
        count: createdSlides.length,
        data: createdSlides
      });
    } catch (err) {
      console.error("CRITICAL ERROR:", err); // ดูใน Console ว่ามันพ่น Error อะไรออกมา
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  }
}

export default uploadController