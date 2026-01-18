import express from "express";

const router = express.Router();

import DeleteTodos from "../controller/todos/deletes.js";
import UpdateTodo from "../controller/todos/update.js";
import GetTodosByUser from "../controller/todos/get.js";
import CreateTodo from "../controller/todos/create.js";
import ToggleStatus from "../controller/todos/toggle.js";
import GetTodosCount from "../controller/todos/count.js";

router.post("/create", CreateTodo);
router.get("/get", GetTodosByUser);
router.patch("/update", UpdateTodo);
router.delete("/delete", DeleteTodos);
router.patch("/toggle", ToggleStatus);
router.get("/count", GetTodosCount);

export default router;