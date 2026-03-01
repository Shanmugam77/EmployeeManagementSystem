const express = require("express");
const router = express.Router();
const DepartmentController = require("../Controller/departmentController");
const {authMiddleware} = require("../Middleware/authMiddleware");
const {adminMiddleware} = require("../Middleware/adminMiddleware");
const departmentController = require("../Controller/departmentController");


router.post("/",authMiddleware, adminMiddleware, departmentController.addDepartment);
router.get("/",authMiddleware, departmentController.getAlldepartment);
router.get("/:id", authMiddleware, departmentController.getdepartmentById);
router.put("/:id", authMiddleware, adminMiddleware, departmentController.editDepartment);
router.delete("/:id", authMiddleware, adminMiddleware, departmentController.deletedepartment);

module.exports = {DepartmentRouter:router};