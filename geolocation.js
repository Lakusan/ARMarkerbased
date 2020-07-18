  var x = document.getElementById("demo");
  var y = document.getElementById("result");
  var z = document.getElementById("places");
  var lat1;
  var lat2 = 49.224217;
  var lon1;
  var lon2 = 8.785972;
  
  // console.log(x,y,z, lat1, lat2, lon1, lon2);

  var data = [{
    "name": "One",
    "lat": "49.224206",
    "lng": "8.786004",
    "location": "Holzhaus",
    "distance": "0"
}, {
    "name": "Two",
    "lat": "43.224094",
    "lng": "8.786084",  
    "location": "Pool",
    "distance": "0"

}, {
    "name": "Three",
    "lat": "42.224941",
    "lng": " 8.786584",
    "location": "Einfahrt",
    "distance": "0"

}];


window.onload = () => {

  setInterval(getLocation, 1000);
  
  
  setInterval(distToArr, 1000);
  // const arr = [];
  // const min = arr.reduce((a,b) => Math.min(a,b));

   
 
  };

function distToArr() {
  
   
    
  for (var i in data){
    var dist = getDistance(lat1, lon1, data[i].lat, data[i].lng);
    // console.log("Distance to " + data[i].location + " " + dist)
    data[i].distance = dist;
   // console.log("Name: " + data[i].name + " Distance to Player: " + data[i].distance);
  };
   //console.log("Array: " + arr)
  //  var min = arr.reduce((a,b) => Math.min(a,b));
  // min = Math.round(min);
  // z.innerHTML= "Nächster Punkt in " + min + " Metern" ;

  //working sort method
  data.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
console.log(data);
  z.innerHTML = "Nearest Point: " + data[0].name;
};




//works
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
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
    
   
    return result; // meters
}


