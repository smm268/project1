<?php
// Path to the countryBorders.geo.json file
$jsonFilePath = 'libs/js/countries.json';

// Check if the file exists and load it
if (file_exists($jsonFilePath)) {
    // Get the contents of the JSON file
    $jsonData = file_get_contents($jsonFilePath);

    // Decode the JSON into a PHP array
    $countries = json_decode($jsonData, true);

    // Prepare an array with just ISO codes and country names
    $result = [];
    foreach ($countries as $country) {
        if (isset($country['iso_a2']) && isset($country['name'])) {
            $result[] = [
                'iso' => $country['iso_a2'],
                'name' => $country['name']
            ];
        }
    }

    // Set the header to JSON
    header('Content-Type: application/json');
    
    // Return the result as JSON
    echo json_encode($result);
} else {
    // If the file is not found, return an error
    http_response_code(404);
    echo json_encode(['error' => 'File not found.']);
}
?>
