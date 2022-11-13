import { useState, useEffect, useContext } from "react";

import SearchContext from "../../context/SearchContext";
import useAxios from "../../utils/useAxios";

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";

import TopBar from "../../component/layout/TopBar";
import FriendListItem from "../../component/friend/FriendListItem";
import ErrorModal from "../../component/layout/ErrorModal";
import SuccessAlert from "../../component/layout/SuccessAlert";
import NoData from "../../component/layout/NoData";

const theme = createTheme();

const FriendsListPage = () => {
  const api = useAxios();

  const { searchTerm, setSearchTerm, getSearchResult } = useContext(SearchContext);

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    getFriendsList();
  }, [])

  const getFriendsList = async () => {
    try {
      const response = await api.get('/api/friends/list/get');

      if (response.status === 200) {
        setFriendsList(response.data);
        setApiRes({
          ...apiRes,
          showAlert: true,
          successMsg: 'Friends get successfully',
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

  return(
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} getSearchResult={getSearchResult} />
      { apiRes.showAlert && <SuccessAlert apiRes={apiRes} setApiRes={setApiRes} />}

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg" style={{ marginTop: '10px'}}>
          <Typography component="h3" variant="h5" style={{ margin: '5px 0px 10px 20px'}}>{`Friends (${friendsList.length})`}</Typography>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
          {
            friendsList.map((data, index) => (
              <FriendListItem key={index} data={data} />
            ))
          }
          </List>

          {friendsList.length === 0 && <NoData />}
        </Container>
      </ThemeProvider>

      <ErrorModal apiRes={apiRes} setApiRes={setApiRes} />
    </div>
  );
};

export default FriendsListPage;