import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useNavigate } from 'react-router-dom';


function UserCard(props) {
  const navigate = useNavigate();

  const navigateToSkillEdit = () => {
    const docUrIArr = window.location.href.split('/');
    const urISuffix = docUrIArr[docUrIArr.length - 1];
    if (urISuffix === 'profile') { navigate('/user/profile/edit'); }
  };

  const { data } = props;

  return (
    <Grid item xs={12} md={6} style={{marginTop: '15px'}}>
      <CardActionArea component="a" onClick={navigateToSkillEdit}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {`${data.firstName} ${data.lastName}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.dob}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {data.email}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Per Hour Rate - {data.paymentMethod} {data.userPerHourRate}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Rating - {data.userRating}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 250, display: { xs: 'none', sm: 'block' } }}
            image={data.image}
            alt={data.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

UserCard.propTypes = {
  data: PropTypes.shape({
    dob: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;