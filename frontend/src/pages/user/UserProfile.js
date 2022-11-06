import { useEffect } from 'react';

import TopBar from '../../component/layout/TopBar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import UserCard from "../../component/user/UserCard";
import SkillCard from '../../component/user/SkillCard';

import { useForm } from '../../utils/useForm';
import useAxios from '../../utils/useAxios';


const theme = createTheme();

const UserProfilePage = () => {
  const api = useAxios();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    skillsList: [],
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  };

  const {values, setValues} = useForm(initialValues);

  useEffect(() => {
    getUserProfile();
  }, [])

  const getUserProfile = async () => {
    try {
      const response = await api.get('/api/user/profile/get');

      if (response.status === 200) {
        setValues({
          ...values, 
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          dob: response.data.dob,
          skillsList: response.data.skills_list,
        });
      }
    } catch (err) {
      console.log(err);
      // setErrHeading('Project List');
      // setErrMsg(JSON.stringify(err.response.data));
      // setAxiosError(true);
    }
  };

  return (
    <div>
      <TopBar />
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <UserCard data={values} />
        <SkillCard data={values} />
      </Container>
      </ThemeProvider>
    </div>
  )
};

export default UserProfilePage;