/**
 *
 * MenuBar
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Button from '@material-ui/core/Button';
import {withFirebase} from 'react-redux-firebase';
import {auth} from "../../utils/firebaseConfig";
import {history} from "../../store";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MenuBar(props) {
  const classes = useStyles();

  const handleClick = async () => {
    await auth.signOut();
    window.location.href = '/';
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={()=>history.push("/")}
        >
          <ReceiptIcon />
        </IconButton>
        <Typography variant="subtitle1" className={classes.title}>
          Intrusion Detection System
        </Typography>
        {props.auth.uid ? (
          <div>
            <Button onClick={handleClick} color="inherit">
              Logout
            </Button>
          </div>
        ) : (
          <div/>
        )}
      </Toolbar>
    </AppBar>
  );
}

MenuBar.propTypes = {};
const mapStateToProps = ({firebase}) => {
  return {
    auth: firebase.auth
  }
};

const mapDispatchToProps = {};
export default withRouter(compose(connect(mapStateToProps, mapDispatchToProps))(withFirebase(MenuBar)));
