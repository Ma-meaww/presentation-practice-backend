import express from 'express'
import router from './routes/router.js'
import dotenv from 'dotenv'
import databaseconnect from './databaseconnect.js'
import { swaggerUi, swaggerSpec } from "./swagger.js"
import path from 'path';//
import { fileURLToPath } from 'url';//

dotenv.config()

const app = express()
const port = process.env.API_PORT || 3000
const __filename = fileURLToPath(import.meta.url);//
const __dirname = path.dirname(__filename);//

app.use(express.json())

app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.path}`)
  next()
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))//

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(router)

app.use((err, req, res, next) => {
  console.error("ERROR DETECTED");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack); // ตัวนี้จะบอกว่าพังที่ไฟล์ไหน บรรทัดไหน
  res.status(500).json({ 
    message: "Internal Server Error", 
    error: err.message 
  });
});

databaseconnect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
