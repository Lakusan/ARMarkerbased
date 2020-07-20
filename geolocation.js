  var activePOI = document.getElementById("activePOI");
  var info = document.getElementById("info");
  var lat1;
  var lat2;
  var lon1;
  var lon2;
  var question = document.getElementById("question");
  var answer1 = document.getElementById("answer1");
  var answer2 = document.getElementById("answer2");
  var answer3 = document.getElementById("answer3");
  var story = document.getElementById("story");
  

  story.addEventListener('click', function() {
    story.setAttribute('visible', false);
  });

//JSON Object Array - Store POI Data 
  var data = [{
    "name": "One",
    "lat": "49.224124",
    "lng": "8.786031",
    "location": "Garten_Pool",
    "distance": "0",
    "question": "Was macht die Erdbeere zu einer ganz besonderen Frucht ?",  
    "answer1":"a)  Sie zählt eigentlich nicht zu den Früchten, sondern als Blume, weil sie zu der Pflanzenfamilie der Rosengewächse gehören. ",
    "answer2":"b) Sie zählt eigentlich nicht zu den Früchten, sondern als Gemüse, weil die ganz alten Sorten der Erdbeeren, die aus Südamerika importiert wurden, noch sauer geschmeckt haben. ",
    "answer3":"c) Sie zählt eigentlich nicht zu den Früchten, sondern als Nuss, wegen der kleinen grünen Kerne auf der Beere. "
}, {
    "name": "Two",
    "lat": "49.224165",
    "lng": "8.785761",  
    "location": "Einfahrt",
    "distance": "0",
    "quest": "Station 2 - Hinweis 2"

}, {
    "name": "Three",
    "lat": "49.223689",
    "lng": " 8.785839",
    "location": "Insel",
    "distance": "0",
    "story": "Station 3 - Hinweis 3"
  }

];


window.onload = () => {

  //Intervals for geolocation
  setInterval(getLocation, 1000);
  setInterval(distToArr, 1000);
  setInterval(insertStory, 1000);
  };

// Call getDistance for elemets in data && sort data by distance
function distToArr() {
 
  for (var i in data){

    var dist = getDistance(lat1, lon1, data[i].lat, data[i].lng);
    data[i].distance = dist;    
    }

  data.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
 
  activePOI.innerHTML = "Active POI: " + data[0].location;

};

//get geolocation of User
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      info.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Debug - Show actual geolocation of User 
function showPosition(position) {
    info.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    lat1 = position.coords.latitude;
    lon1 = position.coords.longitude;
}

//Get distance between user and POI
function getDistance(lat1, lon1, lat2, lon2){ 
    var R = 6378.137; 
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    var result = d *1000;

    return result; 
}

//Set insert active StoryString
function insertStory(){
  question.setAttribute('text','value', data[0].question);
  answer1.setAttribute('text','value', data[0].answer1);
  answer2.setAttribute('text','value', data[0].answer2);
  answer3.setAttribute('text','value', data[0].answer3);
}

//Push Button to hide Story an show content

function hideStory(){
 story.setAttribute('visible', false);
 question.setAttribute('visible',true);
  answer1.setAttribute('visible',true);
  answer2.setAttribute('visible',true);
  answer3.setAttribute('visible',true);
}



