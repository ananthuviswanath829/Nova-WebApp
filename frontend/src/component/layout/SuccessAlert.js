import { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const style = {
  zIndex: '99',
  width: '40%',
  right: '0',
  position: 'absolute',
  margin: '10px'
};

const SuccessAlert = props => {

  const [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
      props.setApiRes({
        ...props.apiRes,
        showAlert: false,
      });
    }, 3000);
  }, []);

  if (!alert) {
    return null;
  }

  return (
    <Alert severity="success" style={style}>
      <AlertTitle>Success</AlertTitle>
      {props.apiRes.successMsg} - <strong>check it out!</strong>
    </Alert>
  )
};

export default SuccessAlert;