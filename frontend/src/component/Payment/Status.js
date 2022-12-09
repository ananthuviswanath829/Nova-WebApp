import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CachedIcon from '@mui/icons-material/Cached';

const Status = () => {
  return (
    <Container>
      <br/>
      <Grid container spacing={2}>
        <Grid xs={6} style={{textAlign: 'center'}}>
          <h5> <div><ViewInArIcon /></div> No. of Blocks Mined </h5> <hr/>
          <h5 style={{color: '#007bff'}}>#<b></b></h5>
        </Grid>
        <Grid xs={6} style={{textAlign: 'center', marginTop: '20px'}}>
          <h5> <div>Node Address (sync <a href=""><CachedIcon /></a> )</div></h5> <hr/>
          <h5 style={{color: '#007bff'}}>0x</h5>
        </Grid >
        <br/><br/>
      </Grid>
    </Container>
  );
};

export default Status;