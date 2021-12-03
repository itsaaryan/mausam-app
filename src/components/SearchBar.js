import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  state = {
    place: "",
  };

  setPlace(e) {
    e.preventDefault();
    this.props.setPlace(this.state.place);
  }

  render() {
    return (
      <div className="row">
        <input
          className="col s10 m10 l10"
          placeholder="city name"
          onChange={(e) => this.setState({ place: e.target.value })}
          value={this.state.place}
        />
        <button
          className="btn col s2 m2 l2"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          type="submit"
          onClick={(e) => this.setPlace(e)}
        >
          GO
        </button>
      </div>
    );
  }
}
