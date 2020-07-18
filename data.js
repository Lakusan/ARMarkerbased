window.onload = () => {
var data = {staticLoadPlaces()};

};
console.log("data.js");

}

function staticLoadPlaces() {
    console.log("POI Coords loaded");
    return [
        {
            name: "One",
            location: {
                lat: 49.80404, // change here latitude if using static data
                lng: 9.96233, // change here longitude if using static data
                
            }
        },
        {
            name: "Two",
            location: {
                lat: 49.80404, // change here latitude if using static data
                lng: 9.96233, // change here longitude if using static data
            }
        },
    ];  
}


