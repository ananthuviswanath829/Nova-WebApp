import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';


const SearchListItem = props => {

  const handleAddFriend = () => {
    props.setFriendId(props.data.id);
    props.addFriend();
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${props.data.first_name} ${props.data.last_name}`} secondary={props.data.email} />
        </ListItem>
        <Button variant="outlined" style={{ height: '90%', margin: 'auto'}} onClick={handleAddFriend}>Add</Button>
      </div>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default SearchListItem;