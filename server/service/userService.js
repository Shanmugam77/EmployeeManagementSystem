const {User} = require("../modules/userModel");

const createUser = async(data) => {
   try {
    let newData = new User(data);
    newData = await newData.save();
    return newData;
   } catch (error) {
    throw error;
   }
};

const getAllUsers = async() => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};

const getUserById = async(id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserwithDepById = async(id) => {
    try {
        const user = await User.findById(id).populate("department");
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser = async(id,data) => {
    try {
        const updatedData = await User.findByIdAndUpdate(id,{$set:data});
        return updatedData;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async(id) => {
    try {
        const deletedData = await User.findByIdAndDelete(id)
        console.log("sun",deletedData);
        return deletedData;
    } catch (error) {
        throw error;
    }
};

module.exports = {UserService:{createUser, getAllUsers, getUserById, updateUser, deleteUser, getUserwithDepById}};