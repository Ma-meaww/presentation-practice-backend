import mongoose from "mongoose";

const checkMiddleware = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
      return res.status(400).json({
        message: "${paramName} is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ${paramName} format"
      });
    }

    next();
  };
};

export default checkMiddleware;