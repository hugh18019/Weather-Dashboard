var cityDateEl = $( 'city' );
var tempEl = $( 'temperature' );
var humidityEl = $( 'humidity' );
var windSpeedEl = $( 'wind-speed' );
var uviEl = $( 'uvi' );

// console.log( moment().tz("America/Los_Angeles").format() );

writeWeather();

function writeWeather() {
    var weatherDataObj = JSON.parse( localStorage.getItem( "weatherData" ) );
    console.log( weatherDataObj );

}