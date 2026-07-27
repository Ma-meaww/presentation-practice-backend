import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const authService = {
  login: async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
      return null
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return null
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
      }
    )

    return {
      token,
      user: {
        _id: user._id,
        username: user.username
      }
    }
  }
}

export default authService