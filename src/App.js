import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Map from "./components/Map";

export default class App extends Component {
  state = {
    place: {},
    currWeather: {},
    forecast: [],
  };

  componentDidMount = async () => {
    const exchangeAPI = `https://v2.api.forex/rates/latest.json?beautify=true&key=c396c71e-2684-4ce1-b3a6-8ac88df941e6`;
    const res1 = await fetch(exchangeAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    console.log(res1);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=f68b80f16191617605c5b3aa6ebc0735`;
      const res = await fetch(url);
      const JSONres = await res.json();
      const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=f68b80f16191617605c5b3aa6ebc0735`;
      const res2 = await fetch(forecastURL);
      const JSONres2 = await res2.json();
      console.log(JSONres, JSONres2);
      this.setState({ currWeather: JSONres, forecast: JSONres2.list });
    });
  };

  setPlace = async (newplace) => {
    await this.setState({ place: newplace });
    this.weatherAPI();
  };

  weatherAPI = async () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.place}&units=metric&appid=f68b80f16191617605c5b3aa6ebc0735`;
    const res = await fetch(url);
    const JSONres = await res.json();
    const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.place}&units=metric&appid=f68b80f16191617605c5b3aa6ebc0735`;
    const res2 = await fetch(forecastURL);
    const JSONres2 = await res2.json();
    console.log(JSONres, JSONres2);
    this.setState({ currWeather: JSONres, forecast: JSONres2.list });
  };

  render() {
    const { currWeather, forecast } = this.state;

    return (
      <div className="app">
        <h4 style={{ marginTop: "-30px" }}>
          {Date().toLocaleString().substring(0, 21)}
        </h4>
        <h2 className="center" style={{ marginTop: "-10px" }}>
          <em>Mausam App</em>
        </h2>
        <br />
        <div className="set-search-middle">
          <SearchBar setPlace={this.setPlace} />
        </div>
        <div className="row">
          <div className="col l6 m6 s12">
            <div style={{ background: "#87ceeb", textAlign: "center" }}>
              <h4>
                {currWeather?.name}, {currWeather?.sys?.country}
              </h4>
              <h5 style={{ display: "flex", justifyContent: "center" }}>
                {currWeather && currWeather?.weather?.length >= 1 && (
                  <div>
                    <img
                      src={`http://openweathermap.org/img/wn/${currWeather?.weather[0].icon}@2x.png`}
                    />
                  </div>
                )}
                <span style={{ marginTop: "auto", marginBottom: "auto" }}>
                  {currWeather?.main?.temp}°C
                </span>
              </h5>
              <p>
                Min - {currWeather?.main?.temp_min}°C | Max -{" "}
                {currWeather?.main?.temp_max}°C{" "}
              </p>
              {forecast.length >= 1 && (
                <>
                  {" "}
                  <h3>Next 3 days Forecast</h3>
                  <table>
                    <tr>
                      <td>{forecast[0].dt_txt.substring(0, 10)}</td>
                      <td>
                        <p
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {forecast && forecast[0]?.weather?.length >= 1 && (
                            <div>
                              <img
                                src={`http://openweathermap.org/img/wn/${forecast[0]?.weather[0].icon}@2x.png`}
                              />
                            </div>
                          )}
                          <span
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            {forecast[0]?.main?.temp}°C
                          </span>
                        </p>
                      </td>
                      <td>
                        {forecast && forecast[0]?.weather?.length >= 1 && (
                          <p>{forecast[0]?.weather[0].description}</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>{forecast[7].dt_txt.substring(0, 10)}</td>
                      <td>
                        <p
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {forecast && forecast[7]?.weather?.length >= 1 && (
                            <div>
                              <img
                                src={`http://openweathermap.org/img/wn/${forecast[7]?.weather[0].icon}@2x.png`}
                              />
                            </div>
                          )}
                          <span
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            {forecast[7]?.main?.temp}°C
                          </span>
                        </p>
                      </td>
                      <td>
                        {forecast && forecast[7]?.weather?.length >= 1 && (
                          <p>{forecast[7]?.weather[0].description}</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>{forecast[14].dt_txt.substring(0, 10)}</td>
                      <td>
                        <p
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {forecast && forecast[14]?.weather?.length >= 1 && (
                            <div>
                              <img
                                src={`http://openweathermap.org/img/wn/${forecast[14]?.weather[0].icon}@2x.png`}
                              />
                            </div>
                          )}
                          <span
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            {forecast[14]?.main?.temp}°C
                          </span>
                        </p>
                      </td>
                      <td>
                        {forecast && forecast[14]?.weather?.length >= 1 && (
                          <p>{forecast[14]?.weather[0].description}</p>
                        )}
                      </td>
                    </tr>
                  </table>
                </>
              )}
            </div>
            <table className="card">
              <tr>
                <th>Currency</th>
                <th>Price</th>
                <th>%change</th>
              </tr>
              <tr>
                <td>INR</td>
                <td>0.013 USD</td>
                <td>0.23%</td>
              </tr>
              <tr>
                <td>INR</td>
                <td> 0.012 USD</td>
                <td>0.19%</td>
              </tr>
            </table>
          </div>
          <div className="col s12 m6 l6" style={{ marginTop: "10px" }}>
            <Map
              coord={this.state.currWeather?.coord}
              name={this.state.currWeather?.name}
            />
          </div>
        </div>
      </div>
    );
  }
}
