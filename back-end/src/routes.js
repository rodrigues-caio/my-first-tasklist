import { Router } from "express";

import usersController from "./controllers/usersController";
import tasksController from "./controllers/tasksController";

const routes = Router();

routes.get("/user/:id", usersController.index);

routes.post("/user", usersController.create);

routes.put("/user/:id", usersController.update);

routes.delete("/user/:id", usersController.delete);

routes.get("/tasks/:user_id", tasksController.index);

routes.get("/tasks/:id_task/:user_id", tasksController.show);

routes.post("/tasks/:user_id", tasksController.create);

routes.put("/tasks/:id_task", tasksController.update);

routes.delete("/tasks/:id_task", tasksController.delete);

export default routes;
