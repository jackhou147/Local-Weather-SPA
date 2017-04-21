$(document).ready(function(){
    var $apiBtn = $(".api-btn");
    function myFunction(){
    if(navigator.geolocation){
        var latitude;
        var longitude;
        var tempK;
        var tempC;
        var tempF;
        var city;
        var country;
        var windSp;
        var weatherDesc;
        var humid;
        var airPre;
        var tempOut;
        var windDeg;
        var $city = $(".app__city");
        var $country = $(".app__country");
        var $deg = $(".app__degree");
        var $winSp = $(".app__wind-speed");
        var $humid = $(".app__humidity");
        var $weatherIcon = $(".app__weather-icon img");
        navigator.geolocation.getCurrentPosition(function showPosition(position){
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            $("#lat").append(latitude);
            $("#lon").append(longitude);
            //start ajax request
            $.ajax({
             url : "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=5163ab06e9f52f12b5b002d0dac27f47",
             dataType : "jsonp",
             success: function(json){
                 console.log(json);
                 tempK = Math.floor(json.main.temp);
                 tempC = Math.floor(tempK -273.15);
                 tempF = Math.floor(tempK -459.67)+"°F";
                 city = json.name;
                 $("#city").append(city);
                 country = json.sys.country;
                 console.log("country: "+country);
                 $("#country").append(country);
                 windSp = json.wind.speed;
                 console.log("wind speed: "+windSp);
                 $("#windSp").append(windSp);
                 weatherDesc = json.weather[0].description;
                 $("#weatherDesc").append(weatherDesc);
                 humid = json.main.humidity;
                 console.log("humidity: "+humid);
                 $("#humid").append(humid);
                 tempOut = tempC;
                 console.log("temperature: "+tempOut);
                 /*$deg.append(tempOut + "°");*/
                 $deg.append("<span style='font-weight: 100'>"+tempOut+"°"+"</span>")
                 $("#switch").append(tempF)
                 $("#toggleWeather").click(function toggleWeather(){
                   $("span").toggle();
                });
                 windDeg = json.wind.deg;
                 console.log("Wind degree: "+windDeg);
                 $("#windDeg").append(windDeg);
                 if(json.weather[0].description == "broken clouds"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/04d.png");
                 }else if(json.weather[0].description == "clear sky"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/01d.png");
                 }else if(json.weather[0].description == "few clouds"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/02d.png");
                 }else if(json.weather[0].description == "scattered clouds"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/03d.png");
                 }else if(json.weather[0].description == "shower rain"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/09d.png");
                 }else if(json.weather[0].description == "rain"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/10d.png");
                 }else if(json.weather[0].description == "thunderstorm"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/11d.png");
                 }else if(json.weather[0].description == "snow"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/13d.png");
                 }else if(json.weather[0].description == "mist"){
                     $weatherIcon.attr("src", "http://openweathermap.org/img/w/50d.png");
                 }

             }
            });
            $.ajax({
                url : /*"http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=5163ab06e9f52f12b5b002d0dac27f47",*/ "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=5163ab06e9f52f12b5b002d0dac27f47",
                dataType : "jsonp",
                success: function(json){
                    console.log(json);
                }
            });
        })
}
};
    $apiBtn.click(myFunction);
    
    /**********************app__nav-bar***********************/
    var $searchBtn = $(".nav-bar__search-btn");
    var $searchIcon = $(".nav-bar__search-btn i");
    var $switchBtn = $(".nav-bar__switch-btn ");
    var $closeBtn = $(".nav-bar__close-btn");
    $searchIcon.click(function(){
        $searchBtn.css("animation","slideLeft 0.2s ease forwards");
        $closeBtn.removeClass("none-display");
    })
    $closeBtn.click(function(){
        $searchBtn.css("animation","slideBack 0.2s ease forwards");
        $(this).addClass("none-display");
    })
    var $colorSwitchBtn = $(".nav-bar__switch-btn");
    $colorSwitchBtn.click(function(){
        $(".app").toggleClass("greenBackground");
    })
})