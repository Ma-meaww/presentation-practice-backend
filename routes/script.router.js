import scriptController from "../controllers/script.controller.js"
import checkMiddleware from "../middlewares/check.middleware.js"

const scriptRouter = (router) => {
  /**
   * @swagger
   * /slides/{slideId}/scripts:
   *   get:
   *     summary: Get scripts by slide ID
   *     tags:
   *       - Script
   *     parameters:
   *       - in: path
   *         name: slideId
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of slide
   *     responses:
   *       200:
   *         description: List of scripts for the slide
   */
  router.get(
    "/slides/:slideId/scripts",
    checkMiddleware("slideId"),
    scriptController.getScriptsBySlideId
  )

  /**
   * @swagger
   * /scripts/{id}:
   *   get:
   *     summary: Get script by ID
   *     tags:
   *       - Script
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of script
   *     responses:
   *       200:
   *         description: Script detail
   *       404:
   *         description: Script not found
   */
  router.get(
    "/scripts/:id",
    checkMiddleware("id"),
    scriptController.getScriptById
  )

  /**
   * @swagger
   * /scripts:
   *   post:
   *     summary: Create script
   *     tags:
   *       - Script
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - slideId
   *               - content
   *             properties:
   *               slideId:
   *                 type: string
   *                 example: 69ef11115fcb0944255a0001
   *               content:
   *                 type: string
   *                 example: สไลด์นี้เป็นการแนะนำระบบช่วยฝึกซ้อมการนำเสนอ
   *               level:
   *                 type: string
   *                 enum:
   *                   - standard
   *                   - formal
   *                 example: standard
   *               isAiGenerated:
   *                 type: boolean
   *                 example: true
   *     responses:
   *       201:
   *         description: Script created successfully
   */
  router.post(
    "/scripts",
    scriptController.createScript
  )

  /**
   * @swagger
   * /scripts/{id}:
   *   put:
   *     summary: Update script
   *     tags:
   *       - Script
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of script
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               content:
   *                 type: string
   *                 example: นี่คือสคริปต์ที่แก้ไขแล้วสำหรับใช้ในการฝึกซ้อมนำเสนอ
   *               level:
   *                 type: string
   *                 enum:
   *                   - standard
   *                   - formal
   *                 example: formal
   *               isAiGenerated:
   *                 type: boolean
   *                 example: false
   *     responses:
   *       200:
   *         description: Script updated successfully
   *       404:
   *         description: Script not found
   */
  router.put(
    "/scripts/:id",
    checkMiddleware("id"),
    scriptController.updateScript
  )

  /**
   * @swagger
   * /scripts/{id}:
   *   delete:
   *     summary: Delete script
   *     tags:
   *       - Script
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of script
   *     responses:
   *       200:
   *         description: Script deleted successfully
   *       404:
   *         description: Script not found
   */
  router.delete(
    "/scripts/:id",
    checkMiddleware("id"),
    scriptController.deleteScript
  )
}

export default scriptRouter