$(document).ready(function(){
    var $apiBtn = $(".api-btn");
    function kelvinToCelsius(num){
        var celcius = num - 273.15;
        return Math.round(celcius)+"°";
    }
    
    function getWeatherIcon(obj){
        function getWeatherGroup(str){
            var _11d = [
                "thunderstorm with light rain",
                "thunderstorm with rain",
                "thunderstorm with heavy rain",
                "light thunderstorm",
                "thunderstorm",
                "heavy thunderstorm",
                "ragged thunderstorm",
                "thunderstorm with light drizzle",
                "thunderstorm with drizzle",
                "thunderstorm with heavy drizzle"
            ];
            var _09d = [
                "light intensity drizzle",
                "drizzle",
                "heavy intensity drizzle",
                "light intensity drizzle rain",
                "drizzle rain",
                "heavy intensity drizzle rain",
                "shower rain and drizzle",
                "heavy shower rain and drizzle",
                "shower drizzle",
                "light intensity shower rain",
                "shower rain",
                "heavy intensity shower rain",
                "ragged shower rain"
            ];
            var _10d = [
                "light rain",
                "moderate rain",
                "heavy intensity rain",
                "very heavy rain",
                "extreme rain"
            ];
            var _13d = [
                "freezing rain",
                "light snow",
                "snow",
                "heavy snow",
                "sleet",
                "shower sleet",
                "light rain and snow",
                "rain and snow",
                "light shower snow",
                "shower snow",
                "heavy shower snow"
            ];
            var _50d = [
                "mist",
                "smoke",
                "haze",
                "sand, dust whirls",
                "fog",
                "sand",
                "dust",
                "volcanic ash",
                "squalls",
                "tornado"
            ];
            var _01d = [
                "clear sky"
            ];
            var _02d = [
                "few clouds"
            ];
            var _03d = [
                "scattered clouds"
            ];
            var _04d = [
                "broken clouds",
                "overcast clouds"
            ];
            var group;
            _11d.forEach(function(string){
                if(str == string){
                    group = "_11d";
                }
            });
            _09d.forEach(function(string){
                if(str == string){
                    group = "_09d";
                }
            });
            _10d.forEach(function(string){
                if(str == string){
                    group = "_10d";
                }
            });
            _13d.forEach(function(string){
                if(str == string){
                    group = "_13d";
                }
            });
            _50d.forEach(function(string){
                if(str == string){
                    group = "_50d";
                }
            });
            _01d.forEach(function(string){
                if(str == string){
                    group = "_01d";
                }
            });
            _02d.forEach(function(string){
                if(str == string){
                    group = "_02d";
                }
            });
            _03d.forEach(function(string){
                if(str == string){
                    group = "_03d";
                }
            });
            _04d.forEach(function(string){
                if(str == string){
                    group = "_04d";
                }
            });
            return group;
        }
        switch (getWeatherGroup(obj.description)) {
            case "_04d":
                return "http://openweathermap.org/img/w/04d.png";
                break;
            case "_01d":
                return "http://openweathermap.org/img/w/01d.png";
                break;
            case "_02d":
                return "http://openweathermap.org/img/w/02d.png";
                break;
            case "_03d":
                return "http://openweathermap.org/img/w/03d.png";
                break;
            case "_09d":
                return "http://openweathermap.org/img/w/09d.png";
                break;
            case "_10d":
                return "http://openweathermap.org/img/w/10d.png";
                break;
            case "_11d":
                return "http://openweathermap.org/img/w/11d.png";
                break;
            case "_13d":
                return "http://openweathermap.org/img/w/13d.png";
                break;
            case "_50d":
                return "http://openweathermap.org/img/w/50d.png";
                break;
        }
    };
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
                 /*console.log(json);*/
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
                 $weatherIcon.attr("src", getWeatherIcon(json.weather[0]));
             }
            });
            $.ajax({
                url :
                    "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=5163ab06e9f52f12b5b002d0dac27f47",
                dataType : "jsonp",
                success: function(json){
                    console.log(json);
                    for(var i=0; i<38; i++){
                        var j = i.toString();
                        var date_time = json.list[j].dt_txt;//string
                        var weatherIcon = getWeatherIcon(json.list[j].weather["0"]);//string
                        var deg = kelvinToCelsius(json.list[j].main.temp);//number
                        var append = 
                            "<div class='forecast-section__forecast'>"+
                            
                                "<div class='forecast-section__date-and-text'> "+
                                    date_time+
                                "</div>"+
                            
                                "<div class='forecast-section__icon-and-deg'> "+
                            
                                    "<div class='forecast-section__icon'>"+
                                        "<img src="+weatherIcon+">"+
                                    "</div>"+
                            
                                    "<div class='forecast-section__deg'>"+
                                        deg+
                                    "</div>"+
                            
                                "</div>"+
                                    
                            "</div>";
                        $(".forecast-section").append(append);
                        
                    }
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
    });
    $closeBtn.click(function(){
        $searchBtn.css("animation","slideBack 0.2s ease forwards");
        $(this).addClass("none-display");
    });
    var $colorSwitchBtn = $(".nav-bar__switch-btn");
    $colorSwitchBtn.click(function(){
        $(".app").toggleClass("greenBackground");
    });
    
})