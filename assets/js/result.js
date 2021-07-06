

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






//////////////////////////////// From script.js ////////////////////////////////

var cityFormEl = $( '#city-form' );
var inputEl = $( '#city-name' );
let latitude;
let longitude;
var city;


function handleSubmit( event ) {
    event.preventDefault();
    city = inputEl.val();
    getAPI();
}



cityFormEl.on('submit', handleSubmit );

// Makes an API call to a service to retrieve the latitude and longitude of a city
// and then use the latitude and longitude to make another API call to retrieve more 
// complete data on the weather of a city
function getAPI( ) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=57c122dd425f67042e057496d307055a";
    fetch( requestUrl )
        .then( function ( response ) {
            return response.json();
        })
        .then( function ( data ) {
            console.log( data );
            getLatLon( data.city.coord.lat, data.city.coord.lon);
        })
        .then( function (  ) {
            getWeather(  );
        })
        .then( )
}

// Gets the latitude and longitude from the data retured by the API call
// and stores them into the corresponding global variables
function getLatLon( lat, lon ) {
    if( lat && lon ) {
        latitude = lat;
        longitude = lon;
    }
    console.log( latitude );
    console.log( longitude );
}

// Makes an API call using the correct latitude and longitude to retrieve more complete data including UV index
function getWeather( ) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=57c122dd425f67042e057496d307055a";
    fetch( requestUrl )
        .then( function ( response ) {
            return response.json();
        })
        .then( function ( data ) {
            console.log( data );
            storeData( data );
        })
}



// Accepts the data returned by the API call in getWeather() and stores it as an object in local storage
// Calls addToSearchHistory() to add the current search to search history
// Calls writeWeather() to display weather data of current search
function storeData( data ) {
    console.log( city );
    var weatherData = { 
        city : city,
        temperature : data.current.temp,
        humidity : data.current.humidity,
        wind_speed : data.current.wind_speed,
        uv_index : data.current.uvi
    }

    localStorage.setItem( "currentSearchCity", city );
    localStorage.setItem( city + "_weatherData", JSON.stringify( weatherData ) );

    addToSearchHistory( city );
    writeWeather( city );
}