<?php
include 'db_config.php';

header('Content-Type: application/json');

$sql = "SELECT * FROM stations";
$result = $conn->query($sql);

$stations = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $stations[] = $row;
    }
}

// Return data as JSON
echo json_encode($stations);

$conn->close();
?>
