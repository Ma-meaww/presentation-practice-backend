import practiceResultController from "../controllers/practiceResult.controller.js"
import checkMiddleware from "../middlewares/check.middleware.js"

const practiceResultRouter = (router) => {
  /**
   * @swagger
   * /presentations/{presentationId}/practice-result:
   *   get:
   *     summary: Get practice result by presentation ID
   *     tags:
   *       - Practice Result
   *     parameters:
   *       - in: path
   *         name: presentationId
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of presentation
   *     responses:
   *       200:
   *         description: Practice result detail
   *       404:
   *         description: Practice result not found
   */
  router.get(
    "/presentations/:presentationId/practice-result",
    checkMiddleware("presentationId"),
    practiceResultController.getPracticeResultByPresentationId
  )

  /**
   * @swagger
   * /presentations/{presentationId}/practice-result:
   *   post:
   *     summary: Create or update latest practice result
   *     tags:
   *       - Practice Result
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
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - totalActualTime
   *               - totalTargetTime
   *             properties:
   *               totalActualTime:
   *                 type: number
   *                 example: 330
   *               totalTargetTime:
   *                 type: number
   *                 example: 300
   *               overTimeSlideCount:
   *                 type: number
   *                 example: 1
   *     responses:
   *       200:
   *         description: Practice result saved successfully
   */
  router.post(
    "/presentations/:presentationId/practice-result",
    checkMiddleware("presentationId"),
    practiceResultController.createOrUpdatePracticeResult
  )

  /**
   * @swagger
   * /practice-results/{id}:
   *   put:
   *     summary: Update practice result by ID
   *     tags:
   *       - Practice Result
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of practice result
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               totalActualTime:
   *                 type: number
   *                 example: 290
   *               totalTargetTime:
   *                 type: number
   *                 example: 300
   *               overTimeSlideCount:
   *                 type: number
   *                 example: 0
   *     responses:
   *       200:
   *         description: Practice result updated successfully
   *       404:
   *         description: Practice result not found
   */
  router.put(
    "/practice-results/:id",
    checkMiddleware("id"),
    practiceResultController.updatePracticeResult
  )

  /**
   * @swagger
   * /practice-results/{id}:
   *   delete:
   *     summary: Delete practice result by ID
   *     tags:
   *       - Practice Result
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of practice result
   *     responses:
   *       200:
   *         description: Practice result deleted successfully
   *       404:
   *         description: Practice result not found
   */
  router.delete(
    "/practice-results/:id",
    checkMiddleware("id"),
    practiceResultController.deletePracticeResult
  )
}

export default practiceResultRouter