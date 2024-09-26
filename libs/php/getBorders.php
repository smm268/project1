<?php

ini_set('display-errors', 'on');
error_reporting(E_ALL);


$executionStartTime = microtime(true);

$result = file_get_contents('../json/countryBorders.geo.json');

$decode = json_decode($result,true);    

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 
?>