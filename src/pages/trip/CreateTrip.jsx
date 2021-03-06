import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import {withUser} from '../../components/Auth/withUser'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import apiHandler from '../../api/apiHandler';
import '../../styles/create-trip.css'

class CreateTrip extends Component {
    state = {
        dateBegin: "",
        dateEnd: "",
        destination:"",
        tripLength: 0,
        error: false
    }

    handleChange = (e) => {
        e.preventDefault();

        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value,
        })
        
        // console.log(e.target.value)
        // console.log(e.target.name)

    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const oneDay = 24 * 60 * 60 * 1000
        const numberOfDays = Math.round(((Date.parse(this.state.dateEnd) - Date.parse(this.state.dateBegin)) / oneDay) +1 )
        if (numberOfDays <= 0 || !this.state.destination) {
            this.setState({
                error: !this.state.error
            })
        }
        const newUser = {...this.props.context.user}

        this.setState({
            tripLength: numberOfDays,
        })
        console.log(numberOfDays)
        if (numberOfDays <= 0) {
        } else{
            // console.log("ce qu'on va créer",this.state)
            apiHandler
                .createTrip(this.state)
                .then((data) => {
                    newUser.trips.push(data._id)
                    // console.log(newUser)
                    apiHandler
                        .modifyProfile(newUser)
                        .then((res) => {
                            console.log(res)
                        })
                    // this.props.context.setUser(newUser)
                    this.props.history.push(`/trip/${data._id}`)

                })
                .catch((err) => {
                    // console.log(err)
                });
        }
        
    }


    render() {
        // console.log('dans render', this.props.context.user.trips)
        return (
            <div className="create-trip">
                <form className="create-trip-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <h1>Create Your Trip !</h1>
            &nbsp;
            <p>Start by picking your trip dates and the destination you are going to ! <br /><br /> You will then arrive on your Trip page from which you can have a look at what you planned. <br/><br /> You will also be able to search for interesting activities and points of interest in that destination, pick them up and let's create the perfect schedule ! </p><br /> <br />
                    <div>
                    <TextField style={{width: '45%'}} type="date" variant="outlined" defaultValue="2020-10-23" label="Start Date" name="dateBegin" required/> &nbsp; 
                    <TextField style={{width: '45%'}} type="date" variant="outlined" defaultValue="2020-10-30" label="End Date" name="dateEnd" required/>
                    </div><br />

                    <FormControl variant="outlined" style={{width: '70%'}}>
                        <InputLabel id="destination">Destination</InputLabel>
                        <Select labelId="destination" name="destination" placeholder="Destination" onChange={this.handleChange}>
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={"paris"}>Paris</MenuItem>
                            <MenuItem value={"london"}>London</MenuItem>
                            <MenuItem value={"berlin"}>Berlin</MenuItem>
                            <MenuItem value={"barcelona"}>Barcelona</MenuItem>
                        </Select><br />
                    <div> {this.state.error ? <p> Invalid date or destination</p> : ''}</div>
                    <Button color="primary" variant="contained" type="button" onClick={this.handleSubmit}>Create Trip</Button>
                    </FormControl>


                </form>
            </div>
        )
    }
}

export default withUser(CreateTrip)
