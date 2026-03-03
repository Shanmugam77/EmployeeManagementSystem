let mongoose = require("mongoose");

let leaveschema = new mongoose.Schema({
    leaveType:{
        type:String,
        enum:["Casual Leave","Sick Leave"],
        default:"Casual Leave",
        required:true
    },
    action:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    resumeDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    empId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true});
const Leave = mongoose.model("leaves",leaveschema);

module.exports={Leave};