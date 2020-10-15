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

function App() {

  // const theme = 
  //   createMuiTheme({
  //     palette: {
  //       primary: {
  //           main: '#0800a3',
  //           light: '#554dff',
  //           dark: '#737373'
  //       },
  //       secondary: {
  //           main: '#f1c232ff',
  //           light: '#f0cc00'
  //       }
  //     },
    
  //   })
  

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
      </Switch>
    </ThemeProvider>
    </div>
  );
}

export default App;
