import axios from "axios";

const Instance = axios.create({
    baseURL:"https://employeemanagementsystem-s0r7.onrender.com/" //render
    // baseURL:"http://localhost:5000/" //local
})

export default Instance;