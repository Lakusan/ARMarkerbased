
var x = document.getElementById("demo");
var y = document.getElementById("result");
var lat1;
var lat2 = 49.224217;
var lon1;
var lon2 = 8.785972;
//works
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      // measure(lat1, lon1, lat2, lon2);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
//works      
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    lat1 = position.coords.latitude;
    lon1 = position.coords.longitude;
}
//works - precision ~ 10m
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    var result = d *1000
    y.innerHTML = "Distance: " + result;
    return result; // meters
}

// checks all POI and selects nearest as active -> every 30 sek
function nearestPOI(){

}


