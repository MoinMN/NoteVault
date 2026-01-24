import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Todos from "../../model/todo.model.js";

const GetTodosByUser = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const todos = await Todos.find({ userId: currUser?.userId });
    const count = await Todos.countDocuments({ userId: currUser?.userId });

    return res.status(200).json({ success: true, todos, count });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default GetTodosByUser;