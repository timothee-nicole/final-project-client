import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import '../styles/dashboard.css'
import Button from '@material-ui/core/Button'



class Dashboard extends Component {

    state = {
        user: null
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    componentDidMount = () => {
        apiHandler
            .getProfile()
            .then((res) => {
                this.setState({
                    user: res.data
                })
            })
            .catch((err) => console.log(err))
    }

    handleDelete = (id) => {
        console.log(id)
        apiHandler
            .deleteTrip(id)
            .then((apiRes) => {
                console.log('toto')
                const newUser = {...this.state.user}
                const idToDelete = newUser.trips.indexOf(id)
                newUser.trips.splice(idToDelete, 1)
                apiHandler
                    .modifyProfile(newUser)
                    .then((apiRes) => {
                        console.log(apiRes)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                
                window.location.reload(false)
            })
            .catch((apiErr) => {
                console.log(apiErr)
            })
    }

    render() {
        // console.log(this.state.user && this.state.user.trips[0].destination)
        const loaded = this.state.user && this.state.user.trips
        console.log(this.props)

        return (<section className="dashboard">
            <div className="dashboard-head">
                <h1> Welcome To Your Dashboard</h1>&nbsp;
                <h3> This is the place to manage your trips ! </h3>&nbsp;
                <p> In the dashboard you can edit your trips, take a look at your past trips if you want to share what you did to friends, and even delete them if you're sure to never forget ! </p>&nbsp;
                <p>Nota bene: You shouldn't book more than 2 activities per day, otherwise the schedule will be tight</p>
            </div>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <td>Destination</td>
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td>View/Edit Trip</td>
                            <td>Delete Trip</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded ? this.state.user.trips.map((obj, i) => (<tr>
                            <td key={i} className="to-stylize">{this.capitalize(obj.destination)}</td>
                            <td className="to-stylize">{obj.dateBegin.substr(0,10)}</td>
                            <td className="to-stylize">{obj.dateEnd.substr(0,10)}</td>
                            <td><a href={`/trip/${obj._id}`}><Button variant="contained" color="primary">View Details</Button></a></td>
                            <td><Button variant="contained" onClick={() => this.handleDelete(obj._id)}>Delete</Button></td>
                            
                        </tr>))
                         : <td>is Loading</td>}
                    </tbody>
                </table>

            </section>
        )
    }
}

export default Dashboard