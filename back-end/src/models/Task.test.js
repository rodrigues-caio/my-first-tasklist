const db = '../database';
const Task = './Task';

describe('CRUD in tasks', () => {
  it('should be able to list tasks.', () => {
    const taskId = '1';

    const [rows] = db.default.execute(
      `SELECT * FROM tasks WHERE user_id = '${taskId}'`
    );

    expect(Task.default.index(taskId).toContain(rows));
  });
});
