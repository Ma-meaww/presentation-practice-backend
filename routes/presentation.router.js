import presentationController from "../controllers/presentation.controller.js"
import checkMiddleware from "../middlewares/check.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const presentationRouter = (router) => {
  /**
   * @swagger
   * /presentations:
   *   get:
   *     summary: Get all presentations
   *     tags:
   *       - Presentation
   *     responses:
   *       200:
   *         description: List of presentations
   */
  router.get("/presentations", authMiddleware, presentationController.getAllPresentations)

  /**
   * @swagger
   * /presentations/{id}:
   *   get:
   *     summary: Get presentation by ID
   *     tags:
   *       - Presentation
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Presentation detail
   */
  router.get(
    "/presentations/:id",
    authMiddleware,
    checkMiddleware("id"),
    presentationController.getPresentationById
  )

  /**
   * @swagger
   * /presentations:
   *   post:
   *     summary: Create presentation
   *     tags:
   *       - Presentation
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - title
   *             properties:
   *               userId:
   *                 type: string
   *                 example: 69edc4ed35624ce0688a8321
   *               title:
   *                 type: string
   *                 example: Demo Presentation
   *               description:
   *                 type: string
   *                 example: ใช้ทดสอบระบบช่วยฝึกซ้อมการนำเสนอ
   *               totalTargetTime:
   *                 type: number
   *                 example: 300
   *               filePath:
   *                 type: string
   *                 example: uploads/presentations/demo.pdf
   *     responses:
   *       201:
   *         description: Presentation created successfully
   */
  router.post("/presentations", authMiddleware, presentationController.createPresentation)

  /**
   * @swagger
   * /presentations/{id}:
   *   put:
   *     summary: Update presentation
   *     tags:
   *       - Presentation
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Updated Presentation
   *               description:
   *                 type: string
   *                 example: แก้ไขรายละเอียดงานนำเสนอแล้ว
   *               totalTargetTime:
   *                 type: number
   *                 example: 420
   *               filePath:
   *                 type: string
   *                 example: uploads/presentations/updated-demo.pdf
   *     responses:
   *       200:
   *         description: Presentation updated successfully
   */
  router.put(
    "/presentations/:id",
    authMiddleware,
    checkMiddleware("id"),
    presentationController.updatePresentation
  )

  /**
   * @swagger
   * /presentations/{id}:
   *   delete:
   *     summary: Delete presentation
   *     tags:
   *       - Presentation
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Presentation deleted successfully
   */
  router.delete(
    "/presentations/:id",
    authMiddleware,
    checkMiddleware("id"),
    presentationController.deletePresentation
  )
}

export default presentationRouter