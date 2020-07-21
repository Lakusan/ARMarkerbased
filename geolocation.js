var lat1; //Own Latitdue
var lat2; //Latidude - Variable for calc distance
var lon1; //Own Logitude
var lon2; //Longitude - Variable for calc distance
var question = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var story = document.getElementById("story");
var gltfModel = document.getElementById("gltfModel");
var distStart; // Calc distance own pos - starting point
var pts = 6; // Player Pts


//JSON Object Array - Store POI Data 
var data = [{
  "name": "One",
  "pts": "1",
  "lat": "49.224124",
  "lng": "8.786031",
  "location": "Garten_Pool",
  "distance": "0",
  "question": "Was macht die Erdbeere zu einer ganz besonderen Frucht ?",
  "answer1": "a) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Blume, weil sie zu der Pflanzenfamilie der Rosengewaechse gehören. ",
  "answer2": "b) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Gemuese, weil die ganz alten Sorten der Erdbeeren, die aus Suedamerika importiert wurden, noch sauer geschmeckt haben. ",
  "answer3": "c) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Nuss, wegen der kleinen gruenen Kerne auf der Beere. "
}, {
  "name": "Two",
  "pts": "1",
  "lat": "49.223689",
  "lng": "8.785839",
  "location": "Insel",
  "distance": "0",
  "question": "INSEL!!!!!!",
  "answer1": "a) Insel",
  "answer2": "b) Insel",
  "answer3": "c) Insel "

}, {
  "name": "Three",
  "pts": "1",
  "lat": "49.222547",
  "lng": "8.785705",
  "location": "Ecke Etzwiesenstraße",
  "distance": "0",
  "question": "Ecke Etzwiesenstraße",
  "answer1": "a) Ecke Etzwiesenstraße",
  "answer2": "b) Ecke Etzwiesenstraße",
  "answer3": "c) Ecke Etzwiesenstraße "
}, {
  "name": "Four",
  "pts": "1",
  "lat": "49.221656",
  "lng": "8.785940",
  "location": "Ecke Brunnenstraße",
  "distance": "0",
  "question": "Ecke Brunnenstraße",
  "answer1": "a) Ecke Brunnenstraße",
  "answer2": "b) Ecke Brunnenstraße",
  "answer3": "c) Ecke Brunnenstraße "
}, {
  "name": "Five",
  "pts": "1",
  "lat": "49.22213",
  "lng": "8.785160",
  "location": "Obere Brunngenstraße",
  "distance": "0",
  "question": "Ecke Brunnenstraße",
  "answer1": "a) Ecke Brunnenstraße",
  "answer2": "b) Ecke Brunnenstraße",
  "answer3": "c) Ecke Brunnenstraße "
}, {
  "name": "Six",
  "pts": "1",
  "lat": "49.223449",
  "lng": "8.784573",
  "location": "Ecke Talstraße",
  "distance": "0",
  "question": "Ecke Talstraße",
  "answer1": "a) Ecke Talstraße",
  "answer2": "b) Ecke Talstraße",
  "answer3": "c) Ecke Talstraße "
}

];

//Data for goal
//Set Coords to Starting Point
//If no Game Over is neccessary, please uncomment getPts() and goal() and this data plus edit contitions of hide story
var goalData = [{
   
    "name": "End",
    "pts": "0",
    "lat": "49.223449",
    "lng": "8.784573",
    "location": "Goal",
    "distance": "0",
    "txt1": "Ihr erhaltet eine SMS von Chris: ",
    "txt2": "Ich hoffe ihr habt inzwischen alle Hinweise gefunden und seid bereit meine Superkreation auszuprobieren! ",
    "txt3": "Ihr findet alles bereitgestellt an der Bar. Danke für eure Hilfe, ihr habt mir echt heute den A**** gerettet und habt hoffentlich eine richtig gute Party! ",
    "txt4": "Und vergesst nicht - fun and sunshine, there's enough for everyone! "
  }
];

// Stores geolocation of starting point
const latStart = data[0].lat;
const lngStart = data[0].lng;
//Number of POIs
const dataLength = Number(data.length);
//Distance to StartingPoint in Meters for showing Intro at Start
const maxDistStart =  5 ; //e.g. 10 Meters -> In radius of 10 Meters aroung Starting Point show Intro

window.onload = () => {
  //Intervals for geolocation
  setInterval(getLocation, 1000);
  setInterval(distToArr, 1000);
  setInterval(insertStory, 1000);
  setInterval(hideStory, 1000);
};


// Call getDistance for elements in data && sort data by distance
function distToArr() {
  for (var i in data) {
    var dist = getDistance(lat1, lon1, data[i].lat, data[i].lng);
    data[i].distance = dist;
    if (data[i].name === "One") {
      distStart = Number(data[i].distance);
      // console.log(data[i].name + " " + data[i].distance);   
    }
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
function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6378.137;
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  var result = d * 1000;

  return result;
}

//Set insert active StoryString
//Inserts active txt strings
function insertStory() {
  // TODO: loop
  question.setAttribute('text', 'value', data[0].question);
  answer1.setAttribute('text', 'value', data[0].answer1);
  answer2.setAttribute('text', 'value', data[0].answer2);
  answer3.setAttribute('text', 'value', data[0].answer3);
}

//Hide Intro txt if next POI is farther than x meters
//Shows andmHides Elements
function hideStory() {
  console.log("pts: " + pts);
  console.log("dataLength: " + dataLength);
  if (pts < dataLength) {
    if (distStart <= maxDistStart) { // TODO: for loop with array
     
      console.log("Einleitung");
      story.setAttribute('visible', true);
      gltfModel.setAttribute('visible', false);
      question.setAttribute('visible', false);
      answer1.setAttribute('visible', false);
      answer2.setAttribute('visible', false);
      answer3.setAttribute('visible', false);
    } else {
    
      console.log("Fragen");
      story.setAttribute('visible', false);
      gltfModel.setAttribute('visible', true);
      question.setAttribute('visible', true);
      answer1.setAttribute('visible', true);
      answer2.setAttribute('visible', true);
      answer3.setAttribute('visible', true);
    }
  } else {
    goal();
  }
}

//Get Pts for finding the points once
function getPts() {
  if (data[0].pts !== "0") {
    data[0].pts = "0";
    pts++;
  }
}

//show ending screen if all points captured
function goal() {
  console.log("Ziel");
    story.setAttribute('visible', false);
    question.setAttribute('visible', true);
      answer1.setAttribute('visible', true);
      answer2.setAttribute('visible', true);
      answer3.setAttribute('visible', true);

    question.setAttribute('text', 'value', goalData[0].txt1);
    answer1.setAttribute('text', 'value', goalData[0].txt2);
    answer2.setAttribute('text', 'value', goalData[0].txt3);
    answer3.setAttribute('text', 'value', goalData[0].txt4);
}

