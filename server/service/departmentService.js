const {Department} = require("../modules/departmentModel");

const createDepartment = async(data) => {
    try {
        let newData = new Department(data);
        newData = await newData.save();
        return newData;
    } catch (error) {
        throw error;   
    }
};

const getAllDepartment = async() => {
    try {
        const departments = await Department.find();
        return departments;
    } catch (error) {
        throw error;
    }
};

const getDepartmentById = async(id) => {
    try {
        const department = await Department.findById(id);
        return department;
    } catch (error) {
        throw error;
    }
};

const updateDepartment = async(id,data) => {
    try {
        const updatedData = await Department.findByIdAndUpdate(id,{$set:data});
        return updatedData;
    } catch (error) {
        throw error;
    }
};

const deleteDepartment = async(id) => {
    try {
        const deletedData = await Department.findByIdAndDelete(id);
        return deletedData;
    } catch (error) {
        throw error;
    }

};

module.exports = {DepartmentService:{createDepartment, getAllDepartment, getDepartmentById, updateDepartment, deleteDepartment}}