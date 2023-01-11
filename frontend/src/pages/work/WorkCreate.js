import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchContext from "../../context/SearchContext";
import useAxios from "../../utils/useAxios";
import { useForm } from "../../utils/useForm";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";

import TopBar from "../../component/layout/TopBar";
import WorkForm from "../../component/work/WorkForm";
import ErrorModal from "../../component/layout/ErrorModal";
import SuccessAlert from "../../component/layout/SuccessAlert";

const theme = createTheme();

const WorkCreatePage = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const { searchTerm, setSearchTerm, getSearchResult } = useContext(SearchContext);

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const initialValues = {
    workName: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'Pending',
    userId: '',
    description: '',
    showPayBtn: false,
    paymentMethod: '',
    amount: '',
  };

  const {values, handleInputChange} = useForm(initialValues);
  const [apiRes, setApiRes] = useState(resObj);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    getAllFriends();
  }, []);

  const getAllFriends = async () => {
    try {
      const response = await api.get('/api/all/friends/get');

      if (response.status === 200) {
        setFriendsList(response.data);
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Friends Get',
      });
    }
  };

  const createWork = async () => {
    try {
      const response = await api.post('/api/work/create', {
        work_name: values.workName,
        start_date: values.startDate,
        end_date: values.endDate,
        status: values.status,
        user_id: values.userId,
        description: values.description,
        payment_method: values.paymentMethod,
        amount: values.amount,
      });

      if (response.status === 200) {
        navigate('/work/list');
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
        errHeading: 'Work Create',
      });
    }
  };

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
        <Container maxWidth="lg" style={{ marginTop: '10px'}}>
          <Typography component="h3" variant="h4" style={{ textAlign: 'center', marginTop: '10px'}}>Work Create</Typography>
          <WorkForm 
            friendsList={friendsList} 
            values={values} 
            handleInputChange={handleInputChange} 
            submitForm={createWork} 
            mode={'create'}
          />
        </Container>
        <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
      </ThemeProvider>
    </div>
  );
}

export default WorkCreatePage;