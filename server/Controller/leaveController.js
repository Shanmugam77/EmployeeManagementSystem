const { Leave } = require("../modules/leaveModel");
const {LeaveService} = require("../service/leaveService");

class LeaveController{
    async addLeave(req,res){
        try {
            const{leaveType, fromDate, toDate, resumeDate, description} = req.body;
            if(!leaveType) return res.status(400).json({message:"LeaveType is required"});
            if(!fromDate) return res.status(400).json({message:"From Date is required"});
            if(!toDate) return res.status(400).json({message:"To Date is required"});
            if(!resumeDate) return res.status(400).json({message:"Resume Date is required"});
            if(!description) return res.status(400).json({message:"Description is required"});

            const {userId}=req.user;

            let data = req.body;
            data.empId = userId || '';

            const newData = await LeaveService.createLeave(data);
            return res.status(201).json({leave:newData,message:"Leave request created successfully"}); 
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };

    async getAllLeaveRequests(req,res){
        try {
            const leaves = await LeaveService.getAllLeaves();
            return res.status(200).json({leaves});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };

    async getAllLeaveRequestsByUserId(req,res){
        try {
            const Id = req.params.id;
            const leaves = await LeaveService.getLeavesByUserId(Id);
            return res.status(200).json({leaves});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };

    async editAction(req,res){
        try {
            const Id = req.params.id;
            const {action} = req.body;
            if(!action) return res.status(400).json({message:"Action is required"});
            const leave = await Leave.findOne({_id:Id});

            const {userId}=req.user;

            let data = leave;
            data.action = action;
            data.updatedBy = userId || '';
            const updatedData = await LeaveService.updateLeave(Id,data);
            if(!updatedData) return res.status(400).json({message:"Faild to update leave"});
            return res.status(200).json({leaveData:updatedData,message:"Action Updated successfully"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };

    async deleteLeaveRequest(req,res){
        try {
            const Id = req.params.id;
            const leave = await Leave.findOne({_id:Id});
            if(leave?.action !== "Pending") return res.status(400).json({message:"Now your not able to delete beacuse your superior already taken action"});
            const deletedData = await LeaveService.deleteLeave(Id);
            if(!deletedData) return res.status(400).json({message:"Failed to delete leave request"});
            return res.status(200).json({leaveData:deletedData,message:"Leave request deleted successfully"})
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:error.message});
        }
    };
}

module.exports = new LeaveController;