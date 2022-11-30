import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchContext from "../../context/SearchContext";
import useAxios from "../../utils/useAxios";

import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

import TopBar from "../../component/layout/TopBar";
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


const WorkListPage = () => {
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

  const [apiRes, setApiRes] = useState(resObj);
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    getWorksList();
  }, []);

  const getWorksList = async () => {
    try {
      const response = await api.get('/api/work/list/get');

      if (response.status === 200) {
        setWorkList(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Works get successfully',
        });
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Works Get',
      });
    }
  };

  const navigateToCreate = () => {
    navigate('/work/create');
  };

  const navigateToEdit = row => e => {
    navigate(`/work/edit/${row.id}`);
  };

  const handleDelete = row => e => {
    deleteWork(row.id);
  };

  const deleteWork = async workId => {
    try {
      const response = await api.delete(`/api/work/delete/${workId}`);

      if (response.status === 200) {
        // setModalIsOpen(false);
        getWorksList();
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

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg" style={{ marginTop: '10px'}}>
          <div style={{ display: 'flex', margin: '10px'}}>
            <Typography component="h3" variant="h5" style={{ margin: '5px 0px 10px 20px'}}>{`Works (${workList.length})`}</Typography>
            <Button variant='outlined' style={{ marginLeft: 'auto'}} onClick={navigateToCreate}>Create</Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Assigned To</StyledTableCell>
                  <StyledTableCell align="center">Created By</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{cursor: 'pointer'}}>
                {workList.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" align="center" onClick={navigateToEdit(row)}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" onClick={navigateToEdit(row)}>{row.description}</StyledTableCell>
                    <StyledTableCell align="center" onClick={navigateToEdit(row)}>{row.assigned_to}</StyledTableCell>
                    <StyledTableCell align="center" onClick={navigateToEdit(row)}>{row.created_by}</StyledTableCell>
                    <StyledTableCell align="center"><DeleteIcon onClick={handleDelete(row)} /></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {workList.length === 0 && <NoData />}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default WorkListPage;