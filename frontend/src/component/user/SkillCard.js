import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Chip } from '@mui/material';

import { useNavigate } from 'react-router-dom';


function SkillCard(props) {
  const navigate = useNavigate();

  const { data } = props;
  
  const navigateToSkillEdit = () => {
    const docUrIArr = window.location.href.split('/');
    const urISuffix = docUrIArr[docUrIArr.length - 1];
    if (urISuffix == 'profile') { navigate('/user/profile/edit'); }
  };

  return (
    <Grid item xs={12} md={6} style={{marginTop: '15px'}}>
      <CardActionArea component="a" onClick={navigateToSkillEdit}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Skills
            </Typography>
            <div style={{marginTop: '15px'}}>
              {
                data.skillsList.map((val, index) => (
                  <Chip label={`${val.skill} - ${val.experience} Years`} key={index} variant="outlined" style={{padding: '5px', margin: '5px'}} />
                ))
              }
            </div>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default SkillCard;