import React, {Component} from "react";
import Pollute from './PolluteComponent';
import Info from './InfoComponent';

export default class ForecastComponent extends Component {
  state = {
    loading: true,
    place: null
  };

  fetchdb() {
    var apikey = 'd3bcd430a04cb83bc5bd73e385a9030f';
  	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.props.name + '&appid=' + apikey)
  	.then(function(resp) { return resp.json() }) // Convert data to json
    .then(
  	  data => this.setState({
        place: data,
        loading: false})
  	)
    .catch((error) => { console.log(error) });
  }
  componentDidUpdate(prevProps){
    if (prevProps.name !== this.props.name) {
      this.fetchdb();
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="landing">
          <div className="banner">
            <img src="img/icon.png" height="150px" width="150px" alt="Weather" />
            <h2>Weather Now web-app</h2>
            <div className="link"><a target="_blank" href="https://github.com/NguyenD-Nam/React-Weather-app">&rarr; Source code</a></div>
          </div>
          <div className="features">
            <div><i class="fas fa-cloud-sun"></i><div>Input country or city name to get weather info.</div></div>
            <div><i class="fas fa-info-circle"></i><div>Detailed temperature, humidity, air quality info, etc. are shown with 5 days forecast.</div></div>
            <div><i class="fas fa-database"></i><div>Fetch Api from Open Weather Map Apis.</div></div>
          </div>
        </div>
      );
    }

    var days;
    if(this.state.place.list !== undefined){
      days = this.state.place.list.map((day) => {
        var date = new Date(day.dt * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return(
          <tr>
            <td>{day.dt_txt}</td>
            <td>{Math.round(parseFloat(day.main.temp)-273.15)}°C</td>
            <td>{day.main.humidity}%</td>
            <td>{day.wind.speed}m/s</td>
          </tr>
        );
      });
      return (
        <div className="grid">
          <Info name={this.props.name} />
          <Pollute lon={this.state.place.city.coord.lon} lat={this.state.place.city.coord.lat} />
          <div className="forecast span-2">
            <table>
            <tbody>
              <tr>
                <th>Date & Time</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Wind Speed</th>
              </tr>
              {days}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return (
      <div className="landing">
        <div className="banner notfound">
          <h1><div>4&#9731;4</div></h1>
          <h2>OPPS! PAGE NOT FOUND</h2>
        </div>
      </div>
    );
  }
}
