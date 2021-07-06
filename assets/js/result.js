var cityDateEl = $( '#city' );
var tempEl = $( '#temperature' );
var humidityEl = $( '#humidity' );
var windSpeedEl = $( '#wind-speed' );
var uviEl = $( '#uvi' );



writeWeather();

function writeWeather() {
    var key = localStorage.getItem( "currentSearchCity" );
    var weatherDataObj = JSON.parse( localStorage.getItem( key + "_weatherData" ) );
    cityDateEl.text( weatherDataObj.city );

    tempEl.append( " " + weatherDataObj.temperature );

    humidityEl.append( " " + weatherDataObj.humidity );
    windSpeedEl.append( " " + weatherDataObj.wind_speed );
    uviEl.append( " " + weatherDataObj.uv_index );
}