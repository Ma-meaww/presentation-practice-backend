import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import Presentation from "../models/Presentation.js";
import Slide from "../models/Slide.js";
import Script from "../models/Script.js";
import PracticeResult from "../models/PracticeResult.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected");

    // ล้างข้อมูลเก่าก่อน เพื่อให้ seed ใหม่ไม่ซ้ำ
    await User.deleteMany();
    await Presentation.deleteMany();
    await Slide.deleteMany();
    await Script.deleteMany();
    await PracticeResult.deleteMany();

    // 1. Create demo user
    const user = await User.create({
      username: 'demo',
      password: await bcrypt.hash('123456', 10),
    });

    // 2. Create presentation
    const presentation = await Presentation.create({
      userId: user._id,
      title: "AI Presentation Assistant",
      description: "ระบบช่วยสร้างสคริปต์นำเสนอจากสไลด์",
      totalTargetTime: 300,
      filePath: "uploads/presentations/demo.pdf"
    });

    // 3. Create slides
    const slide1 = await Slide.create({
      presentationId: presentation._id,
      slideNo: 1,
      imagePath: "uploads/slides/demo-slide-1.png",
      extractedTextRaw: "AI Presentation Assistant",
      extractedTextClean: "ระบบช่วยสร้างสคริปต์นำเสนอจากสไลด์",
      ocrStatus: "success",
      targetTime: 60
    });

    const slide2 = await Slide.create({
      presentationId: presentation._id,
      slideNo: 2,
      imagePath: "uploads/slides/demo-slide-2.png",
      extractedTextRaw: "Problem: Students take time to prepare speaking scripts",
      extractedTextClean: "นักศึกษาใช้เวลานานในการเตรียมสคริปต์สำหรับนำเสนอ",
      ocrStatus: "success",
      targetTime: 90
    });

    const slide3 = await Slide.create({
      presentationId: presentation._id,
      slideNo: 3,
      imagePath: "uploads/slides/demo-slide-3.png",
      extractedTextRaw: "Solution: OCR and AI generate script for each slide",
      extractedTextClean: "ระบบใช้ OCR และ AI เพื่อสร้างสคริปต์แยกตามแต่ละสไลด์",
      ocrStatus: "success",
      targetTime: 150
    });

    // 4. Create scripts
    await Script.create([
      {
        slideId: slide1._id,
        content:
          "สไลด์นี้เป็นการแนะนำระบบ AI Presentation Assistant ซึ่งเป็นระบบที่ช่วยสร้างสคริปต์สำหรับการนำเสนอจากไฟล์สไลด์",
        level: "standard",
        isAiGenerated: true
      },
      {
        slideId: slide1._id,
        content:
          "เรียนอาจารย์และผู้ฟังทุกท่าน สไลด์นี้ขอนำเสนอระบบ AI Presentation Assistant ซึ่งเป็นระบบที่ถูกออกแบบมาเพื่อช่วยสนับสนุนการเตรียมสคริปต์สำหรับการนำเสนอ",
        level: "formal",
        isAiGenerated: true
      },
      {
        slideId: slide2._id,
        content:
          "ปัญหาหลักคือผู้ใช้งานต้องใช้เวลาค่อนข้างมากในการอ่านสไลด์และเขียนสคริปต์ด้วยตัวเอง ทำให้การเตรียมนำเสนอใช้เวลานาน",
        level: "standard",
        isAiGenerated: true
      },
      {
        slideId: slide3._id,
        content:
          "แนวทางแก้ไขคือใช้ OCR เพื่ออ่านข้อความจากสไลด์ จากนั้นใช้ AI ช่วยสร้างสคริปต์สำหรับแต่ละสไลด์ให้อัตโนมัติ",
        level: "standard",
        isAiGenerated: true
      }
    ]);

    // 5. Create practice result
    await PracticeResult.create({
      presentationId: presentation._id,
      totalActualTime: 330,
      totalTargetTime: 300,
      overTimeSlideCount: 1,
      lastPracticedAt: new Date()
    });

    console.log("Seed data created successfully");
    process.exit();
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seedData();