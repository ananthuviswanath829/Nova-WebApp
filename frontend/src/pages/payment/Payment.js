import { useState, useEffect } from 'react';

import useAxios from '../../utils/useAxios';
import { useForm } from '../../utils/useForm';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Send from "../../component/Payment/Send";
import Status from "../../component/Payment/Status";
import SuccessAlert from '../../component/layout/SuccessAlert';
import ErrorModal from '../../component/layout/ErrorModal';

const theme = createTheme();

const PaymentPage = () => {
  const api = useAxios();
  
  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const initialValues = {
    nodeAddress: '',
    balance: '',
    recipient: '',
    amount: '',
  };

  const {values, setValues, handleInputChange} = useForm(initialValues);
  const [apiRes, setApiRes] = useState(resObj);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const response = await api.get('/api/etherium/status/get');

      if (response.status === 200) {
        setValues({
          ...values,
          nodeAddress: response.data.node_address,
          balance: response.data.balance,
          recipient: '',
          amount: '',
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Transactions Get',
      });
    }
  };

  const sendEtherium = async () => {
    try {
      const response = await api.post('/api/etherium/transaction', {
        recipient: values.recipient,
        amount: values.amount,
      });

      if (response.status === 200) {
        getStatus();
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
        { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}
        <Status data={values} />
        <Send values={values} handleInputChange={handleInputChange} sendEtherium={sendEtherium} />
        <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </ThemeProvider>
  );
};

export default PaymentPage;