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

  setInterval(getLocation, 1000);
  
  
  setInterval(dist, 1000);
  // const arr = [];
  // const min = arr.reduce((a,b) => Math.min(a,b));

   
 
  };

function dist() {
  const arr = [];
   
    
  for (var i in data){
    var dist = getDistance(lat1, lon1, data[i].lat, data[i].lng);
    // console.log("Distance to " + data[i].location + " " + dist)
    arr[i] = dist;
    // console.log("array in for: " + arr[i])
  };
   console.log("Array: " + arr)
  const min = arr.reduce((a,b) => Math.min(a,b));
  console.log("Smallest Number in Array: " + min);
  z.innerHTML= "Nächster Punkt in " + min + " Metern" ;
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


