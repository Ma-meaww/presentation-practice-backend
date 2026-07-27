import uploadController from "../controllers/upload.controller.js"
import { uploadPdf, uploadSlideImages } from "../middlewares/upload.middleware.js"
import checkMiddleware from "../middlewares/check.middleware.js"

const uploadRouter = (router) => {
  /**
   * @swagger
   * /upload/pdf:
   *   post:
   *     summary: Upload PDF file only
   *     tags:
   *       - Upload
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - file
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: PDF file
   *     responses:
   *       200:
   *         description: PDF uploaded successfully
   *       400:
   *         description: No PDF file uploaded
   */
  router.post(
    "/upload/pdf",
    uploadPdf.single("file"),
    uploadController.uploadPdf
  )
  /**
   * @swagger
   * /presentations/{presentationId}/slides/upload-images:
   *   post:
   *     summary: Upload multiple slide images and create slides
   *     tags:
   *       - Upload
   *     parameters:
   *       - in: path
   *         name: presentationId
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of presentation
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - files
   *             properties:
   *               files:
   *                 type: array
   *                 items:
   *                   type: string
   *                   format: binary
   *                 description: Multiple slide image files
   *               targetTime:
   *                 type: number
   *                 example: 60
   *                 description: Target time per slide in seconds
   *     responses:
   *       201:
   *         description: Slide images uploaded and slides created successfully
   *       400:
   *         description: Invalid presentation ID or no files uploaded
   */
  router.post(
    "/presentations/:presentationId/slides/upload-images",
    checkMiddleware("presentationId"),
    uploadSlideImages.array("files", 20),
    uploadController.uploadSlideImages
  )

  /**
   * @swagger
   * /presentations/{presentationId}/slides/from-pdf:
   *   post:
   *     summary: Upload PDF, convert pages to images, and create slides
   *     tags:
   *       - Upload
   *     parameters:
   *       - in: path
   *         name: presentationId
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of presentation
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - file
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: PDF file
   *               targetTime:
   *                 type: number
   *                 example: 60
   *                 description: Target time per slide in seconds
   *     responses:
   *       201:
   *         description: PDF uploaded, converted to images, and slides created successfully
   *       400:
   *         description: Invalid presentation ID or no PDF uploaded
   */
  router.post(
    "/presentations/:presentationId/slides/from-pdf",
    checkMiddleware("presentationId"),
    uploadPdf.single("file"),
    uploadController.uploadPdfAndCreateSlides
  )
}

export default uploadRouter