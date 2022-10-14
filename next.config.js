/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, env: { 
    API_GET_TASK: "https://servicios3.ingetec.com.co/Test/api/getTasks", 
    API_PUT_TASK: "https://servicios3.ingetec.com.co/Test/api/insertTask",
    API_POST_TASK: "https://servicios3.ingetec.com.co/Test/api/updateTask",  
    API_DELETE_TASK: "https://servicios3.ingetec.com.co/Test/api/deleteTask/",  
    API_TOKEN_TASK: "https://servicios3.ingetec.com.co/Test/api/Login/login", 
    API_GET_TASK_USER: "test",
    API_GET_TASK_PW: "123",
  },
}

module.exports = nextConfig
