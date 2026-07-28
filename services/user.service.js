import User from "../models/User.js"
import bcrypt from "bcryptjs"

const userService = {
  getAllUsers: async () => {
    return await User.find()
  },
  getUserbyId: async (id) => {
    return await User.findById(id)
  },
  createUser: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = new User({
      username: data.username,
      password: hashedPassword
    })
    return await user.save()
  },

  updateUser: async (id, data) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    return await User.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" }
    )
  },
  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id)
  }
}

export default userService