import { useContext } from "react";

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
import NoData from "../component/layout/NoData";

const theme = createTheme();

const SearchResultPage = () => {
  const api = useAxios();

  const { 
    searchTerm, 
    setSearchTerm, 
    getSearchResult, 
    values, 
    apiRes, 
    setApiRes 
  } = useContext(SearchContext);

  const addFriend = async friendId => {
    try {
      const response = await api.post('/api/add/friend', {
        friend_id: friendId,
      })

      if (response.status === 200) {
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: response.data,
        });
        getSearchResult();
      }
    } catch(err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Add Friend',
      });
    }
  };

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
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
              <SearchListItem key={index} data={data} addFriend={addFriend} />
            ))
          }
          </List>

          {values.length === 0 && <NoData />}
        </Container>
      </ThemeProvider>

      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  );
};

export default SearchResultPage;