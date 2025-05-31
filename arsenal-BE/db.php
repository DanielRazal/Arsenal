<?php
$serverName = "DANIEL1212\SQLEXPRESS";
$database = "Arsenal";

try {
    $conn = new PDO("sqlsrv:server=$serverName;database=$database");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("שגיאה בחיבור ל-MSSQL: " . $e->getMessage());
}

// try {
//     $sql = "INSERT INTO Users (FirstName, LastName, BirthDate, Email, Password) VALUES (?, ?, ?, ?, ?)";
//     $stmt = $conn->prepare($sql);
//     $stmt->execute(['Daniel', 'Razal', '06-09-1999', 'mr.danielrazal@gmail.com', 'mypassword123']);
//     echo "משתמש נוסף בהצלחה!";
// } catch (PDOException $e) {
//     echo "שגיאה: " . $e->getMessage();
// }
?>