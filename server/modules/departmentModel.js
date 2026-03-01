let mongoose = require('mongoose')

let departmentschema= new mongoose.Schema({
    departmentId:{
        type:Number,
        required:true
    },
    departmentName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
            type:mongoose.Schema.Types.ObjectId,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
    }
},{timestamps:true});

const Department = mongoose.model("departments",departmentschema);
module.exports={Department};