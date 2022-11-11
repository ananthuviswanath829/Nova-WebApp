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

const SearchListItem = props => {
  const navigate = useNavigate();

  const handleAccpetRequest = () => {
    props.acceptRequest(props.data.id);
  };

  const handleCancelRequest = () => {
    props.cancelRequest(props.data.id);
  };

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
        {props.data.status === 'request received' && <Button 
                                                  variant="outlined" 
                                                  style={btnStyle} 
                                                  onClick={handleAccpetRequest}
                                                >
                                                  Accept
                                                </Button>}
        {props.data.status === 'request sent' && <Button 
                                                    variant="outlined" 
                                                    color='secondary' 
                                                    style={btnStyle}
                                                    size='small'
                                                    onClick={handleCancelRequest}
                                                  >
                                                    Cancel Request
                                                  </Button>}
        {props.data.status === 'friends' && <Button 
                                              variant="outlined" 
                                              color='success' 
                                              style={btnStyle} 
                                              >
                                                Friends
                                              </Button>}
      </div>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default SearchListItem;