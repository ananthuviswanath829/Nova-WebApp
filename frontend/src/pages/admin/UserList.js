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
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import MainNavigation from "../../component/admin/MainNavigation";
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

const UserListPage = () => {
  const api = useAxios();

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
  const [userList, setUserList] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async searchTerm => {
    try {
      const response = await api.get('/api/admin/user/list/get', {
        params: {search_term: searchTerm}
      });

      if (response.status === 200) {
        setUserList(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Users get successfully',
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Users Get',
      });
    }
  };

  const handleDelete = userId => e => {
    toggleUser(userId);
  };

  const toggleUser = async userId => {
    try {
      const response = await api.delete(`/api/admin/user/toggle/${userId}`);

      if (response.status === 200) {
        getUsersList();
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
        errHeading: 'Toggle User',
      });
    }
  };

  return (
    <div>
      <MainNavigation />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div style={{ marginTop: '10px', marginLeft: '210px', marginRight: '10px'}}>
          <div style={{ display: 'flex', margin: '10px', marginTop: '20px'}}>
            <Typography component="h3" variant="h5" style={{ margin: '5px 0px 10px 20px'}}>{`Users (${userList.length})`}</Typography>
            <TextField
              varient="outlined"
              name='workName'
              placeholder="Search........."
              onChange={e => getUsersList(e.target.value)}
              style={{width: '60%', left: '10%'}}
            />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">SI No</StyledTableCell>
                  <StyledTableCell align="center">Full Name</StyledTableCell>
                  <StyledTableCell align="center">E-mail</StyledTableCell>
                  <StyledTableCell align="center">Date of Birth</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{cursor: 'pointer'}}>
                {userList.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">{row.full_name}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.dob}</StyledTableCell>
                    <StyledTableCell align="center"><Switch onChange={handleDelete(row.id)} checked={row.is_active} /></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {userList.length === 0 && <NoData />}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default UserListPage;