import { Typography } from "@mui/material";

const NoData = () => {
  return(
    <div style={{ textAlign: 'center', marginTop: '50px'}}>
      <Typography component="h4" variant="h4" color="text.secondary">No data found!</Typography>
    </div>
  );
};

export default NoData;