import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

const Transaction = () => {
  return (
    <Container>
      <div style={{textAlign: 'center'}}>
        <h2><b> Transactions </b></h2>
        <p>(Sync to get the latest transactions in the blockchain)</p>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Amount (Sudo)</TableCell>
                <TableCell align="center">Timestamp</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Amount (Sudo)</TableCell>
                <TableCell align="center">Timestamp</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default Transaction;