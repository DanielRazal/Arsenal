<?php
require '../db.php';


function registerUser($conn, $firstName, $lastName, $email, $password, $birthdate)
{
    try {
        $sql = "INSERT INTO Users (FirstName, LastName, Email, Password, BirthDate) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$firstName, $lastName, $email, $password, $birthdate]);

        return ['success' => 'User registered successfully'];
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $errors = [];

    $fields = ['FirstName', 'LastName', 'Email', 'Password', 'BirthDate'];
    foreach ($fields as $field) {
        if (empty($input[$field])) {
            $errors[] = "The field {$field} is required.";
        }
    }

    if (!empty($errors)) {
        echo json_encode(['errors' => $errors]);
        exit;
    }

    $result = registerUser(
        $conn,
        $input['FirstName'],
        $input['LastName'],
        $input['Email'],
        $input['Password'],
        $input['BirthDate']
    );

    echo json_encode($result);
}
