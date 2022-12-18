import { useState, useEffect } from "react";

import useAxios from '../../utils/useAxios';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import SideNavigation from "../../component/admin/SideNavigation";
import NoData from "../../component/layout/NoData";
import PaymentConfirmModal from "../../component/admin/PaymentConfirmModal";

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PaymentPendingPage = () => {
  const api = useAxios();

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
  const [pendingList, setPendingList] = useState([]);
  const [showPayModal, setShowPayModal] = useState(false);

  useEffect(() => {
    getPendingPaymentList();
  }, []);

  const getPendingPaymentList = async searchTerm => {
    try {
      const response = await api.get('/api/admin/payment/pending/list/get', {
        params: {search_term: searchTerm}
      });

      if (response.status === 200) {
        setPendingList(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Pending payments get successfully',
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Pending Payments Get',
      });
    }
  };

  const [workId, setWorkId] = useState('');
  const handlePay = row => e => {
    setWorkId(row.id);
    setShowPayModal(true);
  };

  const payUser = async () => {
    try {
      const response = await api.post('/api/admin/pay/user', {
        work_id: workId,
      });

      setShowPayModal(false);
      if (response.status === 200) {
        getPendingPaymentList();
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
        errHeading: 'Pay User',
      });
    }
  };

  return (
    <div>
      <SideNavigation />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div style={{ marginTop: '10px', marginLeft: '210px', marginRight: '10px'}}>
          <div style={{ display: 'flex', margin: '10px', marginTop: '20px'}}>
            <Typography component="h3" variant="h5" style={{ margin: '5px 0px 10px 20px'}}>{`Pending (${pendingList.length})`}</Typography>
            <TextField
              varient="outlined"
              name='workName'
              placeholder="Search........."
              onChange={e => getPendingPaymentList(e.target.value)}
              style={{width: '60%', left: '7%'}}
            />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">SI No</StyledTableCell>
                  <StyledTableCell align="center">Work Name</StyledTableCell>
                  <StyledTableCell align="center">Pay To</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Rating</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{cursor: 'pointer'}}>
                {pendingList.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.pay_to}</StyledTableCell>
                    <StyledTableCell align="center">{row.amount}</StyledTableCell>
                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                    <StyledTableCell align="center">{row.rating}</StyledTableCell>
                    <StyledTableCell align="center">{row.status === 'Completed' && <Button variant="outlined" onClick={handlePay(row)}>Pay</Button>}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {pendingList.length === 0 && <NoData />}
          <PaymentConfirmModal
            showPayModal={showPayModal}
            setShowPayModal={setShowPayModal}
            submitForm={payUser}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default PaymentPendingPage;