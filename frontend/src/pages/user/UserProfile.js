import TopBar from '../../component/layout/TopBar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import UserCard from "../../component/user/UserCard";

const theme = createTheme();

const UserProfilePage = () => {
  const userData = {
    title: 'Ananthu Viswanath',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  };

  return (
    <div>
      <TopBar />
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <UserCard data={userData} />
      </Container>
      </ThemeProvider>
    </div>
  )
};

export default UserProfilePage;