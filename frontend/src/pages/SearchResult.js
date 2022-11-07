import { useState, useEffect, useContext } from "react";

import SearchContext from "../context/SearchContext";
import useAxios from "../utils/useAxios";

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import TopBar from "../component/layout/TopBar";
import ErrorModal from "../component/layout/ErrorModal";
import SuccessAlert from "../component/layout/SuccessAlert";
import SearchListItem from "../component/layout/SearchListItem";


const theme = createTheme();

const SearchResultPage = () => {
  const api = useAxios();

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
  const [values, setValues] = useState([]);

  useEffect(() => {
    getSearchResult();
  }, [])

  const getSearchResult = async () => {
    try {
      const response = await api.get('/api/search/result/get', {
        params: {search_term: searchTerm}
      });

      if (response.status === 200) {
        setValues(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Search result get successfully',
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
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg" style={{ marginTop: '10px'}}>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
          {
            values.map((data, index) => (
              <SearchListItem key={index} />
            ))
          }
          </List>
        </Container>
      </ThemeProvider>

      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  );
};

export default SearchResultPage;