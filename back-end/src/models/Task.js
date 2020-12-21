import db from '../database';

class Task {
  async index(id) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM tasks WHERE user_id = '${id}'`
      );

      return rows;
    } catch (err) {
      return new Error('Error in the listing of tasks');
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
      return new Error('Error at list one task');
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
      return new Error('Error in the create the task.');
    }
  }

  async updateTask({ id_task, user_id, task }) {
    try {
      await db.execute(
        `UPDATE tasks SET task='${task}' WHERE id_task='${id_task}' AND user_id='${user_id}'`
      );

      const [rows] = await db.execute(
        `SELECT task FROM tasks WHERE id_task='${id_task}' AND user_id='${user_id}'`
      );

      return rows[0];
    } catch (err) {
      return new Error(`Erro in the update task: ${err}`);
    }
  }

  async deleteTask({ id_task, user_id }) {
    try {
      await db.execute(
        `DELETE FROM tasks WHERE id_task='${id_task}' AND user_id='${user_id}'`
      );

      return;
    } catch (err) {
      return new Error(`Error in the delete task: ${err}`);
    }
  }
}

module.exports = new Task();
