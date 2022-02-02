import React, {Component} from "react";

export default class InfoComponent extends Component {
  state = {
    loading: true,
		found : false,
    temp: '',
    templike: '',
    humid: '',
    status: '',
    descr: '',
    visi: '',
    press: '',
    wind: '',
    icon: '',
    place: null
  };

  fetchdb() {
    var apikey = 'd3bcd430a04cb83bc5bd73e385a9030f';
  	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.props.name + '&appid=' + apikey)
  	.then(function(resp) { return resp.json() }) // Convert data to json
    .then(
  		 data => this.setState({
         place: data,
         temp: Math.round(parseFloat(data.main.temp)-273.15) + '°C',
         templike: Math.round(parseFloat(data.main.feels_like)-273.15) + '°C',
         humid: data.main.humidity + '%',
         status: data.weather[0].main,
         descr: data.weather[0].description,
         visi: data.visibility / 1000 + 'km',
         press: data.main.pressure + 'hPa',
         wind: data.wind.speed + 'm/s',
         icon: 'http://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png',
         loading: false,
			   found: true})
  	)
    .catch((error) => {
			console.log(error)
			this.setState({found: false, loading: false})
		});
  }
  componentDidUpdate(prevProps){
    if (prevProps.name !== this.props.name) {
      this.fetchdb();
    }
  }
  componentDidMount(){
      this.fetchdb();
  }

  render() {
    if (this.state.loading) {
      return <div>Weather Info</div>;
    }

    if (this.state.found == false) {
      return <div>Place couldn't be found</div>;
    }

    else{ return (
      <div>
        <h4><b>{this.state.place.name}, {this.state.place.sys.country}</b></h4>
        <h2><img src={this.state.icon} height="55px"/><span>{this.state.temp}</span></h2>
        <span>{this.state.status}, {this.state.descr}</span><br/>
        <div className="summary">
          <span>Feels like: {this.state.templike}</span><br/>
          <span>Humidity: {this.state.humid}</span><br/>
          <span>Wind speed: {this.state.wind}</span><br/>
          <span>Visibility: {this.state.visi}</span><br/>
          <span>Pressure: {this.state.press}</span>
        </div>
      </div>
    );}
  }
}
