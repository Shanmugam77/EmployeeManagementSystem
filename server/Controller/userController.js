const { User } = require("../modules/userModel");
const {UserService} = require("../service/userService")
const { hashPassword } = require("../utils/bcryptUtil");

class UserController{
    async addUser(req,res){
        try {
            const {firstName, lastName, dob, email, password, role, gender, maritalStatus, salary, designation, department} = req.body;
            const isValidGmail = (email) => {
              const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
              return gmailRegex.test(email);
            };
            if(!firstName) return res.status(400).json({message:"FirstName required"});
            if(!lastName) return res.status(400).json({message:"LastName required"});
            if(!dob) return res.status(400).json({message:"DOB required"});
            if(!email) return res.status(400).json({message:"Email required"});
            if (!isValidGmail(email)) res.status(400).json({message:"Please enter a valid Gmail address"});
            if(!password) return res.status(400).json({message:"Password required"});
            if(!role) return res.status(400).json({message:"Role required"});
            if(!gender) return res.status(400).json({message:"Gender required"});
            if(!maritalStatus) return res.status(400).json({message:"Marital Status required"});
            if(!salary) return res.status(400).json({message:"Salary required"});
            if(!designation) return res.status(400).json({message:"Designation required"});
            if(!department) return res.status(400).json({message:"Department required"});




            if (await User.findOne({email})) {
                return res.status(400).json({message:"Email already in use"});
            }

            const hashPass = await hashPassword(10,password);
            const {userId} = req.user;

            let data = req.body;
            data.password = hashPass;
            data.createdBy = userId || "";

            const newData = await UserService.createUser(data);
            return res.status(201).json({user:newData,message:"User created successfully"});
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };

    async getAlluser(req,res){
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({users});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
        }
    }

    async getuserById(req,res){
        try {
            const Id = req.params.id;
            const user = await UserService.getUserById(Id);
            return res.status(200).json({user});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
        }
    }

    async editUser(req,res){
        try {
            const Id = req.params.id;
            const {firstName, lastName, dob, email, password, role, gender, maritalStatus, salary, designation, department} = req.body;
            const isValidGmail = (email) => {
              const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
              return gmailRegex.test(email);
            };
            if(!firstName) return res.status(400).json({message:"FirstName required"});
            if(!lastName) return res.status(400).json({message:"LastName required"});
            if(!dob) return res.status(400).json({message:"DOB required"});
            if(!email) return res.status(400).json({message:"Email required"});
            if (!isValidGmail(email)) res.status(400).json({message:"Please enter a valid Gmail address"});
            if(!password) return res.status(400).json({message:"Password required"});
            if(!role) return res.status(400).json({message:"Role required"});
            if(!gender) return res.status(400).json({message:"Gender required"});
            if(!maritalStatus) return res.status(400).json({message:"Marital Status required"});
            if(!salary) return res.status(400).json({message:"Salary required"});
            if(!designation) return res.status(400).json({message:"Designation required"});
            if(!department) return res.status(400).json({message:"Department required"});

            const {userId} = req.user;
            const data = req.body;
            data.updatedBy = userId;
            const updatedData = await UserService.updateUser(Id,data);
            if (!updatedData) return res.status(400).json({message:"Failed to update User"});
            return res.status(200).json({userData:updatedData,message:"User updated successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
        }
    }

    async deleteuser(req,res){
        try {
            const Id = req.params.id;
            const deletedData = await UserService.deleteUser(Id);
            if(!deletedData) return res.status(400).json({message:'Failed to delete User'});
            return res.status(200).json({userData:deletedData, message:"User deleted successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
        }
    }

}

module.exports = new UserController();