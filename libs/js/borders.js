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