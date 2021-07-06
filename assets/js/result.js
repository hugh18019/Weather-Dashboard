var cityDateEl = $( '#city' );
var tempEl = $( '#temperature' );
var humidityEl = $( '#humidity' );
var windSpeedEl = $( '#wind-speed' );
var uviEl = $( '#uvi' );

var pastSearchesUlEl = $( '.list-group' );

var pastSearches = [];
localStorage.setItem( "pastSearches", JSON.stringify( pastSearches ) );

writeWeather();

// Outputs the weather data of the current search
// Add add the current search to the list of search history
function writeWeather() {
    var key = localStorage.getItem( "currentSearchCity" );
    var weatherDataObj = JSON.parse( localStorage.getItem( key + "_weatherData" ) );
    cityDateEl.text( weatherDataObj.city );

    tempEl.append( " " + weatherDataObj.temperature );

    humidityEl.append( " " + weatherDataObj.humidity );
    windSpeedEl.append( " " + weatherDataObj.wind_speed );
    uviEl.append( " " + weatherDataObj.uv_index );

    addToSearchHistory( key );
}

// Add the current search to the array of past searches and stores the array
// in local storage
function addToSearchHistory( currentCity ) {
    var pastSearches = JSON.parse( localStorage.getItem( "pastSearches" ) );
    pastSearches.push( currentCity );
    
    var searchEl = $( '<button>' );
    searchEl.text( currentCity );
    searchEl.attr( 'type', 'button' );
    searchEl.addClass( "list-group-item" );
    searchEl.addClass( "list-group-item-action" );

    pastSearchesUlEl.append( searchEl );

}