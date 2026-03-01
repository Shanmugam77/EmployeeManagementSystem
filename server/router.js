const express = require("express");
const app = express();

const {UserRouter} = require("./Router/userRouter");
const {AuthRouter} = require('./Router/authRouter');
const {DepartmentRouter} = require("./Router/departmentRouter");

app.use("/user",UserRouter);
app.use("/auth",AuthRouter);
app.use("/department",DepartmentRouter);

module.exports = {rootRouter:app};