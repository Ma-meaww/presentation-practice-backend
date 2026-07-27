import slideController from "../controllers/slide.controller.js"
import checkMiddleware from "../middlewares/check.middleware.js"

const slideRouter = (router) => {
  /**
   * @swagger
   * /presentations/{presentationId}/slides:
   *   get:
   *     summary: Get slides by presentation ID
   *     tags:
   *       - Slide
   *     parameters:
   *       - in: path
   *         name: presentationId
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of presentation
   *     responses:
   *       200:
   *         description: List of slides in the presentation
   */
  router.get(
    "/presentations/:presentationId/slides",
    checkMiddleware("presentationId"),
    slideController.getSlidesByPresentationId
  )

  /**
   * @swagger
   * /slides/{id}:
   *   get:
   *     summary: Get slide by ID
   *     tags:
   *       - Slide
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     responses:
   *       200:
   *         description: Slide detail
   *       404:
   *         description: Slide not found
   */
  router.get(
    "/slides/:id",
    checkMiddleware("id"),
    slideController.getSlideById
  )

  /**
   * @swagger
   * /slides:
   *   post:
   *     summary: Create slide
   *     tags:
   *       - Slide
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - presentationId
   *               - slideNo
   *             properties:
   *               presentationId:
   *                 type: string
   *                 example: 69eeba525fcb0944255a93f3
   *               slideNo:
   *                 type: number
   *                 example: 1
   *               imagePath:
   *                 type: string
   *                 example: uploads/slides/demo-slide-1.png
   *               extractedTextRaw:
   *                 type: string
   *                 example: AI Presentation Assistant
   *               extractedTextClean:
   *                 type: string
   *                 example: ระบบช่วยฝึกซ้อมการนำเสนอด้วย OCR และ AI
   *               ocrStatus:
   *                 type: string
   *                 example: success
   *               targetTime:
   *                 type: number
   *                 example: 60
   *     responses:
   *       201:
   *         description: Slide created successfully
   */
  router.post(
    "/slides",
    slideController.createSlide
  )

  /**
   * @swagger
   * /slides/{id}:
   *   put:
   *     summary: Update slide
   *     tags:
   *       - Slide
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               slideNo:
   *                 type: number
   *                 example: 2
   *               imagePath:
   *                 type: string
   *                 example: uploads/slides/updated-slide.png
   *               extractedTextRaw:
   *                 type: string
   *                 example: Updated raw OCR text
   *               extractedTextClean:
   *                 type: string
   *                 example: ข้อความ OCR ที่แก้ไขแล้ว
   *               ocrStatus:
   *                 type: string
   *                 example: manual
   *               targetTime:
   *                 type: number
   *                 example: 90
   *     responses:
   *       200:
   *         description: Slide updated successfully
   *       404:
   *         description: Slide not found
   */
  router.put(
    "/slides/:id",
    checkMiddleware("id"),
    slideController.updateSlide
  )

  /**
   * @swagger
   * /slides/{id}:
   *   delete:
   *     summary: Delete slide
   *     tags:
   *       - Slide
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     responses:
   *       200:
   *         description: Slide deleted successfully
   *       404:
   *         description: Slide not found
   */
  router.delete(
    "/slides/:id",
    checkMiddleware("id"),
    slideController.deleteSlide
  )
}

export default slideRouter