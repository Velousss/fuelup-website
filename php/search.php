<?php
include 'db_config.php';

$searchTerm = $_GET['search'] ?? '';

$sql = "SELECT * FROM stations WHERE name LIKE '%$searchTerm%' OR services LIKE '%$searchTerm%' OR amenities LIKE '%$searchTerm%' OR manager LIKE '%$searchTerm%'";
$result = $conn->query($sql);

$stations = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $stations[] = $row;
    }
}

echo json_encode($stations);

$conn->close();
?>
