import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/login/actions";


const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    maxWidth: 400,
    marginTop: 100,
    padding: 20,
    justifyItems: 'center',
  },
  menuButton: {
    marginTop: 20,
  },
  textField: {
    margin: '20px 0',
  },
}));

function LoginForm() {

  const dispatch = useDispatch();

  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState('');
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {
    // dispatch(loginUser(email, password))
  }
  return (
      <Paper className={classes.root}>
        {/*<form onSubmit={console.log('submit')}>*/}
          <div className={classes.textField}>
            <TextField
                name="email"
                fullWidth
                value={email}
                onChange={handleChangeEmail}
                // component={renderTextField}
                label="Email"
                type="email"
            />
          </div>
          <div className={classes.textField}>
            <TextField
                name="password"
                fullWidth
                value={password}
                onChange={handleChangePassword}
                // component={renderTextField}
                label="Password"
                type="password"
            />
          </div>
          <div />
          <div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => dispatch(loginUser(email, password))}
                className={classes.menuButton}
                fullWidth
            >
              Login
            </Button>
          </div>
        {/*</form>*/}
      </Paper>
  );
}

export default LoginForm;
