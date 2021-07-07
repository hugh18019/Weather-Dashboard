# Weather-Dashboard

Weather-Dashboard is a web application that lets the user enter a city in the world, and makes API calls to retrieve the weather data for that city. Once a city is searched, it's added to the search history. When clicking each city in the search history, the weather data for that city is displayed.

## Installation

To view the website locally, first go into the folder called "Weather-Dashboard" that contains all the related files of the site, and make sure that the index.html and result.html files are at the root. Also make sure that the "assets" folder contains the folder "js", which contains "script.js" and "result.js", and the folder "css", which contains "style.css". After checking that all the files are in place, simply go to the root directory and open the index.html to view the website.

To view the published site through a browser, simply click on this link "https://hugh18019.github.io/Weather-Dashboard/".

## Technology Used

The index.html file of the project uses the Hypertext Markup Language( HTML ) to maintain a logical structure that contains all parts of the site.
The style.css uses css to select tags used by the index.html file to apply styles and manipulations to them to achieve the required look and functionality and interactivity of the website.
The script.js and result.js handle the main functionality of the index.html, which includes handling of user clicks, color coding elements, and storing user input in local storage.
Bootstrap provides additional styling as shortcuts to using an external style sheet. The large majority of the UI elements, including weather icons, forms, and buttons, are styled using Bootstrap.
Moment.js is used to calculate dates for the current day weather as well as the 5 day forecast.
jQuery is also used in this project mainly to select elements from the html files and do work with them.

## Main Features

When first opening up the site, the user can type in the name of a city to get its weather data. When the user clicks the search icon or presses the enter key on their keyboard, they are redirected to the result.html. Meanwhile the script.js makes two API calls. The first is to retrieve the latitude and longitude for the selected city, which were then used as parameters for the second API call to get all the necessary data for display. Then the data returned by the second API call is stored as an object in local storage. The name of the city is also stored in local storage as an element of the pastSearches array, which is used to display the searched cities on left panel when the page reloads for the purpose of persistency. When the user clickes on one of the city from the left panel, the name of the city is used as part of the key to retrieve the corresponding weather data from local storage which is then displayed on the browser window.

Here is a few demo of the features:

![demo1](1.gif 'demo1')

![demo2](2.gif 'demo2')

## Links

Link to deployed site: https://hugh18019.github.io/Weather-Dashboard/ \
Link to code repo: https://github.com/hugh18019/Weather-Dashboard

## License & copyright

Licensed under the [MIT License](LICENSE).
