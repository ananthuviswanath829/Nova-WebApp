import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

import { useNavigate } from 'react-router-dom';

const PaymentCard = props => {
  const navigate = useNavigate();

  const navigateToEdit = () => {
    const docUrIArr = window.location.href.split('/');
    const urISuffix = docUrIArr[docUrIArr.length - 1];
    if (urISuffix === 'profile') { navigate('/user/profile/edit'); }
  };

  return (
    <Grid item xs={12} md={6} style={{marginTop: '15px'}}>
      <CardActionArea component="a" onClick={navigateToEdit}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Payment
            </Typography>
            <div style={{marginTop: '5px'}}>
              <Typography variant='overline' style={{fontSize: '16px'}}>Etherium</Typography>
              <Typography>Node Address: {props.nodeAddress}</Typography>
              <Typography>No. of Blocks: {props.balance}</Typography>
            </div>

            <div style={{marginTop: '5px'}}>
              <Typography variant='overline' style={{fontSize: '16px'}}>Super Coin</Typography>
              <Typography>Node Address: {props.superCoinNodeAddress}</Typography>
              <Typography>No. of Blocks: {props.superCoins}</Typography>
            </div>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default PaymentCard;