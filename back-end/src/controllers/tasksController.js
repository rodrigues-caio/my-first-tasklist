import { v4 as uuidv4 } from "uuid";
import Task from "../models/Task";

class TasksController {
  async index(request, response) {
    const { user_id } = request.params;

    const tasks = await Task.index(user_id);

    return response.status(200).json(tasks);
  }

  async show(request, response) {
    const { id_task } = request.params;
    const { user_id } = request.body;

    const task = await Task.findOne({ id_task, user_id });

    if (!task) {
      return response.status(404).json({ error: "Task not found" });
    }

    return response.status(200).json(task);
  }

  async create(request, response) {
    const { user_id } = request.params;
    const { task } = request.body;
    const id_task = uuidv4();

    const taskCreated = await Task.create({
      id_task,
      task,
      user_id,
    });

    return response.status(201).json(taskCreated);
  }

  update(request, response) {
    const { id_task } = request.params;
    const { task, user_id } = request.body;

    db.execute(
      "UPDATE tasks SET task = ? WHERE id_task = ? AND user_id = ?",
      [task, id_task, user_id],
      (err, results, rows) => {
        if (err) {
          return response.status(400).json({ error: "Update failed." });
        }

        return response.status(200).json(results);
      }
    );
  }

  delete(request, response) {
    const { id_task } = request.params;
    const { user_id } = request.body;

    db.execute(
      "DELETE FROM tasks WHERE id_task = ? AND user_id = ?",
      [id_task, user_id],
      (err, results, rows) => {
        if (err) {
          return response.status(400).json({ error: "Delete failed." });
        }

        return response.send();
      }
    );
  }
}

export default new TasksController();
