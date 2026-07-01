const usersDBController = require("../controllers/usersDBController");

const { Router } = require("express");
const usersDbRouter = Router();

// usersRouter.get("/search", usersDBController.usersSearchGet);

usersDbRouter.get("/", usersDBController.usersListGet);
usersDbRouter.get("/create", usersDBController.usersCreateGet);
usersDbRouter.post("/create", usersDBController.usersCreatePost);

usersDbRouter.get("/:id/update", usersDBController.usersUpdateGet);
usersDbRouter.post("/:id/update", usersDBController.usersUpdatePost);

// usersRouter.post("/:id/delete", usersDBController.usersDeletePost);

module.exports = usersDbRouter; 