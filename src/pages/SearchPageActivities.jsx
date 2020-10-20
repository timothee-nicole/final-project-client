import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import {withUser} from '../components/Auth/withUser'
import EachTour from '../components/EachTour'
import SearchBar from '../components/SearchBar'

class SearchPage extends Component {

    
    
    state = {
        data: "",
        destination: this.props.location.state.trip.destination,
        id: this.props.location.state.trip._id
    }

    
    addToTrip = async (id) => {
        console.log(id)
        try {
            const dbRes = await apiHandler.getOneTrip(this.props.location.state.trip._id)

            const newTrip = {...dbRes}
            newTrip.tour.push(id)
            console.log(newTrip)

          const apiRes = await apiHandler.modifyTrip(this.props.location.state.trip._id, newTrip)
                console.log(apiRes)
        } catch (error) {
            console.log(error)
        }    
    }
        
    

    componentDidMount() {
        console.log(this.state)

        apiHandler
            .getActivities(this.state.destination)
            .then((apiRes) => {
                this.setState({
             data: apiRes.data
            })})
    }
    
    
    handleNewSearch=(search)=> {
        if(!search){
        apiHandler
        .getActivities(this.state.destination)
        .then((apiRes) => {
            console.log(apiRes)
            this.setState({
                data: apiRes.data
            })
        })
        }else{
            console.log(search)
            
            const copyData = [...this.state.data]
                    
                  // console.log(copyData[0].name)
            this.setState({ 
                data: copyData.filter((obj,i) => {
                return (obj.name.includes(search))}
                )
            })
        }
    }
                                
                                
                                
                                
    render() {
    // console.log('toto :', this.state.data)
    // let activities = this.state.data
        return (
            <div>
                <SearchBar handleSearch={this.handleNewSearch}/>
                <EachTour id={this.state.id} tourList={this.state.data} addToTrip={this.addToTrip} />
            </div>
        )
    }
}


export default withUser(SearchPage)
