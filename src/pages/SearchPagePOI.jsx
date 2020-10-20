import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import AppMap from '../components/AppMap'
import { withUser } from '../components/Auth/withUser'
import EachPOI from '../components/EachPOI'
import SearchBar from '../components/SearchBar'


class SearchPagePOI extends Component {
    
    state = {
        data: "",
        destination: this.props.location.state.trip.destination,
        id: this.props.location.state.trip._id
    }

    
    addToTrip = async (id) => {
        // console.log(id)
        try {
            const dbRes = await apiHandler.getOneTrip(this.props.location.state.trip._id)

            const newTrip = {...dbRes}
            newTrip.pointsOfInterest.push(id)
            console.log(newTrip)

          const apiRes = await apiHandler.modifyTrip(this.props.location.state.trip._id, newTrip)
                console.log(apiRes)
        } catch (error) {
            console.log(error)
        }    
    }
        
    

    componentDidMount() {
        // console.log(this.state)

        apiHandler
            .getPointsOfInterest(this.state.destination)
            .then((apiRes) => {
                // console.log(apiRes.data.features)
                const filteredData = apiRes.data.features.filter((obj) => {
                    return obj.properties.rate <= 3
                })
                filteredData.sort((a, b) => {
                   return a.properties.rate < b.properties.rate ? 1 : a.properties.rate > b.properties.rate ? -1 : 0 
                })
                // console.log(filteredData)
                this.setState({
             data: filteredData
            })})
    }
    
    
    handleNewSearch = (search) => {
        if(!search){
        apiHandler
        .getPointsOfInterest(this.state.destination)
        .then((apiRes) => {
            // console.log(apiRes)
            const filteredData = apiRes.data.features.filter((obj) => {
                return obj.properties.rate <= 3
            })
            filteredData.sort((a, b) => {
               return a.properties.rate < b.properties.rate ? 1 : a.properties.rate > b.properties.rate ? -1 : 0 
            })
            this.setState({
                data: filteredData
            })
        })
        }else{
            console.log(search)
            
            const copyData = [...this.state.data]
                    
                //   console.log()
            this.setState({ 
                data: copyData.filter((obj,i) => {
                return (obj.properties.name.includes(search))}
                )
            })
        }
    }
                                
    onSelectItem = (selectedItem) => {
        this.setState({ selectedItem: selectedItem });
      };
                               
                                
                                
    render() {
        return (
            <div>&nbsp;
                <EachPOI pointsOfInterest={this.state.selectedItem} addToTrip={this.addToTrip} />
                <AppMap id={this.state.id} handleSelectItem={this.onSelectItem} destination={this.state.destination} pointsOfInterest={this.state.data}/>
                   
            
            </div>
        )
    }
}


export default withUser(SearchPagePOI)
