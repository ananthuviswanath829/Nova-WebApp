import { useState, useEffect,useContext } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import TopBar from '../../component/layout/TopBar';
import ErrorModal from '../../component/layout/ErrorModal';
import SuccessAlert from '../../component/layout/SuccessAlert';
import UserCard from '../../component/user/UserCard';
import SkillCard from '../../component/user/SkillCard';

import useAxios from '../../utils/useAxios';
import { useForm } from '../../utils/useForm';
import SearchContext from '../../context/SearchContext';

const theme = createTheme();

const PersonProfilePage = () => {
  const api = useAxios();

  const { searchTerm, setSearchTerm, getSearchResult } = useContext(SearchContext);
  
  const docUrIArr = window.location.href.split('/');
  const userId = docUrIArr[docUrIArr.length - 1];

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    skillsList: [],
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    paymentMethod: '',
    userPerHourRate: '',
    userRating: '',
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
    getPersonProfile();
  }, [])

  const getPersonProfile = async () => {
    try {
      const response = await api.get('/api/person/profile/get', {
        params: {user_id: userId}
      });

      if (response.status === 200) {
        setValues({
          ...values, 
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          dob: response.data.dob,
          skillsList: response.data.skills_list,
          paymentMethod: response.data.payment_method,
          userPerHourRate: response.data.user_per_hour_rate,
          userRating: response.data.user_rating,
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

  return(
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
      { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <UserCard data={values} />
        <SkillCard data={values} />
      </Container>
      </ThemeProvider>
      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  )
};

export default PersonProfilePage;