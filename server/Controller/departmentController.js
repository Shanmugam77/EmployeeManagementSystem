const {DepartmentService} = require("../service/departmentService");

class DepartmentController{
    async addDepartment(req,res){
        try {
            const {departmentId, departmentName, description} = req.body;
            if(!departmentId) return res.status(400).json({message:"DepartmentId required"});
            if(!departmentName) return res.status(400).json({message:"DepartmentName required"});
            if(!description) return res.status(400).json({message:"Description required"});

            const{userId}=req.user;
            
            let data = req.body;
            data.createdBy = userId || "";

            const newData = await DepartmentService.createDepartment(data);
            return res.status(201).json({department:newData,message:"Department created successfully"});
  
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };

    async getAlldepartment(req,res){
        try {
            const departments = await DepartmentService.getAllDepartment();
            return res.status(200).json({departments});   
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
        }
    };

    async getdepartmentById(req,res){
        try {
            const Id = req.params.id;
            const department = await DepartmentService.getDepartmentById(Id);
            return res.status(200).json({department});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
            
        }
    };

    async editDepartment(req,res){
        try {
            const Id = req.params.id;
            const {departmentId, departmentName, description} = req.body;
            if(!departmentId) return res.status(400).json({message:"DepartmentId required"});
            if(!departmentName) return res.status(400).json({message:"DepartmentName required"});
            if(!description) return res.status(400).json({message:"Description required"});

            const {userId} = req.user;
            const data = req.body;
            data.updatedBy = userId;

            const updatedData = await DepartmentService.updateDepartment(Id,data);
            if(!updatedData) return res.status(400).json({message:"Failed to update Department"});
            return res.status(200).json({departmentData:updatedData,message:"Department updated successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.message});
        }
    };

    async deletedepartment(req,res){
        try {
            const Id = req.params.id;
            const deletedData = await DepartmentService.deleteDepartment(Id);
            if(!deletedData) return res.status(400).json({message:"Failed to delete department"});
            return res.status(200).json({departmentData:deletedData, message:"Department deleted successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({erro:error.message});
        }
    }
};

module.exports = new DepartmentController();