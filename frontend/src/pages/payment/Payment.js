import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";

import Send from "../../component/Payment/Send";
import Status from "../../component/Payment/Status";
import Transaction from "../../component/Payment/Transaction";

const theme = createTheme();

const PaymentPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Status />
        <Send />
        <Transaction />
    </ThemeProvider>
  );
};

export default PaymentPage;