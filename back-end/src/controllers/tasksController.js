import { v4 as uuidv4 } from 'uuid';
import Task from '../models/Task';

class TasksController {
  async index(request, response) {
    const { user_id } = request.params;

    const tasks = await Task.index(user_id);

    return response.status(200).json(tasks);
  }

  async show(request, response) {
    const { id_task, user_id } = request.params;

    const task = await Task.findOne({ id_task, user_id });

    if (!task) {
      return response.status(404).json({ error: 'Task not found' });
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

  async update(request, response) {
    const { id_task, user_id } = request.params;
    const { task } = request.body;

    const taskUpdated = await Task.updateTask({ id_task, user_id, task });

    if (!taskUpdated) {
      return response.status(401).json({ error: 'Not possible update task' });
    }

    return response.status(200).json(taskUpdated);
  }

  async delete(request, response) {
    const { id_task } = request.params;
    const { user_id } = request.body;

    await Task.deleteTask({ id_task, user_id });

    return response.status(200)send();
  }
}

export default new TasksController();
