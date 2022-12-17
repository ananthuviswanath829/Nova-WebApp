import { useContext, useState, useEffect } from "react";

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
import CommentForm from "../../component/work/CommentForm";
import CommentListItem from "../../component/work/CommentListItem";

const theme = createTheme();

const WorkEditPage = () => {
  const api = useAxios();

  const docUrIArr = window.location.href.split('/');
  const workId = docUrIArr[docUrIArr.length - 1];

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
    status: '',
    assignedTo: '',
    userId: '',
    description: '',
    showPayBtn: false,
    paymentMethod: '',
    amount: '',
  };

  const {values, setValues, handleInputChange} = useForm(initialValues);
  const [apiRes, setApiRes] = useState(resObj);

  useEffect(() => {
    getWorkDetails();
  }, []);

  const getWorkDetails = async () => {
    try {
      const response = await api.get('/api/work/details/get', {
        params: {work_id: workId}
      });

      if (response.status === 200) {
        getAllComments();
        const data = response.data;
        setValues({
          ...values,
          workName: data.name,
          startDate: new Date(data.start_date),
          endDate: new Date(data.end_date),
          status: data.status,
          userId: data.user_id,
          assignedTo: data.assigned_to,
          description: data.description,
          showPayBtn: data.show_pay_btn,
          paymentMethod: data.payment_method,
          amount: data.amount,
        });
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

  const editWork = async () => {
    try {
      const response = await api.post('/api/work/edit', {
        work_id: workId,
        user_id: values.userId,
        work_name: values.workName,
        start_date: values.startDate,
        end_date: values.endDate,
        status: values.status,
        description: values.description,
        payment_method: values.paymentMethod,
        amount: values.amount,
      });

      if (response.status === 200) {
        getWorkDetails();
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
        errHeading: 'Work Edit',
      });
    }
  };

  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const commentSave = async () => {
    try {
      const response = await api.post('/api/work/comment/save', {
        work_id: workId,
        comment: comment,
      });

      if (response.status === 200) {
        setComment('');
        getAllComments();
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
        errHeading: 'Work Edit',
      });
    }
  };

  const getAllComments = async () => {
    try {
      const response = await api.get('/api/work/comments/get', {
        params: {work_id: workId}
      });

      if (response.status === 200) {
        setCommentList(response.data);
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

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
        <Container maxWidth="lg" style={{ marginTop: '10px'}}>
          <Typography component="h3" variant="h4" style={{ textAlign: 'center', marginTop: '10px'}}>Work Edit</Typography>
          <WorkForm 
            values={values} 
            handleInputChange={handleInputChange} 
            submitForm={editWork}
            mode={'edit'}
          />

          <CommentForm comment={comment} setComment={setComment} onSubmit={commentSave} />
          {
            commentList.map((data, index)=> (
              <CommentListItem key={index} data={data} />
            ))
          }
        </Container>
        <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
      </ThemeProvider>
    </div>
  );
};

export default WorkEditPage;