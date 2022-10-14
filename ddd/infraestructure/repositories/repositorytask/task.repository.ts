import { http } from '../../http/http'
import { TaskDTO } from '../../http/modelsdto/taskdto/taskdto'
import { Task } from '../../../domain/models/task/task'
import { Token } from '../../../domain/models/token/token'


export const taskRepository = {
  getTask: async (token:Token) => {
    let url=`${process.env.API_GET_TASK}`

    const task = await http.get<TaskDTO[]>(`${url}`,token)
    // we can extract this transform to a function inside this file to be reused by different methods
    return task.map((item): Task => ({
      taskId: item.taskId,
      taskName: item.taskName,
      taskState: item.taskState
    }))
  },
  putTask: async (token:Token,tasks:Task) => {
    let url=`${process.env.API_PUT_TASK}`
    let body=JSON.stringify(tasks)
    const response = await http.put<any>(`${url}`,body,token)
    // we can extract this transform to a function inside this file to be reused by different methods
    return response
  },
  postTask: async (token:Token,tasks:Task) => {
    let url=`${process.env.API_POST_TASK}`
    let body=JSON.stringify(tasks)
    console.log(body)
    const response = await http.post<any>(`${url}`,body,token)
    // we can extract this transform to a function inside this file to be reused by different methods
    return response
  },
  deleteTask: async (token:Token,taskID:string) => {
    let url=`${process.env.API_DELETE_TASK}`
    const response = await http.delete<any>(`${url}${taskID}`,token)
    // we can extract this transform to a function inside this file to be reused by different methods
    return response
  }
}