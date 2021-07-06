var cityDateEl = $( '#city' );
var tempEl = $( '#temperature' );
var humidityEl = $( '#humidity' );
var windSpeedEl = $( '#wind-speed' );
var uviEl = $( '#uvi' );

var pastSearchesListEl = $( '.list-group' );

init();

function init() {
    var pastSearches = JSON.parse( localStorage.getItem( "pastSearches" ) );
    if( !pastSearches ) {
        var pastSearches = [];
        localStorage.setItem( "pastSearches", JSON.stringify( pastSearches ) );
    }
    else {
        for( var each of pastSearches ) {
            displaySearchHistory( each );
        }
    }
}

var key = localStorage.getItem( "currentSearchCity" );
writeWeather( key );

// Outputs the weather data of the current search
// Add add the current search to the list of search history
function writeWeather( key ) {
    
    var weatherDataObj = JSON.parse( localStorage.getItem( key + "_weatherData" ) );
    cityDateEl.text( weatherDataObj.city );

    tempEl.text( "Temperature: " + weatherDataObj.temperature );

    humidityEl.text( "Humidity: " + weatherDataObj.humidity );
    windSpeedEl.text( "Wind Speed: " + weatherDataObj.wind_speed );
    uviEl.text( "UV Index: " + weatherDataObj.uv_index );

    var pastSearches = JSON.parse( localStorage.getItem( "pastSearches" ) );
    if( pastSearches.length === 0 || !pastSearches.includes( key ) ) {

        addToSearchHistory( key );
    }
    
}

// Add the current search to the array of past searches and stores the array
// in local storage
function addToSearchHistory( currentCity ) {
    var pastSearches = JSON.parse( localStorage.getItem( "pastSearches" ) );
    pastSearches.push( currentCity );
    localStorage.setItem( "pastSearches", JSON.stringify( pastSearches ) );

    displaySearchHistory( currentCity );
}


function displaySearchHistory( currentCity ) {
    var searchEl = $( '<button>' );
    searchEl.text( currentCity );
    searchEl.attr( 'type', 'button' );
    searchEl.addClass( "list-group-item" );
    searchEl.addClass( "list-group-item-action" );
    searchEl.addClass( "show-data-btn" );

    pastSearchesListEl.append( searchEl );
}


function displayWeatherData( event ) {
    var btnClicked = $( event.target ) ;
    var cityClicked = btnClicked.text();
    writeWeather( cityClicked );
}


pastSearchesListEl.on( 'click', '.show-data-btn', displayWeatherData );