import './App.css';
import {compose} from "redux";
import {firestoreConnect, withFirebase} from "react-redux-firebase";
import {connect} from 'react-redux';
import MenuBar from "./Components/MenuBar";
import React from "react";
import LoginPage from './Containers/LoginPage/index';
import HomePage from './Containers/HomePage/index';
import DashboardPage from './Containers/DashboardPage/index';
import LoadingIndicator from "./Components/LoadinfIndicator";
import {Route, Switch} from "react-router";

function App(props) {
    if (!props.auth.isLoaded || props.loading) {
        return <LoadingIndicator/>
    }

  return (
      <>
        <MenuBar />
          {!props.auth.uid ? (
              <Switch>
                  <Route path="/" component={LoginPage}/>
              </Switch>
          ) : (
              <Switch>
                  <Route exact path="/" component={DashboardPage}/>
                  <Route exact path="/homepage" component={HomePage}/>
              </Switch>
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
