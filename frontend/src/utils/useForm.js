import { useState } from "react";
import { makeStyles } from "@mui/styles";

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = name => event => {
    let value = '';
    if(name === 'dob' || name === 'startDate' || name === 'endDate') { value = event } else { value = event.target.value }
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: '8px',
    }
  }
}));

export const Form = props => {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};