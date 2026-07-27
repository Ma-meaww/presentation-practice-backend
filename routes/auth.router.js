import authController from "../controllers/auth.controller.js"

const authRouter = (router) => {
  router.post("/auth/login", authController.login)
  router.post("/auth/logout", authController.logout)
}

export default authRouter