import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CachedIcon from '@mui/icons-material/Cached';

const Status = props => {
  return (
    <Container>
      <br/>
      <Grid container spacing={2}>
        <Grid xs={6} style={{textAlign: 'center'}}>
          <h5> <div><ViewInArIcon /></div> No. of Blocks </h5> <hr/>
          <h5 style={{color: '#007bff'}}>#{props.data.balance}<b></b></h5>
        </Grid>
        <Grid xs={6} style={{textAlign: 'center', marginTop: '20px'}}>
          <h5> <div>Node Address (sync <a href=""><CachedIcon /></a> )</div></h5> <hr/>
          <h5 style={{color: '#007bff'}}>{props.data.nodeAddress}</h5>
        </Grid >
        <br/><br/>
      </Grid>
    </Container>
  );
};

export default Status;