<?php


$jsonFilePath = 'libs/json/countryBorders.geo.json';


$jsonContents = file_get_contents($jsonFilePath);


$data = json_decode($jsonContents, true);


if ($data === null) {
    echo json_encode(['error' => 'Invalid JSON data.']);
    exit();
}


$countryList = [];


if (isset($data['border']['features'])) {
    foreach ($data['border']['features'] as $feature) {
        $isoCode = $feature['properties']['iso_a3'] ?? null;
        $countryName = $feature['properties']['name'] ?? null;

        // Check if both ISO code and country name exist
        if ($isoCode && $countryName) {
            $countryList[] = [
                'iso_a3' => $isoCode,
                'name' => $countryName
            ];
        }
    }
}


usort($countryList, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});


header('Content-Type: application/json');
echo json_encode(['countries' => $countryList]);

?>