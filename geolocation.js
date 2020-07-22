
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
var buttons = document.getElementsByClassName("buttons");
var distStart; // Calc distance own pos - starting point
var pts = 0; // Player Pts
var introVisible = true; // Bool for checking if Intro was seen
var distToGoal;
var serverData = [];


//JSON Object Array - Store POI Data 
var data = [{
  "name": "One",
  "pts": "1",
  "lat": "49.460775",
  "lng": "8.603412",
  "location": "One",
  "distance": "0",
  "question": "Was macht die Erdbeere zu einer ganz besonderen Frucht? ",
  "answer1": "a) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Blume, weil sie zu der Pflanzenfamilie der Rosengewaechse gehoeren. ",
  "answer2": "b) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Gemuese, weil die ganz alten Sorten der Erdbeeren, die aus Suedamerika importiert wurden, noch sauer geschmeckt haben. ",
  "answer3": "c) Sie zaehlt eigentlich nicht zu den Fruechten, sondern als Nuss, wegen der kleinen gruenen Kerne auf der Beere. ",
  "givenAnswer": "0"
}, {
  "name": "Two",
  "pts": "1",
  "lat": "49.460634",
  "lng": "8.602180",
  "location": "Two",
  "distance": "0",
  "question": "In welcher Form waechst die Ananas?",
  "answer1": "a) Auf palmenarigen Baeumen",
  "answer2": "b) Als Busch auf dem Feld",
  "answer3": "c) Unter der Erde",
  "givenAnswer": "0"

}, {
  "name": "Three",
  "pts": "1",
  "lat": "49.460821",
  "lng": "8.600803",
  "location": "Three",
  "distance": "0",
  "question": "Welche Teile des Holunders werden haeufig zum Essen verwendet? ",
  "answer1": "a) Nur die weissen Blueten, die roten Beeren hingegen sind giftig. ",
  "answer2": "b) Man kann sowohl die Blüten als auch die Beeren essen und verarbeiten. ",
  "answer3": "c) Man kann die Blueten, die Beeren und auch die jungen Blaetter des Holunderstrauchs als Salat essen.  ",
  "givenAnswer": "0"
}, {
  "name": "Four",
  "pts": "1",
  "lat": "49.461930",
  "lng": "8.600642",
  "location": "Four",
  "distance": "0",
  "question": "In welchem Jahrzehnt wurde das Lied „Club Tropicana“ von Wham! veroeffentlicht?",
  "answer1": "a) in den 90ern ",
  "answer2": "b) in den 2000ern ",
  "answer3": "c) in den 80ern ",
  "givenAnswer": "0"
}, {
  "name": "Five",
  "pts": "1",
  "lat": "49.461930",
  "lng": "8.602090",
  "location": "Five",
  "distance": "0",
  "question": "Wofuer steht die Abkuerzung cl?",
  "answer1": "a) Citriliter: Es ist ein besonderes Mass für die Saefte von Zitrusfruechten, die oft in Cocktails verwendet werden. ",
  "answer2": "b) Centiliter: Es kommt vom lateinischen Wort für Hundert und bedeutet: das Hunderstel eines Liters (10ml)",
  "answer3": "c) Centimeter pro Liter: Es geht darum, wie hoch die Fluessigkeit im Glas steht.  ",
  "givenAnswer": "0"
}, {
  "name": "Six",
  "pts": "1",
  "lat": "49.461804",
  "lng": "8.603023",
  "location": "Six",
  "distance": "1",
  "question": "Wo ist der Lebensraum von Pinguinen?",
  "answer1": "a) Nur in der Arktis, das heißt am Nordpol",
  "answer2": "b) In den kalten Ozeanen der südlichen Halbkugel.",
  "answer3": "c) Nur in der Antarktis, das heißt am Südpol. ",
  "givenAnswer": "0"
}, {
  "name": "Seven",
  "pts": "1",
  "lat": "49.463351",
  "lng": "8.602900",
  "location": "Seven",
  "distance": "1",
  "question": "Was ist ein anderer Name für die Passionsfrucht? ",
  "answer1": "a) Maracuja",
  "answer2": "b) Cherimoya",
  "answer3": "c) Paolabeere",
  "givenAnswer": "0"
}, {
  "name": "Eight",
  "pts": "1",
  "lat": "49.463414",
  "lng": "8.604177",
  "location": "Eight",
  "distance": "1",
  "question": "Auf welchem Kontinent liegt das Land Panama?",
  "answer1": "a) Asien",
  "answer2": "b) Europa",
  "answer3": "c) Suedamerika",
  "givenAnswer": "0"
}, {
  "name": "Nine",
  "pts": "1",
  "lat": "49.461679",
  "lng": "8.605410",
  "location": "Nine",
  "distance": "1",
  "question": "Welcher dieser Fische ist KEIN Tropenfisch?",
  "answer1": "a) Anemonenfisch",
  "answer2": "b) Lachs",
  "answer3": "c) Papageienfisch",
  "givenAnswer": "0"
}, {
  "name": "Ten",
  "pts": "1",
  "lat": "49.459112",
  "lng": "8.606215",
  "location": "Ten",
  "distance": "1",
  "question": "Aus welchem Land kommen die bunten Blumenketten, die man sich z. B. im Club Tropicana zum Feiern umhängt? ",
  "answer1": "a) Brasilien",
  "answer2": "b) Philippinen",
  "answer3": "c) Hawaii",
  "givenAnswer": "0"
}, {
  "name": "Eleven",
  "pts": "1",
  "lat": "49.458840",
  "lng": "8.604327",
  "location": "Eleven",
  "distance": "1",
  "question": "Wofür steht der Cocktailname KiBa?  ",
  "answer1": "a) Kirschsaft und Bananensaft, weil es eine Mischung der beiden Säfte ist. ",
  "answer2": "b) Kinder-Bar, weil er alkoholfrei ist und daher von Kindern getrunken werden kann. ",
  "answer3": "c) Kirsch-Bacardi, weil er mit Kirschsaft und einem Rum namens Bacardi gemacht wird. ",
  "givenAnswer": "0"
}, {
  "name": "Twelve",
  "pts": "1",
  "lat": "49.458749",
  "lng": "8.602761",
  "location": "Twelve",
  "distance": "1",
  "question": "Wie heißt das alkoholische Zaubergetränk, das in der Welt von Harry Potter getrunken wird?",
  "answer1": "a) Kuerbiswhiskey ",
  "answer2": "b) Feuerwhiskey ",
  "answer3": "c) Feuerbier",
  "givenAnswer": "0"
}, {
  "name": "Thirteen",
  "pts": "1",
  "lat": "49.459997",
  "lng": "8.602364",
  "location": "Thirteen",
  "distance": "1",
  "question": "Wo liegen eigentlich „die Tropen“?",
  "answer1": "a) Das ist eine bestimmte Gegend in Südostasien.",
  "answer2": "b) Damit ist ein Bereich um den Äquator gemeint, in dem ein besonders heißes Klima herrscht.",
  "answer3": "c) Die Tropen sind ein politische Gemeinschaft von Ländern überall auf der Welt, die zusammenarbeiten.",
  "givenAnswer": "0"
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
// debug.innerHTML="Active POI: " + data[0].location + "Distance To POI: " + data[0].distance + "2nd POI: " + data[1].location + "Distance to 2nd:  " + data[1].distance +" Distance to Goal: " + distToGoal + " Current Pts: " + pts;
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
      for(var i = 0; i < buttons.length; i++){
        buttons[i].setAttribute('visible', false);
       
    }
    } else {
      introVisible = false;
      console.log("Fragen");
      story.setAttribute('visible', false);
      gltfModel.setAttribute('visible', true);
      question.setAttribute('visible', true);
      answer1.setAttribute('visible', true);
      answer2.setAttribute('visible', true);
      answer3.setAttribute('visible', true);
      for(var i = 0; i < buttons.length; i++){
        buttons[i].setAttribute('visible', true);
       
    }
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
    distToGoal = getDistance(lat1, lon1, goalData[0].lat, goalData[0].lng);
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
    for(var i = 0; i < buttons.length; i++){
      buttons[i].setAttribute('visible', false);       
    }
     
    question.setAttribute('text', 'value', goalData[0].txt1);
    answer1.setAttribute('text', 'value', goalData[0].txt2);
    answer2.setAttribute('text', 'value', goalData[0].txt3);
    answer3.setAttribute('text', 'value', goalData[0].txt4);
    pushDataToSrv();
}

function pushDataToSrv(){
  for (var i in data){
   serverData.push(data[i].givenAnswer); 
  }

 const url='https://https://augmentedreality.trendtec.de';

 fetch(url, {
  method: 'POST',
  body: serverData,
}).then((response) => {
  console.log(response)
})

}
