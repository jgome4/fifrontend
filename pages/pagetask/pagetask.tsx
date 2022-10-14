import { useState, useEffect }  from 'react';
import { Task } from '../../ddd/domain/models/task/task';
import { TaskService } from '../../ddd/domain/services/servicestask/task.services';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Datagridtask from '../../components/task/datagridtask';
import Button from '@mui/material/Button';
import AlertDialog from '../../components/task/modaltask';
import Swal from 'sweetalert2'




//Pagina principal Entregables Demo
export default function PageTask() {
    const [Task, setTask] = useState<Task[]>([])
    const [open, setOpen] = useState(false);


    useEffect(() => {
      loadTask()
     
    }, [])

     function loadTask(){
      TaskService.getTask().then(setTask)
      .catch((error)=>{ 
      console.log(error)
   });
    }
    const handleClickOpen = () => {
      setOpen(true);
 
    };
    const handleClose = () => {
      setOpen(false);
    };
     function saveTask(dataSave:Task){

      TaskService.putTask(dataSave).then()
      .catch((error)=>{ 
      console.log(error)
     });
      alertMessage("Guardo exitosamente","success")
      loadTask()
    }
    function alertMessage(title:string,icon:any){
      Swal.fire({
        icon:icon,
        title: `${title}`,
      })
   }
   function deleteTask(taskId:string){

    TaskService.deleteTask(taskId).then()
    .catch((error)=>{ 
    console.log(error)
 });
    alertMessage("Eliminado exitosamente","success")
    loadTask()
  }
  function editTask(dataSave:Task){

    TaskService.postTask(dataSave).then()
    .catch((error)=>{ 
    console.log(error)
   });
    alertMessage("Editado exitosamente","success")
    loadTask()
  }
      return (
        // <Container fixed>
        <main className="container  mx-auto  flex-col items-center justify-center min-h-screen p-4">
       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
 
      <br/>
      <Grid sx={{ flexGrow: 1 }} >
      <Button variant="contained" onClick={()=>handleClickOpen()} >Nueva Tarea</Button>
      <AlertDialog openAlert={open} closeAlert={handleClose} saveTask={saveTask} ></AlertDialog>
      <br/>
         <Datagridtask
             data={Task}
             deleteTask={deleteTask}
             closeAlert={handleClose}
             handleClickOpen={handleClickOpen}
             openAlert={open}
             editTask={editTask}
          />

        </Grid>
           </div>
      </main>
      // </Container>
      );
    }
    