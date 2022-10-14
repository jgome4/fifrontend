import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm,SubmitHandler,Resolver  } from 'react-hook-form'
import { Task } from '../../ddd/domain/models/task/task';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState,useEffect }  from 'react';

const resolver: Resolver<Task> = async (values) => {
    return {
      values: values.taskName ? values : {},
      errors: !values.taskName
        ? {
            taskName: {
              type: 'required',
              message: 'Es requerido.',
            }
          }
        : {},
        
    };
  };

 function AlertDialogEdit(props:any) {

    const { register, handleSubmit,formState: { errors } ,setValue } = useForm<Task>({ resolver });

    const onSubmit: SubmitHandler<Task> = data =>{
        data.taskState=(data.taskState.toString()=="true")?true:false
        props.editTask(data)
        handleClose()
    } ;

    setValue('taskId', props.dataEdit.taskId);
    setValue('taskName', props.dataEdit.taskName);
    setValue('taskState', props.dataEdit.taskState);

  const handleClose = () => {
    props.closeAlert()
  };



  return (
    <div>

      <Dialog
        open={props.openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar Tarea"}
        </DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div >
        <div className="mb-3">
        <InputLabel id="demo-simple-select-helper-label">Nombre</InputLabel>
          <TextField  label="Nombre" {...register("taskName")}  />
        </div>
        <br/>
        <div className="mb-3">
        <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Estado"
          {...register("taskState")}
          defaultValue={props.dataEdit.taskState}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={false as any}>No Completado</MenuItem>
          <MenuItem value={true as any}>Completado</MenuItem>
        </Select>
        </div>
      </div>
      <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button type="submit" >
           Guardar
          </Button>
        </DialogActions>

      </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AlertDialogEdit;