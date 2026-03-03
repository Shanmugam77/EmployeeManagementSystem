const express = require("express");
const router = express.Router();
const leaveController = require("../Controller/leaveController");
const {authMiddleware} = require("../Middleware/authMiddleware");
const { adminMiddleware } = require("../Middleware/adminMiddleware");


router.post("/", authMiddleware, leaveController.addLeave);
router.get("/", authMiddleware, adminMiddleware, leaveController.getAllLeaveRequests);
router.get("/:id", authMiddleware, leaveController.getAllLeaveRequestsByUserId);
router.put("/:id", authMiddleware, adminMiddleware, leaveController.editAction);
router.delete("/:id",authMiddleware, leaveController.deleteLeaveRequest);

module.exports = {LeaveRouter:router};
