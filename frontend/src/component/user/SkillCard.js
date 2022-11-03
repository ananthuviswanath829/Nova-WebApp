import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Chip } from '@mui/material';


function SkillCard(props) {
  const { data } = props;

  return (
    <Grid item xs={12} md={6} style={{marginTop: '15px'}}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Skills
            </Typography>
            <Typography style={{marginTop: '15px'}}>
              <Chip label="Chip Outlined" variant="outlined" style={{padding: '5px', margin: '5px'}} />
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

SkillCard.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SkillCard;