import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Todos from "../../model/todo.model.js";

const UpdateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { id, text } = req.body;
    if (!id || !text) {
      return res.status(400).json({ success: false, msg: "Todo didn't reached to backend!" });
    }

    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: id, userId: currUser.userId }, // ownership check
      { text },
      { new: true } // return updated todo
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        msg: "Todo not found or not authorized",
      });
    }

    return res.status(200).json({ success: true, msg: "Todo updated successfully!", note: updatedTodo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default UpdateTodo;