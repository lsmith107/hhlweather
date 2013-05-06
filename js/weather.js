$(function() {

    // Parsed JSON object containing current condiditons
    var currentWeather;
	var currentWeather2;
	var latitude;
	 var longitude

    // Reference to form
    $weather = $('#weather');
    
    // Reference to resultsData container
    $resultsData = $("#resultsData");
    
    // Setup form event on submit button
    $weather.submit(function(){
        //getZipCode();
		getWeatherResults();
        return false;
    });
      
    // Function to query WeatherUnderground through proxy using the zipCode
    var weatherData = function(latitude, longitude) {
        apiKey = "88e6f4a82f7771eb";
        /*url = "http://weather-api.herokuapp.com/weather/" + apiKey + "/conditions/z/" + zipCode;*/
             url = "http://weather-api.herokuapp.com/weather/" + apiKey + "/conditions/g/" + latitude + "/" + longitude;  
			
		
        $.ajax({
            url: url,			
            success: function(data) {
                currentWeather = JSON.parse(data);
					console.log(data);
					
                displayWeatherData();
            },
            error: function() {
                console.log("Error");
            }
        });
    };
        
    // Function to capture ZIP code from text box on form
    /*var getZipCode = function(){
        // Reference to Zip Code Text Box
        $zipBox = $("#zip");
		 weatherData($zipBox.val());

    };*/
	
	
    
    var displayWeatherData = function(){
		if (!currentWeather.response.error) {
        $resultsData.html(
<<<<<<< HEAD
			"<h2>Current Conditions for: " + currentWeather.current_observation.display_location.full + "</h2>" +
            "<b>Temp: </b>" + currentWeather.current_observation.temperature_string + "<br />" +
            "<b>Wind: </b>" + currentWeather.current_observation.wind_string + ": " + currentWeather.current_observation.wind_mph + " MPH (" + currentWeather.current_observation.wind_kph + " KPH) <br />"
=======
            "Temp: " + currentWeather.current_observation.temperature_string + "<br />" +
            "Wind: " + currentWeather.current_observation.wind_string + " " + currentWeather.current_observation.wind_mph + " MPH (" + currentWeather.current_observation.wind_kph + " KPH) <br />"
>>>>>>> 1264e3361526dd1f15a8731b3998c5722a3b34de
        ); 
		}else {
		$resultsData.html(currentWeather.response.error.description);
		}
    };
	
	var input = document.getElementById('cityState');
	var options = {
	types: ['(cities)'],
  componentRestrictions: {country: 'us'}
};

	autocomplete = new google.maps.places.Autocomplete(input, options);
	//console.log(autocomplete);
	
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
 
    var place = autocomplete.getPlace();
	
	  latitude = place.geometry.location.lat();
	 longitude = place.geometry.location.lng();   
 	  
	});
	
	var getWeatherResults = function() {
		weatherData(latitude, longitude);
	
	};
});