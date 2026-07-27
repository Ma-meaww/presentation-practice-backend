import multer from "multer"
import fs from "fs"
import path from "path"

const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join("uploads", folder)

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
      }

      cb(null, uploadPath)
    },

    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname
      cb(null, uniqueName)
    }
  })
}

const pdfFileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase() === '.pdf';
  const mimetype = file.mimetype === "application/pdf";

  if (extname || mimetype) {
    cb(null, true);
  } else {
    cb(new Error(`Only PDF files are allowed! (Found: ${file.mimetype})`), false);
  }
}

const imageFileFilter = (req, file, cb) => {
  // 1. กำหนดนามสกุลที่อนุญาต
  const filetypes = /jpeg|jpg|png|gif/;

  // 2. เช็กนามสกุลไฟล์จาก originalname (วิธีนี้ชัวร์ที่สุดสำหรับไฟล์ที่ส่งจาก mobile)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // 3. เช็ก mimetype (ใส่ไว้กันเหนียว)
  const mimetype = filetypes.test(file.mimetype);

  // ถ้าอย่างใดอย่างหนึ่งผ่าน ให้ไปต่อ
  if (extname || mimetype) {
    return cb(null, true);
  } else {
    // พ่น Error ออกไปดูเลยว่าจริงๆ แล้วมันเห็นเป็นอะไร
    cb(new Error(`Only image files are allowed! (Found: ${file.originalname} / ${file.mimetype})`), false);
  }
}
export const uploadPdf = multer({
  storage: createStorage("presentations"),
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})
export const uploadSlideImages = multer({
  storage: createStorage("slides"),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})