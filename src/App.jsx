import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/styles/theme'
import CreateTrip from "./pages/trip/CreateTrip"
import OneTrip from "./pages/trip/OneTrip";
import UpdateProfile from "./pages/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import FooterMain from './components/FooterMain'
import SearchPagePOI from "./pages/SearchPagePOI";
import SearchPageActivities from "./pages/SearchPageActivities";
import OneTour from "./pages/OneTour"
import error from "./pages/Error";

function App() {  

  return (
    <div className="App">
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/error" component={error} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/create-trip" component={CreateTrip} />
        <ProtectedRoute exact path="/trip/:id" component={OneTrip} />
        <ProtectedRoute exact path="/search/activities" component={SearchPageActivities} />
        <ProtectedRoute exact path="/activity/:id" component={OneTour} />
        <ProtectedRoute exact path="/profile/edit" component={UpdateProfile} />
        <ProtectedRoute exact path="/search/points-of-interest" component={SearchPagePOI} />
      </Switch>
      <FooterMain />
    </ThemeProvider>
    </div>
  );
}

export default App;
