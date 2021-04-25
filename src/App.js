import './App.css';
import clsx from 'clsx';
import {compose} from "redux";
import { NavLink } from 'react-router-dom';
import {firestoreConnect, withFirebase} from "react-redux-firebase";
import {connect} from 'react-redux';
import MenuBar from "./Components/MenuBar";
import React from "react";
import LoginPage from './Containers/LoginPage/index';
import HomePage from './Containers/HomePage/index';
import DashboardPage from './Containers/DashboardPage/index';
import LoadingIndicator from "./Components/LoadinfIndicator";
import {Route, Switch} from "react-router";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from "@material-ui/core/Button";
import {auth} from "./utils/firebaseConfig";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    },
}));
const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});
function App(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if (!props.auth.isLoaded || props.loading) {
        return <LoadingIndicator/>
    }
    const handleClick = async () => {
        await auth.signOut();
        window.location.href = '/';
    };

  return (
      <>
        <MenuBar />
          {!props.auth.uid ? (
              <Switch>
                  <Route path="/" component={LoginPage}/>
              </Switch>
          ) : (
              <div className={classes.root}>
                  <CssBaseline />
                  <AppBar
                      position="fixed"
                      className={clsx(classes.appBar, {
                          [classes.appBarShift]: open,
                      })}
                  >
                      <Toolbar>
                          <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              onClick={handleDrawerOpen}
                              edge="start"
                              className={clsx(classes.menuButton, open && classes.hide)}
                          >
                              <MenuIcon />
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
                  <Drawer
                      className={classes.drawer}
                      variant="persistent"
                      anchor="left"
                      open={open}
                      classes={{
                          paper: classes.drawerPaper,
                      }}
                  >
                      <div className={classes.drawerHeader}>
                          <IconButton onClick={handleDrawerClose}>
                              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                          </IconButton>
                      </div>
                      <Divider />
                      <List>
                          {[{name:'Dataset Visualization',to:'/'}, {name:'Detected Attacks',to:'/detected-attacks'}].map((text, index) => (
                              <ListItem component={LinkBtn} button key={text} to={text.to}>
                                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                  <ListItemText primary={text.name} />
                              </ListItem>
                          ))}
                      </List>
                  </Drawer>
                  <main
                      className={clsx(classes.content, {
                          [classes.contentShift]: open,
                      })}
                  >
                      <div className={classes.drawerHeader} />
                      <Switch>
                          <Route path="/detected-attacks" component={HomePage}/>
                          <Route exact path="/" component={DashboardPage}/>
                      </Switch>
                  </main>
              </div>

          )}
      </>
  );
}
const mapStateToProps = ({firebase,loginReducer}) => {
  return {
    auth: firebase.auth,
    loading: loginReducer.loading
  }
};

const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
