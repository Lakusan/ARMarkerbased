window.onload = () => {
var placesTxt = document.getElementById("places");


 var staicPlaces = function staticLoadPlaces() {

        return [
            {
                "POI_1": {
                    "Position": {
                        "Longitude": 9.96233,
                        "Latitude": 49.80404
                    }
                },

                "POI_2": {
                    "Position": {
                        "Longitude": 9.96233,
                        "Latitude": 49.80404
                    }
                }
            }
        ];
    }
placesTxt.innerHTML = "Places: " + staticPlaces;
}

