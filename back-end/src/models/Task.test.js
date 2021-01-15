import db from '../database';
import Task from './Task';

describe('Operations Tasks', () => {
  it('should be able to list tasks.', async () => {
    const taskId = '1';

    const [rows] = await db.query(
      `SELECT * FROM tasks WHERE id_task = '${taskId}'`
    );

    expect(Task.index(taskId)).toEqual(rows[0]);
  });
});
