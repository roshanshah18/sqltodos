import { NextFunction, Request, Response } from "express";
import { TodoModel, TTodo } from "../models/todo-model";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  gettodoId,
  updatetodo,
} from "../database";

export async function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.todoId;

    if (!id) {
      console.log("Please provide valid todoId");
      return;
    }

    const result = await gettodoId(parseInt(id));

    if (!result) {
      return res.status(404).json({
        messgae: "todo not found",
      });
    }

    res.json({
      data: null,
      message: "Todo is successfully Taken",
    });
  } catch (error) {
    console.error("Error Ocuured", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    console.log("body", body);

    const name = body.name;

    const result = await createTodo(name);

    console.log("result", result);

    res.status(201).json({
      data: result,
      message: "todo created successfully",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}

export async function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.todoId;
    const name = req.body.name;
    console.log(id);

    if (!id) {
      next("please provide id");
      return;
    }

    const result = await updatetodo(name, parseInt(id));

    console.log("result", result);

    res.status(201).json({
      data: result,
      message: "todo updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.todoId;

    if (!id) {
      next("Please provide valid todoId");
      return;
    }

    const result = await deleteTodo(parseInt(id));

    if (!result) {
      return res.status(404).json({
        messgae: "todo not found",
      });
    }

    res.status(200).json({
      data: result,
      message: "Todo is successfully deleted",
    });
  } catch (error) {
    console.error("Error Ocuured", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export async function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getAllTodos();
    res.json({
      data: result,
    });
  } catch (error) {
    console.error("error occured", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}
