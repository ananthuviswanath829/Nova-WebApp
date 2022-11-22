import { useState, useEffect,useContext } from 'react';

import TopBar from '../../component/layout/TopBar';
import ErrorModal from '../../component/layout/ErrorModal';
import SuccessAlert from '../../component/layout/SuccessAlert';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import UserCard from "../../component/user/UserCard";
import SkillCard from '../../component/user/SkillCard';
import SearchPreference from '../../component/user/SearchPreference';

import { useForm } from '../../utils/useForm';
import useAxios from '../../utils/useAxios';
import SearchContext from '../../context/SearchContext';


const theme = createTheme();

const UserProfilePage = () => {
  const api = useAxios();

  const { searchTerm, setSearchTerm, getSearchResult } = useContext(SearchContext);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    skillsList: [],
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    experience: '',
    perHourRate: '',
    availability: '',
    rating: '',
  };

  const {values, setValues} = useForm(initialValues);

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);

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
          experience: response.data.experience,
          perHourRate: response.data.per_hour_rate,
          availability: response.data.availability,
          rating: response.data.rating,
        });
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Profile details get successfully',
        });
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

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
      { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <UserCard data={values} />
        <SkillCard data={values} />
        <SearchPreference data={values} />
      </Container>
      </ThemeProvider>
      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  )
};

export default UserProfilePage;