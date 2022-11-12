import { useNavigate } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

const btnStyle = {
  height: '90%', 
  margin: 'auto'
};

const FriendListItem = props => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/person/profile/${props.data.user_id}`);
  };

  return (
    <>
      <div style={{ display: 'flex', cursor: 'pointer' }}>
        <ListItem onClick={navigateToProfile}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${props.data.first_name} ${props.data.last_name}`} secondary={props.data.email} />
        </ListItem>
        <Button variant="outlined" color='success' style={btnStyle}>Message</Button>
      </div>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default FriendListItem;