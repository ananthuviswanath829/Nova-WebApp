import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';


const SearchListItem = props => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${props.data.first_name} ${props.data.last_name}`} secondary={props.data.email} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default SearchListItem;