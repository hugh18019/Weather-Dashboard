

var cityDateEl = $( '#city' );
var tempEl = $( '#temperature' );
var humidityEl = $( '#humidity' );
var windSpeedEl = $( '#wind-speed' );
var uviEl = $( '#uvi' );
var cloudsEl = $( '#clouds' );
var day1El = $( '.day1' );
var day2El = $( '.day2' );
var day3El = $( '.day3' );
var day4El = $( '.day4' );
var day5El = $( '.day5' );


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
displayWeather( key );

// Outputs the weather data of the current search
// Add add the current search to the list of search history
function displayWeather( key ) {
    
    var weatherDataObj = JSON.parse( localStorage.getItem( key + "_weatherData" ) );
    if( weatherDataObj ) {
        // Display city name and date
        var date = getDate( weatherDataObj.timezone );
        cityDateEl.text( weatherDataObj.city + " " + date );

        var iconCode = weatherDataObj.icon;
        var iconEl = $('<img>');
        iconEl.attr( "src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png" );
        cityDateEl.append( iconEl );


        // Displays the cloud symbol, etc.
        if( weatherDataObj.clouds.includes( 'cloud' ) ){
            var cloudsIcon = $( '<i>' );
            cloudsIcon.addClass( "bi bi-cloud" );
            cloudsEl.append( cloudsIcon );
        }
        tempEl.text( "Temperature: " + weatherDataObj.temperature );
        humidityEl.text( "Humidity: " + weatherDataObj.humidity );
        windSpeedEl.text( "Wind Speed: " + weatherDataObj.wind_speed );
        uviEl.text( "UV Index: " + weatherDataObj.uv_index );

        display5DayForecast( weatherDataObj, date );
    }
    
    // This is for landing on the result page for and first time or when entering a 
    // new search that is not in the search history
    // If this is one of the above cases, add the current search to search history
    var pastSearches = JSON.parse( localStorage.getItem( "pastSearches" ) );
    if( pastSearches.length === 0 || !pastSearches.includes( key ) ) {
        addToSearchHistory( key );
    } 
}

// date is the current date which would need to be incremented for each of the future dates
function display5DayForecast( weatherDataObj, date ) {
    $(day1El).children().eq(0).text( addDays( date, 1 ) );
    var iconCode1 = weatherDataObj.day1.weather[0].icon;
    $(day1El).children().eq(1).attr( "src", "http://openweathermap.org/img/wn/" + iconCode1 + "@2x.png");
    $(day1El).children().eq(2).text( "Temp: " + weatherDataObj.day1.temp.day );
    $(day1El).children().eq(3).text( "Humidity: " + weatherDataObj.day1.humidity );

    $(day2El).children().eq(0).text( addDays( date, 2 ) );
    var iconCode2 = weatherDataObj.day2.weather[0].icon;
    $(day2El).children().eq(1).attr( "src", "http://openweathermap.org/img/wn/" + iconCode2 + "@2x.png");
    $(day2El).children().eq(2).text( "Temp: " + weatherDataObj.day2.temp.day );
    $(day2El).children().eq(3).text( "Humidity: " + weatherDataObj.day2.humidity );

    $(day3El).children().eq(0).text( addDays( date, 3 ) );
    var iconCode3 = weatherDataObj.day3.weather[0].icon;
    $(day3El).children().eq(1).attr( "src", "http://openweathermap.org/img/wn/" + iconCode3 + "@2x.png");
    $(day3El).children().eq(2).text( "Temp: " + weatherDataObj.day3.temp.day );
    $(day3El).children().eq(3).text( "Humidity: " + weatherDataObj.day3.humidity );

    $(day4El).children().eq(0).text( addDays( date, 4 ) );
    var iconCode4 = weatherDataObj.day4.weather[0].icon;
    $(day4El).children().eq(1).attr( "src", "http://openweathermap.org/img/wn/" + iconCode4 + "@2x.png");
    $(day4El).children().eq(2).text( "Temp: " + weatherDataObj.day4.temp.day );
    $(day4El).children().eq(3).text( "Humidity: " + weatherDataObj.day4.humidity );

    $(day5El).children().eq(0).text( addDays( date, 5 ) );
    var iconCode5 = weatherDataObj.day5.weather[0].icon;
    $(day5El).children().eq(1).attr( "src", "http://openweathermap.org/img/wn/" + iconCode5 + "@2x.png");
    $(day5El).children().eq(2).text( "Temp: " + weatherDataObj.day5.temp.day );
    $(day5El).children().eq(3).text( "Humidity: " + weatherDataObj.day5.humidity );
}


function addDays( date, days ) {

    let options = {
        year : 'numeric',
        month : 'numeric',
        day : 'numeric'
    };
    var nd = new Date( date );
    nd.setDate( nd.getDate() + days );
    return nd.toLocaleDateString( options );
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


function handleHistoryClick( event ) {
    var btnClicked = $( event.target ) ;
    var cityClicked = btnClicked.text();
    displayWeather( cityClicked );
}


pastSearchesListEl.on( 'click', '.show-data-btn', handleHistoryClick );


function getDate( timezone ) {
    let options = {
        timeZone : timezone,
        year : 'numeric',
        month : 'numeric',
        day : 'numeric'
    },
    formatter = new Intl.DateTimeFormat( [], options );
    return formatter.format( new Date() );
}



//////////////////////////////// From script.js ////////////////////////////////
///////////////// Haven't found a way to reuse code from another js file ////////////

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
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=57c122dd425f67042e057496d307055a";
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
        uv_index : data.current.uvi,
        clouds : data.current.weather[0].main,
        icon : data.current.weather[0].icon,
        day1 : data.daily[0],
        day2 : data.daily[1],
        day3 : data.daily[2],
        day4 : data.daily[3],
        day5 : data.daily[4]
    }

    localStorage.setItem( "currentSearchCity", city );
    localStorage.setItem( city + "_weatherData", JSON.stringify( weatherData ) );

    addToSearchHistory( city );
    displayWeather( city );
}