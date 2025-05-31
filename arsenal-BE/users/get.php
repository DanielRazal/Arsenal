<?php
require '../db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function getAllUsers($conn)
{
    try {
        $stmt = $conn->query("SELECT * FROM Users");
        $results = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $results[] = $row;
        }
        return $results;
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()];
    }
}

function getUserById($conn, $id)
{
    try {
        $sql = "SELECT * FROM Users WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            return $user;
        } else {
            return ['error' => 'User not found'];
        }
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()];
    }
}

function loginUser($conn, $email, $password)
{
    try {
        // Query to find the user with the given email.
        $sql = "SELECT TOP 1 * FROM Users WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify password using password_verify for added security
        if ($user && $password === $user['Password']) {
            return ['success' => 'Login successful', 'user' => $user];
        } else {
            return ['error' => 'Invalid email or password'];
        }
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()];
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['Email'], $input['Password'])) {
        $result = loginUser($conn, $input['Email'], $input['Password']);
    } else {
        $result = ['error' => 'Invalid input'];
    }
    echo json_encode($result);
} else {
    if (!isset($_GET['id'])) {
        $users = getAllUsers($conn);
        echo json_encode($users);
    } else {
        $user = getUserById($conn, $_GET['id']);
        echo json_encode($user);
    }
}
