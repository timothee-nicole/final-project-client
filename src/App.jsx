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
import SearchPage from './pages/SearchPage'
import UpdateProfile from "./pages/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import FooterMain from './components/FooterMain'

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
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/create-trip" component={CreateTrip} />
        <ProtectedRoute exact path="/trip/:id" component={OneTrip} />
        <ProtectedRoute exact path="/search" component={SearchPage} />
        <ProtectedRoute exact path="/profile/edit" component={UpdateProfile} />
      </Switch>
      <FooterMain />
    </ThemeProvider>
    </div>
  );
}

export default App;
