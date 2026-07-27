import userService from "../services/user.service.js"

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (err) {
      console.log("Error fetching users:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  getUserbyId: async (req, res) => {
    try {
      const userId = req.params.id
      const user = await userService.getUserbyId(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(user)
    } catch (err) {
      console.log("Error fetching user by ID:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body)
      res.status(201).json(newUser)
    } catch (err) {
      console.log("Error creating user:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id
      const updatedUser = await userService.updateUser(userId, req.body)
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(updatedUser)
    } catch (err) {
      console.log("Error updating user:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id
      const deletedUser = await userService.deleteUser(userId)
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(deletedUser)
    } catch (err) {
      console.log("Error deleting user:", err)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default userController