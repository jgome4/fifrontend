import { useState, useEffect }  from 'react';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridColDef
  } from '@mui/x-data-grid';
  import Pagination from '@mui/material/Pagination';
  import Button from '@mui/material/Button';
  import DeleteIcon from '@mui/icons-material/Delete';
  import Swal from 'sweetalert2'
  import EditIcon from '@mui/icons-material/Edit';
  import AlertDialogEdit from '../../components/task/modaltaskEdit';
  import { Task } from '../../ddd/domain/models/task/task';


  

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }
 
  //Componente de la tabla de los entregables
  const Datagridtask = (props:any) => {
    
   const [pageSize, setPageSize] = useState<number>(10);
   const [open, setOpen] = useState(false);
   const [dataEdit, setDataEdit] = useState({
    taskId:0, taskName:'',taskState:''
 });

   const deleteTask = (data:any) => {
    console.log(data)
    Swal.fire({
      title: 'Atención',
      text: "Esta seguro de eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteTask(data.id);
       
      }
    })
    
  };
  const updateTask = (data:any) => {
    console.log(data.row)
    setDataEdit(data.row)
    handleClickOpenEdit();
    
  };
  const handleClickOpenEdit = () => {
    setOpen(true);
  };
  const handleCloseEdit = () => {
    setOpen(false);
  };
  function editTask(dataSave:Task){
         
     props.editTask(dataSave)
  }

  const columns: GridColDef[] = [
    { field: 'taskId', headerName: 'ID',hide: true  },
    { field: 'taskName', headerName: 'Tarea', width: 300  },
    {
      field: 'taskState',
      headerName: 'Estado',
      width: 250,
      renderCell: (cellValues:any) => {
        return  (cellValues.value)?"Completado":"No Completado" 
      }
    },
    {
      field: 'actions',
      type: 'actions',
      width: 250,
      renderCell: (cellValues:any) => {
        return (
          <>
      <Button variant="outlined" onClick={()=>updateTask(cellValues)} startIcon={<EditIcon />}>
       </Button>
      <Button variant="outlined" onClick={()=>deleteTask(cellValues)} color="error" startIcon={<DeleteIcon />}>
      </Button>
          </>
     )  
      }
    },
    
  ];


    return (
      <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
        <AlertDialogEdit openAlert={open} closeAlert={handleCloseEdit} dataEdit={dataEdit} editTask={editTask}></AlertDialogEdit>
        <DataGrid
          rows={props.data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.taskId}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          components={{
            Pagination: CustomPagination,
          }}
        />
        </div>
      </div>
    </div>
     
    );
  }
  
  export default Datagridtask