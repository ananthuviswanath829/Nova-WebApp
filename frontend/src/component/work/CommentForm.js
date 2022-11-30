import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const CommentForm = props => {
  return (
    <div>
      <h1>Comments</h1>
      <Grid container spacing={2} style={{marginTop: '18px', display: 'flex',  marginLeft: '-10px'}}>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={4}
          value={props.comment}
          onChange={e => props.setComment(e.target.value)}
          style={{width: '90%'}}
        />

        <Button 
          variant='contained' 
          color='success' 
          style={{marginLeft: '10px', height: '45px'}}
          onClick={props.onSubmit}
        >
          Save
        </Button>
      </Grid>
    </div>
  );
};

export default CommentForm;