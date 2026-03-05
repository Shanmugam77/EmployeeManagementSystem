let mongoose=require("mongoose")

let userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["ADMIN", "EMPLOYEE", "SUPER-ADMIN"],
        default:"EMPLOYEE",
        required:true
    },
    gender:{
        type:String,
        enum:["Male", "Female", "Other"],
        default:"Male",
        required:true
    },
    maritalStatus:{
        type:String,
        enum:["Married", "Unmarried"],
        default:"Unmarried",
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["ACTIVE", "IN-ACTIVE"],
        default:"ACTIVE",
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    profileImg:{
        type:String,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"departments",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
    }
},{timestamps:true})
const User=mongoose.model("users",userschema)

module.exports={User};