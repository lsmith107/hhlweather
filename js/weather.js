$(function() {

    // Parsed JSON object containing current condiditons
    var currentWeather;

    // Reference to form
    $weather = $('#weather');
    
    // Reference to resultsData container
    $resultsData = $("#resultsData");
    
    // Setup form event on submit button
    $weather.submit(function(){
        getZipCode();
        return false;
    });
      
    // Function to query WeatherUnderground through proxy using the zipCode
    var weatherData = function(zipCode) {
        apiKey = "88e6f4a82f7771eb";
        url = "http://weather-api.herokuapp.com/weather/" + apiKey + "/conditions/z/" + zipCode;
            
        $.ajax({
            url: url,
            success: function(data) {
                currentWeather = JSON.parse(data);
                //console.log("Success");
                displayWeatherData();
            },
            error: function() {
                console.log("Error");
            }
        });
    };
        
    // Function to capture ZIP code from text box on form
    var getZipCode = function(){
        // Reference to Zip Code Text Box
        $zipBox = $("#zip");
		 weatherData($zipBox.val());

    };
    
    var displayWeatherData = function(){
		if (!currentWeather.response.error) {
        $resultsData.html(
            "Temp: " + currentWeather.current_observation.temperature_string + "<br />" +
            "Wind: " + currentWeather.current_observation.wind_string + " " + currentWeather.current_observation.wind_mph + " MPH (" + currentWeather.current_observation.wind_kph + " KPH) <br />"
        ); 
		}else {
		$resultsData.html(currentWeather.response.error.description);
		}
    };
});