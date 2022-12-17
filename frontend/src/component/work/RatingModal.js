import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RatingModal = props => {

  const handleClose = () => {
    props.setShowRatingModal(false);
  };

  return (
    <div>
      <Modal
        open={props.showRatingModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please rate your work
          </Typography>
          <Stack spacing={1} style={{margin: '5px', padding: '5px'}}>
            <Rating 
              name="half-rating" 
              precision={0.5}
              value={props.values.rating}
              onChange={(event, newValue) => {
                props.setValues({
                  ...props.values,
                  rating: newValue,
                });
              }}
            />
            <Button variant='outlined' onClick={props.submitForm}>Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default RatingModal;