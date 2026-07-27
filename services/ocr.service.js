import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

const cleanOcrText = (text) => {
  return text.replace(/\s+/g, " ").replace(/[|•●]/g, "").trim();
};

const ocrService = {
  runImageOcr: async (slide) => {
    const imagePath = path.resolve(slide.imagePath);
    const pythonFile = path.resolve("ocr_easy.py");

    try {
      const pythonExe = process.env.PYTHON_EXE || "python";

      const { stdout, stderr } = await execFileAsync(
        pythonExe,
        [pythonFile, imagePath],
        {
          maxBuffer: 1024 * 1024 * 20,
          env: {
            ...process.env,
            PYTHONIOENCODING: "utf-8",
          },
        },
      );

      console.log("EasyOCR stdout:", stdout);
      console.log("EasyOCR stderr:", stderr);

      if (stderr) {
        console.log("EasyOCR stderr:", stderr);
      }

      const jsonLine = stdout
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("{") && line.endsWith("}"))
        .pop();

      if (!jsonLine) {
        throw new Error("No valid JSON returned from EasyOCR");
      }

      const result = JSON.parse(jsonLine);

      if (!result.success) {
        throw new Error(result.error || "EasyOCR failed");
      }

      const rawText = result.text || "";
      const cleanText = cleanOcrText(rawText);

      return {
        extractedTextRaw: rawText,
        extractedTextClean: cleanText,
        ocrStatus: cleanText ? "success" : "failed",
      };
    } catch (err) {
      console.log("EasyOCR failed:", err.message);

      return {
        extractedTextRaw: "",
        extractedTextClean: "",
        ocrStatus: "failed",
        error: err.message,
      };
    }
  },

  runMockOcr: async (slide, data = {}) => {
    const rawText =
      data.extractedTextRaw ||
      slide.extractedTextRaw ||
      `ข้อความตัวอย่างจาก OCR ของสไลด์ที่ ${slide.slideNo}`;

    const cleanText =
      data.extractedTextClean || rawText.trim().replace(/\s+/g, " ");

    return {
      extractedTextRaw: rawText,
      extractedTextClean: cleanText,
      ocrStatus: "success",
    };
  },
};

export default ocrService;
