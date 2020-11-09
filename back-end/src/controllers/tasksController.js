import { v4 as uuidv4 } from "uuid";
import db from "../database";

class TasksController {
  index(request, response) {
    db.query("SELECT * FROM tasks", (err, results, rows) => {
      if (err) {
        return response
          .status(500)
          .json({ error: "It is not possible search." });
      }

      return response.status(200).json(results);
    });
  }

  create(request, response) {
    const { user_id } = request.params;
    const { task } = request.body;
    const id_task = uuidv4();

    db.execute(
      "INSERT INTO tasks (id_task, task, user_id) VALUES (?, ?, ?)",
      [id_task, task, user_id],
      (err, results, rows) => {
        if (err) {
          return response.status(400).json({ error: "Insert failed." });
        }

        return response.status(201).json(results);
      }
    );
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
