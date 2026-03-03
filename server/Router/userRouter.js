const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const { authMiddleware } = require("../Middleware/authMiddleware");
const { adminMiddleware } = require("../Middleware/adminMiddleware");


router.post("/", authMiddleware, adminMiddleware, userController.addUser);
router.get("/", authMiddleware, userController.getAlluser);
router.get("/:id", authMiddleware, userController.getuserById);
router.put("/:id", authMiddleware, adminMiddleware, userController.editUser);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteuser);
router.put("/changePassword/:id", authMiddleware, userController.changeUserPassword);

module.exports = {UserRouter:router};