import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Chip } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useForm, Form } from '../../utils/useForm';
import useAxios from '../../utils/useAxios';

import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'


const UserProfileForm = () => {
  const api = useAxios();

  const initialValues = {
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

  const [experience, setExperience] = useState(0);
  const [skill, setSkill] = useState('');
  const [experienceList, setExperienceList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

  const handleExperienceChange = () => {
    if (skill !== '' && experience !== 0) { setExperienceList([...experienceList, {skill: skill, experience: experience}]); }
  };

  const handleSkillDelete = data => {
    setExperienceList(experienceList.filter(item => item !== data));
  };

  useEffect(() => {
    getAllSkills();
  }, [])

  const getAllSkills = async () => {
    try {
      const response = await api.get('/api/user/all/skills/get');

      if (response.status === 200) {
        setSkillsList(response.data);
        getUserProfile();
      }
    } catch (err) {
      console.log(err);
      // setErrHeading('Project List');
      // setErrMsg(JSON.stringify(err.response.data));
      // setAxiosError(true);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await api.get('/api/user/profile/get');

      if (response.status === 200) {
        setValues({
          ...values, 
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          dob: new Date(response.data.dob),
        });
        setExperienceList(response.data.skills_list);
      }
    } catch (err) {
      console.log(err);
      // setErrHeading('Project List');
      // setErrMsg(JSON.stringify(err.response.data));
      // setAxiosError(true);
    }
  };

  const submitUserProfile = e => {
    e.preventDefault();
    editUserProfile();
  };

  const editUserProfile = async () => {
    try {
      const response = await api.post('/api/user/profile/edit', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        dob: values.dob,
        profile_pic: imageSrc,
        skills_list: JSON.stringify(experienceList),
      });

      if (response.status === 200) {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      // props.setErrHeading('Project Create');
      // props.setErrMsg(JSON.stringify(err.response.data));
      // props.setAxiosError(true);
    }
  };

  return (
    <Container maxWidth="lg" style={{marginTop: '15px'}}>
      <Form onSubmit={submitUserProfile}>
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

        <Grid style={{margin: '10px'}}>
          <Typography component="h2" variant="h5">Skills</Typography>

          <Grid container spacing={2} style={{display : 'flex', marginTop: '5px'}}>
            <Grid item xs={6} md={4}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={skill}
                label="Skill"
                onChange={(e) => setSkill(e.target.value)}
                style={{width: '100%'}}
              >
                {
                  skillsList.map((data, index) => (
                    <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                  ))
                }
              </Select>
            </Grid>

            <Grid item xs={6} md={4} style={{marginTop: '-7px'}}>
              <TextField
                varient="outlined"
                label="Experience"
                name='experience'
                type="number"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <Button 
                variant="outlined" 
                color='success' 
                style={{marginLeft: '15px', height: '85%'}}
                onClick={handleExperienceChange}
              >
              Save
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid style={{margin: '10px'}}>
          {
            experienceList.map((data, index) => (
              <Chip 
                label={`${data.skill} - ${data.experience} Years`} 
                variant="outlined" 
                key={index}
                value={data}
                onDelete={() => handleSkillDelete(data)}
                style={{margin: '5px'}}
              />
            ))
          }
        </Grid>

        <Grid>
          <Button variant="contained" style={{marginLeft: '10px'}} type='submit'>Submit</Button>
          <Button variant="outlined" color="error" style={{marginLeft: '10px'}}>Cancel</Button>
        </Grid>
      </Form>
    </Container>
  );
};

export default UserProfileForm;