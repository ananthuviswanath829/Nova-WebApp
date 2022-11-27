import { useContext, useState, useEffect } from "react";

import SearchContext from "../context/SearchContext";
import useAxios from "../utils/useAxios";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Button, ButtonGroup } from "@mui/material";

import TopBar from "../component/layout/TopBar";
import ErrorModal from '../component/layout/ErrorModal';
import SuccessAlert from '../component/layout/SuccessAlert';
import DayItem from "../component/task/DayItem";
import TaskModal from "../component/task/TaskModal";

const theme = createTheme();

const FeedsPage = () => {
  const api = useAxios();

  const { searchTerm, setSearchTerm, getSearchResult } = useContext(SearchContext);

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  let taskData = {
    taskName: '',
    taskDate: '',
    startTime: '',
    endTime: '',
  };

  const[initialData, setInitialData] = useState(taskData);

  useEffect(() => {
    tasksListGet();
  }, [])

  const [apiRes, setApiRes] = useState(resObj);
  const [taskList, setTaskList] = useState([]);
  const [count, setCount] = useState(0);

  const tasksListGet = async () => {
    try {
      const response = await api.get('/api/task/list/get', {
        params: {count: count}
      });

      if (response.status === 200) {
        setTaskList(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Tasks get successfully',
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Tasks Get',
      });
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskId, setTaskId] = useState('');

  const openTaskModal = () => {
    setTaskId('');
    setInitialData({
      ...initialData,
      taskName: '',
      taskDate: '',
      startTime: '',
      endTime: '',
    });
    setModalIsOpen(true);
  };

  const createTask = async values => {
    try {
      const response = await api.post('/api/task/create', {
        task_name: values.taskName,
        task_date: values.taskDate,
        start_time: values.startTime,
        end_time: values.endTime,
      });

      if (response.status === 200) {
        setModalIsOpen(false);
        tasksListGet();
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
        errHeading: 'Task Create',
      });
    }
  };

  const editTask = async values => {
    try {
      const response = await api.post('/api/task/edit', {
        task_id: taskId,
        task_name: values.taskName,
        task_date: values.taskDate,
        start_time: values.startTime,
        end_time: values.endTime,
      });

      if (response.status === 200) {
        setModalIsOpen(false);
        tasksListGet();
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
        errHeading: 'Task Create',
      });
    }
  };

  const taskDetailsGet = async () => {
    try {
      const response = await api.get('/api/task/details/get', {
        params: {task_id: taskId}
      });

      if (response.status === 200) {
        setInitialData({
          ...initialData,
          taskName: response.data.task_name,
          taskDate: response.data.task_date,
          startTime: response.data.start_time,
          endTime: response.data.end_time,
        });
        
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Task details get successfully',
        });

        setModalIsOpen(true);
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Tasks Get',
      });
    }
  };

  const deleteTask = async () => {
    try {
      const response = await api.delete(`/api/task/delete/${taskId}`);

      if (response.status === 200) {
        setModalIsOpen(false);
        tasksListGet();
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
        errHeading: 'Task Create',
      });
    }
  };

  const handlePreviousClick = () => {
    setCount(count - 7);
    tasksListGet();
  };

  const handleNextClick = () => {
    setCount(count + 7);
    tasksListGet();
  };

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
      { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Container maxWidth="lg">
          <ButtonGroup size="large" aria-label="large button group" style={{marginTop: '10px'}}>
            <Button variant="outlined" onClick={handlePreviousClick}>Previous Week</Button>
            <Button variant="outlined" onClick={openTaskModal}>Create Task</Button>
            <Button variant="outlined" onClick={handleNextClick}>Next Week</Button>
          </ButtonGroup>
          <div style={{display: 'flex', marginTop: '10px'}}>
            {taskList.map((data, index) => (<DayItem key={index} data={data} taskDetailsGet={taskDetailsGet} setTaskId={setTaskId} />))}
          </div>
        </Container>
      </ThemeProvider>
      { modalIsOpen && <TaskModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} createTask={createTask} editTask={editTask} data={initialData} taskId={taskId} deleteTask={deleteTask} />}
      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  )
};

export default FeedsPage;