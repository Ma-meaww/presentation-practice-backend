import authService from "../services/auth.service.js"

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required"
        })
      }

      const result = await authService.login(username, password)

      if (!result) {
        return res.status(401).json({
          message: "Invalid username or password"
        })
      }

      res.status(200).json({
        message: "Login successful",
        token: result.token,
        user: result.user
      })
    } catch (err) {
      console.log("Error login:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },

  logout: async (req, res) => {
    res.status(200).json({
      message: "Logout successful"
    })
  }
}

export default authController