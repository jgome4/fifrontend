import { taskRepository } from '../../../infraestructure/repositories/repositorytask/task.repository'
import { TokenService } from '../servicestoken/token.services'
import { Task } from '../../../domain/models/task/task'

export const TaskService = {
  getTask: async () => {
    let payloadToken={
      "username": `${process.env.API_GET_TASK_USER}`,
      "password": `${process.env.API_GET_TASK_PW}`
   }

    const tokens = await TokenService.postToken(payloadToken,"") 

    return await taskRepository.getTask(tokens) 
  },
  putTask: async (tasks:Task) => {
    let payloadToken={
      "username": `${process.env.API_GET_TASK_USER}`,
      "password": `${process.env.API_GET_TASK_PW}`
   }
 
    const tokens = await TokenService.postToken(payloadToken,"") 

    return await taskRepository.putTask(tokens,tasks) 
  },
  postTask: async (tasks:Task) => {
    let payloadToken={
      "username": `${process.env.API_GET_TASK_USER}`,
      "password": `${process.env.API_GET_TASK_PW}`
   }
 
    const tokens = await TokenService.postToken(payloadToken,"") 

    return await taskRepository.postTask(tokens,tasks) 
  },
  deleteTask: async (tasksId:string) => {
    let payloadToken={
      "username": `${process.env.API_GET_TASK_USER}`,
      "password": `${process.env.API_GET_TASK_PW}`
   }
 
    const tokens = await TokenService.postToken(payloadToken,"") 

    return await taskRepository.deleteTask(tokens,tasksId) 
  }
}