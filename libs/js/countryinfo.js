function setView() {
    $.ajax({
        url: "libs/php/getCountryBorders.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: $('#countrySelect option:selected').val() //getting iso from the value in the option
        },
        success: function(result) {

            if (result.status.name == "ok") {

                console.log(result['border']); //currently just logging the result

            }
      
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};