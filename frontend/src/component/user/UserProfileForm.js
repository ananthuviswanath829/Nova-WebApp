import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useForm, Form } from '../../utils/useForm';

import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'

const UserProfileForm = () => {
  
  const initialValues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    dob: new Date(),
  };

  const {values, setValues, handleInputChange} = useForm(initialValues);

  const config2 = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    compressInitial: null,
  };

  const initialImage = '';

  const setImageSrc = e => {
    console.log(e);
  };

  return (
    <Container maxWidth="lg" style={{marginTop: '15px'}}>
      <Form>
        <Grid style={{ margin: 'auto', width: '30%', display: 'block', padding: '8px' }}>
          <ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(newDataUri) => { setImageSrc(newDataUri) }} />
        </Grid>
        
        <Grid container spacing={2} style={{display : 'flex'}}>
          <Grid item xs={12} md={6}>
            <TextField
              varient="outlined"
              label="First Name"
              name='firstName'
              required
              value={values.firstName}
              onChange={handleInputChange('firstName')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              varient="outlined"
              label="Last Name"
              name='lastName'
              required
              value={values.lastName}
              onChange={handleInputChange('lastName')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{display : 'flex'}}>
          <Grid item xs={12} md={6}>
            <TextField
              varient="outlined"
              label="E-mail"
              name='email'
              required
              value={values.email}
              onChange={handleInputChange('email')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props) => <TextField  variant="outlined"  className="w-100" required {...props} />}
              label="Date of Birth"
              name='dob'
              disableFuture
              value={values.dob}
              onChange={handleInputChange('dob')}
            />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid>
          <Button variant="contained" style={{marginLeft: '10px'}}>Submit</Button>
          <Button variant="outlined" color="error" style={{marginLeft: '10px'}}>Cancel</Button>
        </Grid>
      </Form>
    </Container>
  );
};

export default UserProfileForm;