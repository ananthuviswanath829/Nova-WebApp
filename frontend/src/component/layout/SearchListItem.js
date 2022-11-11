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

  const handleAddFriend = () => {
    props.addFriend(props.data.id);
  };

  const navigateToProfile = () => {
    navigate(`/person/profile/${props.data.id}`);
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
        {props.data.status === 'Not friend' && <Button 
                                                  variant="outlined" 
                                                  style={btnStyle} 
                                                  onClick={handleAddFriend}
                                                >
                                                  Add
                                                </Button>}
        {props.data.status === 'Request sent' && <Button 
                                                    variant="outlined" 
                                                    color='secondary' 
                                                    style={btnStyle}
                                                    size='small'
                                                  >
                                                    Request sent
                                                  </Button>}
        {props.data.status === 'Friend' && <Button 
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