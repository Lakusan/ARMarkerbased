  var x = document.getElementById("demo");
  var y = document.getElementById("result");
  var z = document.getElementById("places");
  var lat1;
  var lat2 = 49.224217;
  var lon1;
  var lon2 = 8.785972;
  
  console.log(x,y,z, lat1, lat2, lon1, lon2);

  var data = [{
    "name": "One",
    "lat": "49.224206",
    "lng": "8.786004",
    "location": "Holzhaus"
}, {
    "name": "Two",
    "lat": "49.224094",
    "lng": "8.786084",  
    "location": "Pool"
}, {
    "name": "Three",
    "lat": "49.224094",
    "lng": " 8.786084",
    "location": "Einfahrt"
}];


window.onload = () => {

  console.log("Using: geolocation.js");
  
  setInterval(getLocation, 1000);
  setInterval(getDistance, 1000);
  setInterval(intervall, 1000);
 
  };

function intervall() {
//  var i;
//   for (i in data.name) {
//     z += data.name[i];
    // }
    console.log("Intervall");
    console.log(data);
    for (var i in data){
    console.log(data[i].name);
    }

};




//works
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("Navigator loaded");
      
      console.log("Get Distance");
      
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
      console.log("Geolocation not present");
    }
}
//works      
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    lat1 = position.coords.latitude;
    lon1 = position.coords.longitude;
    console.log("Own Position set");
    getDistance(lat1, lon1, lat2, lon2);
}
//works - precision ~ 10m
function getDistance(lat1, lon1, lat2, lon2){  // generally used geo measurement function
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
    console.log("Distance to neareast Object");
    return result; // meters
}


