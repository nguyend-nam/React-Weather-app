import React, {Component} from "react";

export default class PolluteComponent extends Component {
  state = {
    place: null
  };

  fetchdb() {
    var apikey = 'd3bcd430a04cb83bc5bd73e385a9030f';
  	fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + this.props.lat + '&lon=' + this.props.lon + '&appid=' + apikey)
  	.then(function(resp) { return resp.json() }) // Convert data to json
    .then(
  		 data => this.setState({
         place: data})
  	)
    .catch((error) => { console.log(error) });
  }
  componentDidUpdate(prevProps){
    if (prevProps.lon !== this.props.lon || prevProps.lat !== this.props.lat) {
      this.fetchdb();
    }
  }
  componentDidMount(){
      this.fetchdb();
  }

  render() {

    if (!this.state.place) {
      return <div>Detailed temperature info</div>;
    }

    var days;
    if(this.state.place.list !== undefined){
      days = this.state.place.list.map((day) => {
        return(
          <>
            <h5>Air Quality index (AQi): <b>{day.main.aqi}</b></h5>
            <ul>
              <li key="co"><b>CO<sub>2</sub></b>: {day.components.co}μg/m<sup>3</sup></li>
              <li key="nh3"><b>NH<sub>3</sub></b>: {day.components.nh3}μg/m<sup>3</sup></li>
              <li key="no"><b>NO</b>: {day.components.no}μg/m<sup>3</sup></li>
              <li key="no2"><b>NO<sub>2</sub></b>: {day.components.no2}μg/m<sup>3</sup></li>
              <li key="o3"><b>O<sub>3</sub></b>: {day.components.o3}μg/m<sup>3</sup></li>
              <li key="pm10"><b>PM<sub>10</sub></b>: {day.components.pm10}μg/m<sup>3</sup></li>
              <li key="so2"><b>SO<sub>2</sub></b>: {day.components.so2}μg/m<sup>3</sup></li>
            </ul>
          </>
        );
      });
    }
    return (
      <div>
        {days}
      </div>
    );
  }
}
