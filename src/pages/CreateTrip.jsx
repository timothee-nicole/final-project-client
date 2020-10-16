import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import {withUser} from '../components/Auth/withUser'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import apiHandler from '../api/apiHandler';

class CreateTrip extends Component {
    state = {
        dateBegin: "",
        dateEnd: "",
        destination:"",
        redirect: false
    }

    handleChange = (e) => {
        e.preventDefault();

        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
        // console.log(e.target.value)
        // console.log(e.target.name)

    }

    handleSubmit = (e) => {
        e.preventDefault()

        apiHandler
            .createTrip(this.state)
            .then((data) => {
                console.log(data._id);
                this.props.history.push(`/trip/${data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        console.log(this.props.history)
        return (
            <div>
                <form className="form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <div>
                    <TextField style={{width: '45%'}} type="date" variant="outlined" defaultValue="2020-07-14" label="Start Date" name="dateBegin"/> &nbsp; 
                    <TextField style={{width: '45%'}} type="date" variant="outlined" defaultValue="2020-07-21" label="End Date" name="dateEnd"/>
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

                    <Button color="primary" variant="contained" type="button" onClick={this.handleSubmit}>Create Trip</Button>
                    </FormControl>


                </form>
            </div>
        )
    }
}

export default withUser(CreateTrip)
