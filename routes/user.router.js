import userController from "../controllers/user.controller.js"
import checkMiddleware from "../middlewares/check.middleware.js"

const userRouter = (router) => {
  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Get all users
   *     tags:
   *       - User
   *     responses:
   *       200:
   *         description: List of users
   */
  router.get("/user", userController.getAllUser)

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: MongoDB ObjectId of user
   *     responses:
   *       200:
   *         description: User detail
   *       404:
   *         description: User not found
   */
  router.get("/user/:id", checkMiddleware("id"), userController.getUserbyId)

  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Create user
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 example: demo
   *               password:
   *                 type: string
   *                 example: "123456"
   *     responses:
   *       201:
   *         description: User created successfully
   */
  router.post("/user", userController.createUser)

  /**
   * @swagger
   * /user/{id}:
   *   put:
   *     summary: Update user
   *     tags:
   *       - User
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
   *               username:
   *                 type: string
   *                 example: demo1
   *               password:
   *                 type: string
   *                 example: "123456"
   *     responses:
   *       200:
   *         description: User updated successfully
   */
  router.put("/user/:id", checkMiddleware("id"), userController.updateUser)

  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     summary: Delete user
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User deleted successfully
   */
  router.delete("/user/:id", checkMiddleware("id"), userController.deleteUser)
}

export default userRouter