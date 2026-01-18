import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Todos from "../../model/todo.model.js";

const CreateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, msg: "Todo text is mandatory!" });
    }

    const savedTodo = await Todos.create({ text, userId: currUser.userId });

    return res.status(201).json({ success: true, msg: "Todo Created!", todo: savedTodo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default CreateTodo;