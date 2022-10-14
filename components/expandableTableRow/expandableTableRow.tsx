import React,{useState} from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Datesofdeliverable } from '../../ddd/domain/models/datesofdeliverable/datesofdeliverable';
import { HerlpersService } from '../../ddd/domain/services/helpers/helpers.services';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }:any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [progress, setProgress] = useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  
  return (
    <>
       <React.Fragment>
       <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
           (otherProps.datesofdeliverable.map( (row:any)  => (
            <>
            <TableRow key={row.deliverableID}>
            <TableCell padding="checkbox" />
                <TableCell align="left"> 
                 <td><CircularProgressWithLabel value={progress} /></td>
                 <td> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                 <td><CircularProgressWithLabel value={progress} /></td>
                </TableCell>
                <TableCell align="left">
                   <td>Inicio: {row.deliverablePercentageProgress}</td>
                  </TableCell>
                  <TableCell align="left">
                   <td>Asignado: {row.deliverablePercentageProgress}</td>
                  </TableCell>
                <TableCell align="left">{HerlpersService.findDateCreate(row.deliverableDates)}</TableCell>
              </TableRow>
              <TableRow >
               <TableCell padding="checkbox" />
               <TableCell align="left"> 
                 <td><CircularProgressWithLabel value={progress} /></td>
                 <td> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                 <td><CircularProgressWithLabel value={progress} /></td>
                </TableCell>
                   <TableCell align="left">
                   <td>Creación: {row.deliverablePercentageProgress}</td>
                  </TableCell>
                  <TableCell align="left">
                   <td>Entrega: {row.deliverablePercentageProgress}</td>  
                  </TableCell>
                     <TableCell align="left">{HerlpersService.findDateCreate(row.deliverableDates)}</TableCell>
                </TableRow>
                 </>
            )))
        
      )}
            
    </>
    </React.Fragment>
    </>
  );
};

export default ExpandableTableRow