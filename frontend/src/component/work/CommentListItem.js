import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const circle = {
  height: '35px',
  width: '35px',
  backgroundColor: '#bbb',
  borderRadius: '50%',
  display: 'inline-block',
  textAlign: 'center',
  fontSize: '22px',
  fontWeight: 'bold',
  color: 'white',
};

const CommentListItem = props => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginTop: '12px' }}>
        <span style={circle}>{`${props.data.full_name[0]}`}</span>
      </div>

      <div style={{ width: '95%', marginLeft: '10px' }}>
        <Card sx={{ width: '100%', marginTop: '10px' }} style={{backgroundColor: '#f5f3f2'}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {`${props.data.full_name} - ${props.data.created_date}`}
            </Typography>
            <Typography>
              {props.data.comment}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommentListItem;