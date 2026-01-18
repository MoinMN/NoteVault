import { AuthRequest } from "../../middleware/auth.middleware.js";
import Todos from "../../model/todo.model.js";
import { Response } from "express";

const ToggleStatus = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { id } = req.body;
    const todo = await Todos.findOne({ _id: id, userId: currUser.userId });
    if (!todo) {
      return res.status(404).json({ success: false, msg: "Todo not found" });
    }

    // Toggle completed value
    todo.completed = !todo.completed;

    await todo.save();
    return res.status(200).json({ success: true, todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export default ToggleStatus;