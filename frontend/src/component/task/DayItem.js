import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import TaskCard from "./TaskCard";

const DayItem = props => {
  return(
    <Grid item xs={12} md={6} style={{margin: '5px'}}>
      <Card sx={{ width: '100%' }} style={{backgroundColor: '#dedede'}}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {props.data.date}
          </Typography>
        </CardContent>
      </Card>

      <div>
        {props.data.task_list.map((data, index) => (<TaskCard key={index} data={data} taskDetailsGet={props.taskDetailsGet} setTaskId={props.setTaskId} />))}
      </div>
    </Grid>
  );
};

export default DayItem;