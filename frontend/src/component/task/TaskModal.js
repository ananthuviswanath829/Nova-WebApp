import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import { useForm, Form } from '../../utils/useForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskModal = props => {
  
  const handleClose = () => {
    props.setModalIsOpen(false);
  };

  const submitTask = e => {
    e.preventDefault();
    if (props.taskId === '') {
      props.createTask(values);
    } else {
      props.editTask(values);
    }
  };

  const initialValues = {
    taskName: props.data.taskName,
    taskDate: props.data.taskDate,
    startTime: props.data.startTime,
    endTime: props.data.endTime,
  };

  const {values, handleInputChange} = useForm(initialValues);

  return (
    <div>
      <Modal
        open={props.modalIsOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.taskId === '' ? 'Task Create' : 'Task Edit'}
          </Typography>
          <Form onSubmit={submitTask}>
            <TextField
              varient="outlined"
              label="Name"
              name='taskName'
              required
              value={values.taskName}
              onChange={handleInputChange('taskName')}
            />

            <TextField
              varient="outlined"
              label="Task Date"
              name='taskDate'
              type="date"
              required
              value={values.taskDate}
              InputProps={{
                inputProps: { min: new Date().toISOString().slice(0, 10) }
              }}
              onChange={handleInputChange('taskDate')}
            />

            <TextField
              varient="outlined"
              label="Start time"
              name='startTime'
              type="time"
              required
              value={values.startTime}
              onChange={handleInputChange('startTime')}
            />

            <TextField
              varient="outlined"
              label="End time"
              name='endTime'
              type="time"
              required
              value={values.endTime}
              InputProps={{
                inputProps: { min: values.startTime }
              }}
              onChange={handleInputChange('endTime')}
            />

            <Button variant='contained' type='submit' style={{marginLeft: '10px', marginTop: '5px'}}>Submit</Button>
            {props.taskId !== '' && <Button variant='outlined' color="error" style={{marginLeft: '10px', marginTop: '5px'}} onClick={props.deleteTask}>Delete</Button>}
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskModal;