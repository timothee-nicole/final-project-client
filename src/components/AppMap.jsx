import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const pointsOfInterestImg = new Image(35, 35);
pointsOfInterestImg.src = "https://img.icons8.com/ios/452/point-of-interest.png";
pointsOfInterestImg.crossOrigin = "Anonymous";

class AppMap extends React.PureComponent {
  
    state = {
    lng: null,
    lat: null,
    zoom: 1 // used for map zoom level
  };

  componentDidMount() {
    console.log(this.props.destination)
      if (this.props.destination === "paris"){
          console.log('paris')
          this.setState({
            lng: 2.34,
            lat: 48.86,
            zoom: 12
        })
    } else if (this.props.destination === "london") {
        console.log('london')
        this.setState({
            lng: -0.12,
            lat: 51.51,
            zoom: 13,
        })
    } else if (this.props.destination === "barcelona") {
        console.log('barcelona')
        this.setState({
            lat: 41.39,
            lng: 2.155,
            zoom: 13,
        })
    } else if (this.props.destination === "berlin") {
        console.log("berlin")
        this.setState({
            lat: 52.52,
            lng: 13.4,
            zoom: 13,
        })
    };

  }

  handleClick = (selectedItem) => {
    // Pass the selectedItem back to the parent.
    this.props.handleSelectItem(selectedItem);
  };

  render() {
    console.log(this.state)

    // const vinegarLayer = (
    //   <Layer
    //     type="symbol"
    //     id="vinegars"
    //     images={["vinegar-icon", vinegarImg]}
    //     layout={{ "icon-image": "vinegar-icon" }}
    //   >
    //     {vinegars.map((item, index) => (
    //       <Feature
    //         key={index}
    //         onClick={(event) => this.handleClick(item)}
    //         coordinates={item.location.coordinates}
    //       />
    //     ))}
    //   </Layer>
    // );

    return (
        <>
     {this.state.lat ? <Map
        style="mapbox://styles/mapbox/light-v10"
        zoom={[this.state.zoom]}
        containerStyle={{
          top: 70,
          left: 5,
          bottom: 5,
          right: 5,
          position: 'fixed'}}
          center={[this.state.lng, this.state.lat]} >
    
            (<Layer type="symbol" id="marker" images={["poi-icon", pointsOfInterestImg]} layout={{ "icon-image": "poi-icon" }}>
            {this.props.pointsOfInterest && this.props.pointsOfInterest.map((obj, i) => 
                <Feature onClick={(e) => this.handleClick(obj)}  key={i} coordinates={[obj.geometry.coordinates[0], obj.geometry.coordinates[1]]} />
             )} 
            </Layer>)  
      
        {/* {vinegarLayer} */}
    
      </Map> : <div>Content is loading</div>
      }

      </>
    );
  }
}

export default AppMap;
