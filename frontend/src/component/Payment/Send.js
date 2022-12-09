import { Form } from '../../utils/useForm';

import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const Send = () => {
  return (
    <Container>
      <div style={{textAlign: 'center'}}>
        <h2>SudoCoin</h2>
        <h3><b style={{color: '#007bff'}}>Send crypto to anyone.</b> </h3>
      </div>

      <Form>
        <TextField
          id="recipient"
          label="Recipient"
          // value={props.values.description}
          // onChange={props.handleInputChange('description')}
        />

        <TextField
          id="amount"
          label="Amount"
          // value={props.values.description}
          // onChange={props.handleInputChange('description')}
          style={{ width: '50%' }}
        />

        <Button 
          variant='contained' 
          type='submit'
          style={{ marginTop: '8px', height: '55px'}}
        >
          Submit
        </Button>
      </Form>
    </Container>
  )
};

export default Send;