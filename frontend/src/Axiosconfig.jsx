import axios from "axios";

const Instance = axios.create({
    // baseURL:"https://schoolmanagement-api-39gd.onrender.com/" //render
    baseURL:"http://localhost:5000/" //local
})

export default Instance;