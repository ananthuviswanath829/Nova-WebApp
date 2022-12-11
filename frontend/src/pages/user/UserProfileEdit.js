import { useState, useEffect, useContext } from 'react';

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
import SearchContext from '../../context/SearchContext';

import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'

import TopBar from '../../component/layout/TopBar';
import ErrorModal from '../../component/layout/ErrorModal';
import SuccessAlert from '../../component/layout/SuccessAlert';


const UserProfileEditPage = () => {
  const api = useAxios();

  const { searchTerm, setSearchTerm, getSearchResult, } = useContext(SearchContext);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: new Date(),
    experience: '',
    perHourRate: '',
    availability: '',
    rating: '',
    nodeAddress: '',
    privateKey: '',
  };

  const {values, setValues, handleInputChange} = useForm(initialValues);

  const preferenceList = {
    experience: ['Junior', 'Mid Level', 'Senior'],
    availability: ['Low', 'Medium', 'High'],
    rating: ['Very Poor', 'Poor', 'Weak', 'Good', 'Very Good', 'Excellent'],
  };

  const config2 = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    compressInitial: null,
  };

  const initialImage = '';

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
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
  }, []);

  const getAllSkills = async () => {
    try {
      const response = await api.get('/api/user/all/skills/get');

      if (response.status === 200) {
        setSkillsList(response.data);
        getUserProfile();
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Skills Get',
      });
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await api.get('/api/user/profile/get');

      if (response.status === 200) {
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Profile details get successfully',
        });
        setValues({
          ...values, 
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          dob: new Date(response.data.dob),
          experience: response.data.experience,
          perHourRate: response.data.per_hour_rate,
          availability: response.data.availability,
          rating: response.data.rating,
          nodeAddress: response.data.node_address,
          privateKey: response.data.private_key,
        });
        setExperienceList(response.data.skills_list);
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Profile Get',
      });
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
        experience: values.experience,
        per_hour_rate: values.perHourRate,
        availability: values.availability,
        rating: values.rating,
        node_address: values.nodeAddress,
        private_key: values.privateKey,
      });

      if (response.status === 200) {
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: response.data,
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Profile Edit',
      });
    }
  };

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
      { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
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
            <Typography component="h2" variant="h5">Etherium Details</Typography>

            <Grid container spacing={2} style={{display: 'flex', marginTop: '5px'}}>
              <Grid item xs={12} md={6}>
                <TextField
                  varient="outlined"
                  label="Node Address"
                  name='nodeAddress'
                  value={values.nodeAddress}
                  onChange={handleInputChange('nodeAddress')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  varient="outlined"
                  label="Private Key"
                  name='privateKey'
                  value={values.privateKey}
                  onChange={handleInputChange('privateKey')}
                />
              </Grid>
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

          <Grid style={{margin: '10px'}}>
            <Typography component="h2" variant="h5">Search Preference</Typography>

            <Grid container spacing={2} style={{display : 'flex', marginTop: '5px'}}>
              <Grid item xs={12} md={6}>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select1"
                  value={values.experience}
                  label="Experience"
                  name='experience'
                  onChange={handleInputChange('experience')}
                  style={{width: '100%'}}
                >
                  {
                    preferenceList.experience.map((data, index) => (
                      <MenuItem key={index} value={data}>{data}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>

              <Grid item xs={12} md={6} style={{marginTop: '0px'}}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.perHourRate}
                    label="Per Hour Cost"
                    name='perHourRate'
                    onChange={handleInputChange('perHourRate')}
                    style={{width: '100%'}}
                  >
                    {
                      preferenceList.availability.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))
                    }
                  </Select>
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{display : 'flex', marginTop: '5px'}}>
              <Grid item xs={12} md={6}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.availability}
                  label="Availability"
                  name='availability'
                  onChange={handleInputChange('availability')}
                  style={{width: '100%'}}
                >
                  {
                    preferenceList.availability.map((data, index) => (
                      <MenuItem key={index} value={data}>{data}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>

              <Grid item xs={12} md={6} style={{marginTop: '0px'}}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.rating}
                    label="Rating"
                    name='rating'
                    onChange={handleInputChange('rating')}
                    style={{width: '100%'}}
                  >
                    {
                      preferenceList.rating.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))
                    }
                  </Select>
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <Button variant="contained" style={{marginLeft: '10px'}} type='submit'>Submit</Button>
            <Button variant="outlined" color="error" style={{marginLeft: '10px'}}>Cancel</Button>
          </Grid>
        </Form>
      </Container>

      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  );
};

export default UserProfileEditPage;