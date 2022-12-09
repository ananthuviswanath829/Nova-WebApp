import { Form } from '../../utils/useForm';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

const WorkForm = props => {
  const navigate = useNavigate();

  const statusList = ['Assigned', 'In Progress', 'Blocked', 'Completed'];

  const submitForm = e => {
    e.preventDefault();
    props.submitForm();
  };

  const navigateToPayment = () => {
    navigate('/payment');
  };

  return (
    <div style={{marginTop: '20px'}}>
      <Form onSubmit={submitForm} style={{padding: '20px'}}>
        <Grid container spacing={2}>
          <TextField
            varient="outlined"
            label="Name"
            name='workName'
            required
            value={props.values.workName}
            onChange={props.handleInputChange('workName')}
          />
        </Grid>

        <Grid container spacing={2} style={{display : 'flex', marginTop: '2px', marginLeft: '-30px'}}>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props1) => <TextField  variant="outlined"  className="w-100" required {...props1} />}
              label="Start Date"
              name='startDate'
              value={props.values.startDate}
              onChange={props.handleInputChange('startDate')}
            />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props1) => <TextField  variant="outlined"  className="w-100" required {...props1} />}
              label="End Date"
              name='endDate'
              value={props.values.endDate}
              onChange={props.handleInputChange('endDate')}
            />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{display : 'flex', marginTop: '2px',  marginLeft: '-23px'}}>
          <Grid item xs={12} md={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Friends"
              value={props.values.userId}
              onChange={props.handleInputChange('userId')}
              style={{width: '100%'}}
              defaultValue=""
            >
              {
                props.friendsList.map((data, index) => (
                  <MenuItem key={index} value={data.user_id}>{`${data.first_name} ${data.last_name}`}</MenuItem>
                ))
              }
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={props.values.status}
              onChange={props.handleInputChange('status')}
              style={{width: '100%'}}
              defaultValue=""
            >
              {
                statusList.map((data, index) => (
                  <MenuItem key={index} value={data}>{data}</MenuItem>
                ))
              }
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '18px'}}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={props.values.description}
            onChange={props.handleInputChange('description')}
          />
        </Grid>

        <Grid container spacing={2} style={{marginTop: '2px', marginLeft: '-8px'}}>
          <Button variant='contained' type='submit'>Submit</Button>
          {props.values.showPayBtn && <Button variant='contained' color='success' style={{ marginLeft: '10px'}} onClick={navigateToPayment}>Pay</Button>}
        </Grid>
      </Form>
    </div>
  );
};

export default WorkForm;