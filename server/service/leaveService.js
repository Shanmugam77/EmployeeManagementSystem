const {Leave} = require("../modules/leaveModel");

const createLeave = async(data) => {
    try {
        let newData = new Leave(data);
        newData = await newData.save();
        return newData;
    } catch (error) {
        throw error;
    }
};

const getAllLeaves = async() => {
    try {
        const leaves = await Leave.find().populate("empId");
        return leaves;
    } catch (error) {
        throw error;
    }
};

const getLeavesByUserId = async(id) => {
    try {
        const leaves = await Leave.find();
        const userLeaves = leaves.map((x)=>x?.empId == id);
        return userLeaves;
    } catch (error) {
        throw error;
    }
};

const updateLeave = async(id,data) => {
    try {
        const updatedData = await Leave.findByIdAndUpdate(id,{$set:data});
        return updatedData;
    } catch (error) {
        throw error;
    }
};

const deleteLeave = async(id) => {
    try {
        const deletedData = await Leave.findByIdAndDelete(id)
        return deletedData;
    } catch (error) {
        throw error;
    }
};

module.exports = {LeaveService:{createLeave, getAllLeaves, getLeavesByUserId, updateLeave, deleteLeave}};