import express from "express"
import authRouter from "./auth.router.js"
import userRouter from "./user.router.js"
import presentationRouter from "./presentation.router.js"
import slideRouter from "./slide.router.js"
import scriptRouter from "./script.router.js"
import practiceResultRouter from "./practiceResult.router.js"
import uploadRouter from "./upload.router.js"
import processRouter from "./process.router.js"

const router = express.Router()

authRouter(router)
userRouter(router)
presentationRouter(router)
slideRouter(router)
scriptRouter(router)
practiceResultRouter(router)
uploadRouter(router)
processRouter(router)

export default router