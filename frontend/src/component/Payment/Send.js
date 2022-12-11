import { Form } from '../../utils/useForm';

import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const Send = props => {
  const submitForm = e => {
    e.preventDefault();
    props.sendEtherium();
  };

  return (
    <Container>
      <div style={{textAlign: 'center'}}>
        <h2>ETHERIUM</h2>
        <h3><b style={{color: '#007bff'}}>Send etherium to anyone.</b> </h3>
      </div>

      <Form onSubmit={submitForm}>
        <TextField
          id="recipient"
          label="Recipient"
          value={props.values.recipient}
          onChange={props.handleInputChange('recipient')}
        />

        <TextField
          id="amount"
          label="Amount"
          value={props.values.amount}
          onChange={props.handleInputChange('amount')}
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