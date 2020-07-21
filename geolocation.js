var lat1; //Own Latitdue
var lat2; //Latidude - Variable for calc distance
var lon1; //Own Logitude
var lon2; //Longitude - Variable for calc distance
var question = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var story = document.getElementById("story");
var debug = document.getElementById("debug");
var gltfModel = document.getElementById("gltfModel");
var distStart; // Calc distance own pos - starting point
var pts = 0; // Player Pts
var introVisible = true; // Bool for checking if Intro was seen


//JSON Object Array - Store POI Data 
var data = [{
  "name": "One",
  "pts": "1",
  "lat": "49.223697",
  "lng": "8.785821",
  "location": "Insel",
  "distance": "0",
  "question": "INSEL",
  "answer1": "a) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Blume, weil sie zu der Pflanzenfamilie der Rosengewaechse gehören. ",
  "answer2": "b) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Gemuese, weil die ganz alten Sorten der Erdbeeren, die aus Suedamerika importiert wurden, noch sauer geschmeckt haben. ",
  "answer3": "c) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Nuss, wegen der kleinen gruenen Kerne auf der Beere. "
}, {
  "name": "Two",
  "pts": "1",
  "lat": "49.223462",
  "lng": "8.784587",
  "location": "tal",
  "distance": "0",
  "question": "Talstraße    !!!!!!",
  "answer1": "a) Tal",
  "answer2": "b) TAl",
  "answer3": "c) Tal "

}, {
  "name": "Three",
  "pts": "1",
  "lat": "49.223382",
  "lng": "8.781980",
  "location": "333333",
  "distance": "0",
  "question": "Eichenweg",
  "answer1": "a) Eichenweg",
  "answer2": "b) Eiche",
  "answer3": "c) Eiche "
}, {
  "name": "Four",
  "pts": "1",
  "lat": "49.222555",
  "lng": "8.785940",
  "location": "Ecke Brunnenstraße",
  "distance": "0",
  "question": "Feld",
  "answer1": "a) Feld",
  "answer2": "b) Feld",
  "answer3": "c) Feld"
}, {
  "name": "Five",
  "pts": "1",
  "lat": "49.220596",
  "lng": "8.775602",
  "location": "Obere Brunngenstraße",
  "distance": "0",
  "question": "Keuzung vor buckel",
  "answer1": "a) vor buckel",
  "answer2": "b) vor buckel",
  "answer3": "c) vor buckel "
}, {
  "name": "Six",
  "pts": "1",
  "lat": "49.217775",
  "lng": "8.777930",
  "location": "Ecke Talstraße",
  "distance": "1",
  "question": " STROMMAST",
  "answer1": "a) Ecke STRIC",
  "answer2": "b) Ecke STROM",
  "answer3": "c) Ecke STROM "
}

];

//Data for goal
//Set Coords to Starting Point
//If no Game Over is neccessary, please uncomment getPts() and goal() and this data plus edit contitions of hide story
var goalData = [{
   
    "name": "End",
    "goalie": "1",
    "pts": "0",
    "lat": "49.219643",
    "lng": "8.784351",
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
const maxDistStart =  30; //e.g. 10 Meters -> In radius of 10 Meters aroung Starting Point show Intro

window.onload = () => {
  //Intervals for geolocation
  setInterval(getLocation, 1000);
  setInterval(distToArr, 1000);
  // setInterval(insertStory, 1000);
  setInterval(hideStory, 1000);
  //check if pts to get
  setInterval(getPts, 1000);
  
};


// Call getDistance for elements in data && sort data by distance
function distToArr() {
  for (var i in data) {
    var dist = getDistance(lat1, lon1, data[i].lat, data[i].lng);
    //console.log("dist from distToArr: " + dist);
    data[i].distance = dist;
    //console.log("Distance Index 0: " + data[0].distance + data[0].location+ "  NAME: " + data[0].location);
    // if (data[i].name === "One") {
    
      distStart = Number(data[0].distance);
      //console.log("DistStart: " + distStart);
      //console.log("Dist to 1: " + data[1].distance + "  NAME: " + data[1].location);
     
      // console.log(data[i].name + " " + data[i].distance);   
    // }
    
  }
  data.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
var story = document.getElementById("story");
debug.innerHTML=" Next POI: " + data[0].location + " Distance To POI: " + data[0].distance + " 2nd POI: " + data[1].location + " Distance to 2nd:  " + data[1].distance  ;
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

//Calc distance between user and POI
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
  
  // console.log("insertStory");
  question.setAttribute('text', 'value', data[0].question);
  answer1.setAttribute('text', 'value', data[0].answer1);
  answer2.setAttribute('text', 'value', data[0].answer2);
  answer3.setAttribute('text', 'value', data[0].answer3);

}

//Hide Intro txt if next POI is farther than x meters
//Shows andmHides Elements
function hideStory() {
  if (pts <= dataLength ) {
    if (distStart > maxDistStart && pts === 0) { // TODO: for loop with array
      
      console.log("Einleitung");
      //console.log("distStart: " + distStart);
      story.setAttribute('visible', true);
      gltfModel.setAttribute('visible', false);
      question.setAttribute('visible', false);
      answer1.setAttribute('visible', false);
      answer2.setAttribute('visible', false);
      answer3.setAttribute('visible', false);
      introVisible = true;
    } else {
      introVisible = false;
      console.log("Fragen");
      story.setAttribute('visible', false);
      gltfModel.setAttribute('visible', true);
      question.setAttribute('visible', true);
      answer1.setAttribute('visible', true);
      answer2.setAttribute('visible', true);
      answer3.setAttribute('visible', true);
      insertStory();
    }
  } else {
    goal();
  }
}

//Get Pts for finding the points once
function getPts() {
  var dataPts = Number(data[0].pts);
  
  
  if(markerFound === true && introVisible === false){
    console.log(markerFound);
    console.log("dataPts: " + dataPts);
    if (dataPts != 0) {
     data[0].pts = "0";
      pts++;
      console.log("pts++");
    }
    var distToGoal = getDistance(lat1, lon1, goalData[0].lat, goalData[0].lng);
    console.log("Distance To Goal"+ distToGoal);
    if ( distToGoal < maxDistStart)
    {
      console.log("Am Ziel angekommen!")
      //if goalie not 0
      pts++;
    }
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

