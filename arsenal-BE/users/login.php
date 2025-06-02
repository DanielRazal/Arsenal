<?php
require '../db.php';

function loginUser($conn, $email, $password)
{
    try {
        $sql = "SELECT TOP 1 * FROM Users WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $password === $user['Password']) {
            return ['success' => 'Login successful', 'user' => $user];
        } else {
            return ['error' => 'Invalid email or password'];
        }
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()];
    }
}

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $input = json_decode(file_get_contents('php://input'), true);
//     if (isset($input['Email'], $input['Password'])) {
//         $result = loginUser($conn, $input['Email'], $input['Password']);
//     } else {
//         $result = ['error' => 'Invalid input'];
//     }
//     echo json_encode($result);
// }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $errors = [];

    $fields = ['Email', 'Password'];
    foreach ($fields as $field) {
        if (empty($input[$field])) {
            $errors[] = "The field is required.";
        }
    }

    if (!empty($errors)) {
        echo json_encode(['errors' => $errors]);
        exit;
    }

    $result = loginUser($conn, $input['Email'], $input['Password']);
    echo json_encode($result);
}
