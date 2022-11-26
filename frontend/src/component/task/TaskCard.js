import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TaskCard = props => {
  const handleClick = e => {
    props.taskDetailsGet();
    props.setTaskId(props.data.task_id);
  };

  return (
    <Card sx={{ width: '100%', marginTop: '10px' }} style={{backgroundColor: 'white', cursor: 'pointer'}} onClick={handleClick}>
      <CardContent sx={{ flex: 1 }}>
        <Typography component="h4" variant="h6">
          {props.data.task_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;