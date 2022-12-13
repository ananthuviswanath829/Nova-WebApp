import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

const PaymentCard = props => {
  return (
    <Grid item xs={12} md={6} style={{marginTop: '15px'}}>
      <CardActionArea component="a">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Payment
            </Typography>
            <div style={{marginTop: '15px'}}>
              <Typography>Node Address: {props.nodeAddress}</Typography>
              <Typography>No. of Blocks: {props.balance}</Typography>
            </div>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default PaymentCard;