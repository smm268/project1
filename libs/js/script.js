// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

var map;
let capitalCityWeather;
let capitalCityLat;
let capitalCityLon;
var countryLayer; 
let border;


// tile layers

var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
  }
);

var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
);

var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};

// buttons

var infoBtn = L.easyButton("fa-info fa-xl", function (btn, map) {
  $("#exampleModal").modal("show");
});


// ---------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------

// initialise and add controls once DOM is ready

$(document).ready(function () {
  
  map = L.map("map", {
    layers: [streets]
  }).setView([54.5, -4], 6);
  
  // setView is not required in your application as you will be
  // deploying map.fitBounds() on the country border polygon

  layerControl = L.control.layers(basemaps).addTo(map);


  infoBtn.addTo(map);

})

getCountryNamesAndCodes();

 

//get country codes and names from getCountryCode.json and add to drop down selector

function getCountryNamesAndCodes() {

  $.ajax({

    url: "libs/php/getCountry.php?",

    type: "GET",

    success: function (countries) {

      let option = "";

      for (let country of countries) {

        option += '<option value="' + country[1] + '">' + country[0] + "</option>";

      }
     
      $("#countrySelect").append(option);
   
    },

  });

}
$.ajax({
  url: "libs/php/getBorders.php", 
  type: 'POST', 
  dataType: 'json', 
  success: function(result) {
      if (result && result.features) {
          
          const geojsonLayer = L.geoJSON(result).addTo(map);
          map.fitBounds(geojsonLayer.getBounds());
      } else {
          console.error("Invalid GeoJSON data structure");
      }
  },
  error: function(jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed: ");
  }
});



/*
// Locating user's device and getting info from openCage API
const successCallback = (position) => {
  $.ajax({
      url: "libs/php/openCage.php",
      type: 'GET',
      dataType: 'json',
      data: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
      },

      success: function(result) {
          console.log('openCage PHP',result);
          currentLat = result.data[0].geometry.lat;
          currentLng = result.data[0].geometry.lng;
         
          $("selectOpt select").val(result.data[0].components["ISO_3166-1_alpha-3"]);
          
          let currentCountry = result.data[0].components["ISO_3166-1_alpha-3"];
          $("#countrySelect").val(currentCountry).change();
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
      }
  }); 
}

const errorCallback = (error) => {
          console.error(error);
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);






 // Populate the currency selection dropdowns
 $.ajax({
  type: 'GET',
  url: 'libs/php/getCurrencyList.php',
  dataType: 'json',
  success: function(currencies) {

      if (currencies.status.result == "OK") {
          // Populate the 'from' and 'to' currency dropdowns - 'value' attribute is the currency code
          $.each(currencies.data, function (key, currency) {
              $('#currency').add('#currency').append($('<table></table>').attr({
                  'value': currency.code,
                  'data-name': currency.name
              }).text(currency.name + ' (' + currency.code + ')'));
          });

          // Default the 'convert from' currency to GBP
          $('#exampleModel').val('GBP');
      }
  }
});


$.ajax({
  url: "libs/php/getOpenWeather.php",
  type: 'POST',
  dataType: 'json',
  data: {
      capital: capitalCityWeather,
  }, 
  success: function(result) {
      console.log( result);
      capitalCityLat = result.weatherData.coord.lat;
      capitalCityLon = result.weatherData.coord.lon;
      
      if (result.status.name == "ok") {

          $('#weather').html( result.weatherData.weather[0].description + result.weatherData.main.temp );
         
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("failed");
      }
      
  }); */