const express = require("express");
const app = express();

const {UserRouter} = require("./Router/userRouter");
const {AuthRouter} = require('./Router/authRouter');
const {DepartmentRouter} = require("./Router/departmentRouter");
const {LeaveRouter} = require("./Router/LeaveRouter");

app.use("/user",UserRouter);
app.use("/auth",AuthRouter);
app.use("/department",DepartmentRouter);
app.use("/leave",LeaveRouter)

module.exports = {rootRouter:app};