  var lat1;
  var lat2;
  var lon1;
  var lon2;
  var question = document.getElementById("question");
  var answer1 = document.getElementById("answer1");
  var answer2 = document.getElementById("answer2");
  var answer3 = document.getElementById("answer3");
  var story = document.getElementById("story");
  var gltfModel = document.getElementById("gltfModel");
  var distToStart;
  

  
  //JSON Object Array - Store POI Data 
  var data = [{
    "name": "One",
    "lat": "49.224124",
    "lng": "8.786031",
    "location": "Garten_Pool",
    "distance": "0",
    "question": "Was macht die Erdbeere zu einer ganz besonderen Frucht ?",  
    "answer1":"a) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Blume, weil sie zu der Pflanzenfamilie der Rosengewaechse gehören. ",
    "answer2":"b) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Gemuese, weil die ganz alten Sorten der Erdbeeren, die aus Suedamerika importiert wurden, noch sauer geschmeckt haben. ",
    "answer3":"c) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Nuss, wegen der kleinen gruenen Kerne auf der Beere. "
}, {
    "name": "Two",
    "lat": "49.223689",
    "lng": "8.785839",  
    "location": "Insel",
    "distance": "0",
    "question": "INSEL!!!!!! ?",  
    "answer1":"a) Insel",
    "answer2":"b) Insel",
    "answer3":"c) Insel "

}, {
    "name": "Three",
    "lat": "49.222547",
    "lng": "8.785705",
    "location": "Ecke Etzwiesenstraße",
    "distance": "0",
    "question": "Ecke Etzwiesenstraße",  
    "answer1":"a) Ecke Etzwiesenstraße",
    "answer2":"b) Ecke Etzwiesenstraße",
    "answer3":"c) Ecke Etzwiesenstraße "
  }, {
    "name": "Four",
    "lat": "49.221656",
    "lng": "8.785940",
    "location": "Ecke Brunnenstraße",
    "distance": "0",
    "question": "Ecke Brunnenstraße",  
    "answer1":"a) Ecke Brunnenstraße",
    "answer2":"b) Ecke Brunnenstraße",
    "answer3":"c) Ecke Brunnenstraße "
  }, {
    "name": "Five",
    "lat": "49.22213",
    "lng": "8.785160",
    "location": "Obere Brunngenstraße",
    "distance": "0",
    "question": "Ecke Brunnenstraße",  
    "answer1":"a) Ecke Brunnenstraße",
    "answer2":"b) Ecke Brunnenstraße",
    "answer3":"c) Ecke Brunnenstraße "
  }, {
    "name": "Six",
    "lat": "49.223449",
    "lng": "8.784573",
    "location": "Ecke Talstraße",
    "distance": "0",
    "question": "Ecke Talstraße",  
    "answer1":"a) Ecke Talstraße",
    "answer2":"b) Ecke Talstraße",
    "answer3":"c) Ecke Talstraße "
  }

];

const latStart = data[0].lat;
const lngStart = data[0].lng;

window.onload = () => {
  //Intervals for geolocation
  setInterval(getLocation, 1000);
  setInterval(distToArr, 1000);
  setInterval(insertStory, 1000);
  setInterval(hideStory, 1000);
  while (1){
    var distStart = getDistance(lat1,lon1,latStart,lngStart);
    console.log(distStart)
  }
  };


// Call getDistance for elements in data && sort data by distance
function distToArr() {
  for (var i in data){
    var dist = getDistance(lat1, lon1, data[i].lat, data[i].lng);
    data[i].distance = dist;    
    }
  data.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
};

//get geolocation of User
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      //Error => Msg - > do this later
    }
}

//Debug - Show actual geolocation of User 
function showPosition(position) {
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
  // TODO: loop
  question.setAttribute('text','value', data[0].question);
  answer1.setAttribute('text','value', data[0].answer1);
  answer2.setAttribute('text','value', data[0].answer2);
  answer3.setAttribute('text','value', data[0].answer3);
}

//Hide Intro txt if next POI is father than x meters
function hideStory(){
  if (distStart > 2 )
  { // TODO: for loop with array
   story.setAttribute('visible', true);
   gltfModel.setAttribute('visible',false);
   question.setAttribute('visible',false);
   answer1.setAttribute('visible',false);
   answer2.setAttribute('visible',false);
   answer3.setAttribute('visible',false);
  } else {
    story.setAttribute('visible', false);
    gltfModel.setAttribute('visible',true);
    question.setAttribute('visible',true);
    answer1.setAttribute('visible',true);
    answer2.setAttribute('visible',true);
    answer3.setAttribute('visible',true);
  }
}



