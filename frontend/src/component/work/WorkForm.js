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

  const statusList = ['Pending', 'Assigned', 'In Progress', 'Blocked', 'Completed'];
  const paymentMethodList = ['Etherium', 'SudoCoin'];

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
            { props.mode === 'create' &&
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
            }
            { props.mode === 'edit' &&
              <TextField
                varient="outlined"
                label="Assigned To"
                name='workName'
                value={props.values.assignedTo}
                style={{marginTop: '1px', marginLeft: '-2px'}}
                disabled
              />
            }
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

        <Grid container spacing={2} style={{display : 'flex', marginTop: '2px',  marginLeft: '-23px'}}>
          <Grid item xs={12} md={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Payment Method"
              value={props.values.paymentMethod}
              onChange={props.handleInputChange('paymentMethod')}
              style={{width: '100%'}}
              defaultValue=""
            >
              {
                paymentMethodList.map((data, index) => (
                  <MenuItem key={index} value={data}>{data}</MenuItem>
                ))
              }
            </Select>
          </Grid>

          <Grid item xs={12} md={6} style={{marginTop: '-8px', marginLeft: '-8px'}}>
            <TextField
              varient="outlined"
              label="Amount"
              name='amount'
              required
              value={props.values.amount}
              onChange={props.handleInputChange('amount')}
            />
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
        </Grid>
      </Form>
    </div>
  );
};

export default WorkForm;