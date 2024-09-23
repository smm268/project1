function loadCountries() {
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Specify the URL of the PHP file that returns the JSON
    xhr.open('GET', '/project1/libs/php/getCountryInfo.php', true);


    // Set the callback function to handle the response
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Parse the JSON response
        var countries = JSON.parse(xhr.responseText);

        // Get the select element
        var select = document.getElementById('countrySelect');

        // Clear the existing options
        select.innerHTML = '';

        // Populate the select with the countries
        countries.forEach(function(country) {
          var option = document.createElement('option');
          option.value = country.iso;
          option.textContent = country.name;
          select.appendChild(option);
        });
      } else {
        // Handle errors, e.g., show a message if the request fails
        console.error('Failed to load countries:', xhr.status);
        document.getElementById('countrySelect').innerHTML = '<option value="">Failed to load countries</option>';
      }
    };

    // Send the AJAX request
    xhr.send();
  }

  // Load the countries when the page loads
  window.onload = loadCountries;