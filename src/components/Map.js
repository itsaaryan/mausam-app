import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";

export class MapContainer extends Component {
  onInfoWindowClose = () => {};

  render() {
    return (
      <div className="map-design">
        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.props?.coord?.lat,
            lng: this?.props?.coord?.lon,
          }}
          zoom={14}
        >
          <Marker
            name={this.props?.name}
            position={{
              lat: this.props?.coord?.lat,
              lng: this?.props?.coord?.lon,
            }}
          />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.props?.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNWsW0ksXUFMdmHr2HfFCk4XYj-HF5SRM",
})(MapContainer);
