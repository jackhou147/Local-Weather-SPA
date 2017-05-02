$(document).ready(function(){
    var $apiBtn = $(".api-btn");
    function kelvinToCelsius(num){
        var celcius = num - 273.15;
        return Math.round(celcius)+"°C";
    };
    
    function celciusToFahr(num){
        var fahr = num + 32;
        return fahr + "°F";
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
    function sendApiRequest(){
    if(navigator.geolocation){
        var latitude;
        var longitude;
        var tempK;
        var tempC;
        var tempF;
        var city;
        var state;
        var country;
        var zip;
        var windSp;
        var weatherDesc;
        var humid;
        var airPre;
        var tempOut;
        var windDeg;
        var $city = $(".app__city");
        var $country = $(".app__country");
        var $degNum = $(".degree-number");
        var $degUnit  = $(".degree-unit");
        var $winSp = $(".app__wind-speed");
        var $humid = $(".app__humidity");
        var $weatherIcon = $(".app__weather-icon");
        var totalApiRequestsSent = 0;
        function hideLoader(){
            var $loaderPage = $(".spinner-page");
            if(totalApiRequestsSent == 3){
                $loaderPage.fadeOut();
            }
        };
        $.ajax({
                url: "http://ip-api.com/json",
                dataType: "jsonp",
                success: function(json) {
                    totalApiRequestsSent ++;
                    hideLoader();
                    latitude = json.lat;
                    longitude = json.lon;
                    state = json.region;
                    country = json.country;
                    zip = json.zip;
                    $("#country").html(country);
                    $("#state").html(state);
                    $("#zipcode").html(zip);
                    console.log(json);
                }
            });
        function success(position){
            console.log("timestamp: "+position.timestamp.toLocaleString());
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log("lat:" +latitude);
            console.log("long: "+longitude);
            //start ajax request
            $.ajax({
             url : "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=171fbe7e29d7d4cff5088e5cd6cddfd9",
             dataType : "jsonp",
             success: function(json){
                 totalApiRequestsSent ++;
                 hideLoader();
                 console.log(json);
                 tempK = Math.floor(json.main.temp);
                 tempC = Math.floor(tempK -273.15)+"°";
                 tempF = Math.floor(tempK -459.67)+"°";
                 city = json.name;
                 $("#city").append(city);
                 windSp = json.wind.speed;
                 console.log("wind speed: "+windSp);
                 $("#windSp").append(windSp);
                 weatherDesc = json.weather[0].description;
                 /*$("#weatherDesc").append(weatherDesc);*/
                 $(".app__weather-description").html(weatherDesc);
                 humid = json.main.humidity;
                 console.log("humidity: "+humid);
                 $("#humid").append(humid);
                 console.log("temperature: "+tempOut);
                 /*$deg.append(tempOut + "°");*/
                 $degNum.html(tempC);
                 $degUnit.html("C");
                 var $celcius = $(".celcius");
                    var $fahr = $(".fahr");
                    $celcius.click(function(){
                        $degNum.html(tempC);
                        $degUnit.html("C");
                    });
                    $fahr.click(function(){
                        $degNum.html(tempF);
                        $degUnit.html("F");
                    });
                 windDeg = json.wind.deg;
                 $("#windDeg").append(windDeg);
                 $weatherIcon.attr("src", getWeatherIcon(json.weather["0"]));
             }
            });
            $.ajax({
                url :
                    "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=171fbe7e29d7d4cff5088e5cd6cddfd9",
                dataType : "jsonp",
                success: function(json){
                    totalApiRequestsSent ++;
                    hideLoader();
                    console.log(json);
                    for(var i=0; i<7; i++){
                        var j = i.toString();
                        var date_time = json.list[j].dt_txt.replace(":00:00",":00");
                        //string
                        var year = date_time.substring(0,4);
                        var date = date_time.substring(5,10);
                        console.log("date: "+date);
                        var time = date_time.substring(10,16);
                        var weatherIcon = getWeatherIcon(json.list[j].weather["0"]);//string
                        var deg = kelvinToCelsius(json.list[j].main.temp);//number
                        var append = 
                            "<div class='forecast-section__forecast lightPurple'>"+
                            
                                "<div class='forecast-section__date-and-text'>"+
                                    "<div>"+year+"</div>"+
                                    "<div>"+date+"</div>"+
                                    "<div>"+time+"</div>"+
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
        };
        function error(){
            $.ajax({
                url: "http://ip-api.com/json",
                dataType: "jsonp",
                success: function(json) {
                    var latitude = json.lat;
                    var longitude = json.lon;
                    $.ajax({
             url : /*"http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=5163ab06e9f52f12b5b002d0dac27f47"*/
                   "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=171fbe7e29d7d4cff5088e5cd6cddfd9",
             dataType : "jsonp",
             success: function(json){
                 totalApiRequestsSent ++;
                 hideLoader();
                 console.log(json);
                 tempK = Math.floor(json.main.temp);
                 tempC = Math.floor(tempK -273.15)+"°";
                 tempF = Math.floor(tempK -459.67)+"°";
                 city = json.name;
                 $("#city").append(city);
                 windSp = json.wind.speed;
                 console.log("wind speed: "+windSp);
                 $("#windSp").append(windSp);
                 weatherDesc = json.weather[0].description;
                 /*$("#weatherDesc").append(weatherDesc);*/
                 $(".app__weather-description").html(weatherDesc);
                 humid = json.main.humidity;
                 console.log("humidity: "+humid);
                 $("#humid").append(humid);
                 console.log("temperature: "+tempOut);
                 /*$deg.append(tempOut + "°");*/
                 $degNum.html(tempC);
                 $degUnit.html("C");
                 var $celcius = $(".celcius");
                    var $fahr = $(".fahr");
                    $celcius.click(function(){
                        $degNum.html(tempC);
                        $degUnit.html("C");
                    });
                    $fahr.click(function(){
                        $degNum.html(tempF);
                        $degUnit.html("F");
                    });
                 windDeg = json.wind.deg;
                 $("#windDeg").append(windDeg);
                 $weatherIcon.attr("src", getWeatherIcon(json.weather["0"]));
             }
            });
                    $.ajax({
                url :
                    "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=171fbe7e29d7d4cff5088e5cd6cddfd9",
                dataType : "jsonp",
                success: function(json){
                    totalApiRequestsSent++;
                    hideLoader();
                    console.log(json);
                    for(var i=0; i<7; i++){
                        var j = i.toString();
                        var date_time = json.list[j].dt_txt.replace(":00:00",":00");//string
                        var weatherIcon = getWeatherIcon(json.list[j].weather["0"]);//string
                        var deg = kelvinToCelsius(json.list[j].main.temp);//number
                        var append = 
                            "<div class='forecast-section__forecast lightPurple'>"+
                            
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
                }
            })
            
        }
        navigator.geolocation.getCurrentPosition(success,error);
    }
    else {
        alert("Oops. You must be a ninja because we can't detect your location.")
    }
};
    sendApiRequest();
    
    /**********************app__nav-bar***********************/
    var $switchBtn = $(".nav-bar__switch-btn ");
    var $colorSwitchBtn = $(".nav-bar__switch-btn");
    $colorSwitchBtn.click(function(){
        $(".app").toggleClass("greenBackground");
        if($(".forecast-section__forecast").hasClass("lightPurple")){
            $(".forecast-section__forecast").removeClass("lightPurple");
            $(".forecast-section__forecast").addClass("lightGreen");
        }
        else{
            $(".forecast-section__forecast").addClass("lightPurple");
            $(".forecast-section__forecast").removeClass("lightGreen");
        };
    });
    
    /**********************unit-switch***********************/
    
    
})