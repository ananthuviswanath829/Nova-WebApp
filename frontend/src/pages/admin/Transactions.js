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

import SideNavigation from "../../component/admin/SideNavigation";
import NoData from "../../component/layout/NoData";

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

const TransactionsPage = () => {
  const api = useAxios();

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    getTransactionList();
  }, []);

  const getTransactionList = async searchTerm => {
    try {
      const response = await api.get('/api/admin/transaction/list/get', {
        params: {search_term: searchTerm}
      });

      if (response.status === 200) {
        setTransactionList(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Transactions get successfully',
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

  return (
    <div>
      <SideNavigation />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div style={{ marginTop: '10px', marginLeft: '210px', marginRight: '10px'}}>
          <div style={{ display: 'flex', margin: '10px', marginTop: '20px'}}>
            <Typography component="h3" variant="h5" style={{ margin: '5px 0px 10px 20px'}}>{`Transactions (${transactionList.length})`}</Typography>
            <TextField
              varient="outlined"
              name='workName'
              placeholder="Search........."
              onChange={e => getTransactionList(e.target.value)}
              style={{width: '60%', left: '7%'}}
            />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">SI No</StyledTableCell>
                  <StyledTableCell align="center">Transaction Id</StyledTableCell>
                  <StyledTableCell align="center">Work Name</StyledTableCell>
                  <StyledTableCell align="center">Paid From</StyledTableCell>
                  <StyledTableCell align="center">Paid To</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Rating</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{cursor: 'pointer'}}>
                {transactionList.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">{row.transaction_id}</StyledTableCell>
                    <StyledTableCell align="center">{row.work_name}</StyledTableCell>
                    <StyledTableCell align="center">{row.paid_from}</StyledTableCell>
                    <StyledTableCell align="center">{row.paid_to}</StyledTableCell>
                    <StyledTableCell align="center">{row.amount}</StyledTableCell>
                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                    <StyledTableCell align="center">{row.rating}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {transactionList.length === 0 && <NoData />}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default TransactionsPage;