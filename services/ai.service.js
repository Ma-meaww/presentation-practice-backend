const aiService = {
  generateScript: async ({ slideText, previousText = "", level = "standard" }) => {
    const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434"
    const model = process.env.OLLAMA_MODEL || "llama3.2"

    const tone =
      level === "formal"
        ? "ใช้ภาษาทางการ สุภาพ เหมาะสำหรับพูดนำเสนอหน้าชั้นเรียน"
        : "ใช้ภาษาธรรมชาติ เข้าใจง่าย เหมาะสำหรับนักศึกษาพูดนำเสนอ"

    const prompt = `
คุณคือผู้ช่วยเขียนสคริปต์นำเสนอภาษาไทย

ระดับภาษา: ${level}
แนวทางภาษา: ${tone}

บริบทจากสไลด์ก่อนหน้า:
${previousText || "ไม่มี"}

ข้อความจากสไลด์ปัจจุบัน:
${slideText}

กรุณาเขียนสคริปต์สำหรับพูดนำเสนอ 1 สไลด์
เงื่อนไข:
- เขียนเป็นภาษาไทย
- ไม่ต้องใส่หัวข้อ
- ไม่ต้องใส่ bullet
- พูดต่อเนื่องเป็นธรรมชาติ
- อย่าแต่งข้อมูลเกินจากข้อความในสไลด์มากเกินไป
`.trim()

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          options: {
            temperature: 0.4
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`)
      }

      const result = await response.json()

      return {
        content: (result.response || "").trim(),
        source: "ollama"
      }
    } catch (err) {
      console.log("Ollama failed, using fallback:", err.message)

      const fallbackContent =
        level === "formal"
          ? `เรียนอาจารย์และผู้ฟังทุกท่าน สไลด์นี้กล่าวถึง "${slideText}" ซึ่งเป็นประเด็นสำคัญของการนำเสนอในส่วนนี้ ผู้พูดสามารถใช้เนื้อหานี้เพื่ออธิบายภาพรวมได้อย่างชัดเจนและเป็นระบบมากขึ้น`
          : `สไลด์นี้พูดถึง "${slideText}" ซึ่งเป็นเนื้อหาสำคัญที่ช่วยให้ผู้ฟังเข้าใจภาพรวมของงานนำเสนอได้ง่ายขึ้น`

      return {
        content: fallbackContent,
        source: "fallback"
      }
    }
  }
}

export default aiService