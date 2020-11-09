import db from "../database";

class Task {
  async index(id) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM tasks WHERE user_id = '${id}'`
      );

      return rows;
    } catch (err) {
      return new Error("Error in the listing of tasks");
    }
  }

  async findOne({ id_task, user_id }) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM tasks WHERE id_task = '${id_task}' AND user_id = '${user_id}'`
      );

      const task = rows[0];

      return task;
    } catch (err) {
      return new Error("Error at list one task");
    }
  }

  async create({ id_task, task, user_id }) {
    try {
      await db.execute(
        `INSERT INTO tasks (id_task, task, user_id) 
         VALUES ('${id_task}', '${task}', '${user_id}')`
      );

      const [rows] = await db.execute(
        `SELECT * FROM tasks WHERE id_task = '${id_task}'`
      );

      const taskCreated = rows[0];

      return taskCreated;
    } catch (err) {
      return new Error("Error in the create the task.");
    }
  }
}

export default new Task();
