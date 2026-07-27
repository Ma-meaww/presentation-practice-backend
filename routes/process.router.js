import ocrController from "../controllers/ocr.controller.js"
import aiController from "../controllers/ai.controller.js"
import processController from "../controllers/process.controller.js"
import checkMiddleware from "../middlewares/check.middleware.js"

const processRouter = (router) => {
  console.log("processRouter registered")

  /**
   * @swagger
   * /slides/{id}/ocr:
   *   post:
   *     summary: Run OCR for slide image
   *     tags:
   *       - Process
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     responses:
   *       200:
   *         description: OCR completed successfully
   *       400:
   *         description: Invalid slide ID or missing imagePath
   *       404:
   *         description: Slide not found
   */
  router.post(
    "/slides/:id/ocr",
    checkMiddleware("id"),
    ocrController.runOcr
  )

  /**
   * @swagger
   * /slides/{id}/generate-script:
   *   post:
   *     summary: Generate script from OCR text using AI
   *     tags:
   *       - Process
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               level:
   *                 type: string
   *                 enum:
   *                   - standard
   *                   - formal
   *                 example: standard
   *     responses:
   *       201:
   *         description: Script generated successfully
   *       400:
   *         description: Please run OCR before generating script or invalid level
   *       404:
   *         description: Slide not found
   */
  router.post(
    "/slides/:id/generate-script",
    checkMiddleware("id"),
    aiController.generateScript
  )

  /**
   * @swagger
   * /slides/{id}/process:
   *   post:
   *     summary: Run OCR and generate script for slide
   *     tags:
   *       - Process
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               level:
   *                 type: string
   *                 enum:
   *                   - standard
   *                   - formal
   *                 example: standard
   *     responses:
   *       200:
   *         description: Slide processed successfully
   *       400:
   *         description: Invalid slide ID or invalid level
   *       404:
   *         description: Slide not found
   */
  router.post(
    "/slides/:id/process",
    checkMiddleware("id"),
    processController.processSlide
  )
}

export default processRouter