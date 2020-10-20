import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: props => props.color,
    width: '80%',
    display: "flex",
    justifyContent: 'center',
  },
  child: {
    width: '200%',
  }
});

const highOrderComponent = (ComponentToPassStyleTo) => {
  return (props) => 
    { const classes = useStyles()
      return <ComponentToPassStyleTo {...props} classes={classes} />}
}

class SearchBar extends Component {

  
  state ={
    search : "",
    // filter: true
  }
 
  handleChange = (event) =>{
    // console.log(event.target.value);

    let value = event.target.value;
    // const key = event.target.name;
    
    this.setState({search:value})
    this.props.handleSearch(value)
  }

//   handleCheck = (evt) => {
//     let value = evt.target.checked
//     this.props.handleCheckBox(
//       value
//     )

    // if (evt.target.checked === true) {
    //   console.log(evt)
    // } else {
    //   console.log('toto')
    // }
//   }

  render() {
    const classes = this.props.classes
    return (
      <div className={`search-bar`}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.root}>
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField className={classes.child} label="Search" id="search" name="search" onChange={this.handleChange} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default highOrderComponent(SearchBar)