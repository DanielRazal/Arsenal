<?php
require '../db.php';

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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['action'])) {
        $result = ['error' => 'Action not specified'];
    } else {
        $action = $input['action'];

        if ($action === 'register') {
            if (isset($input['FirstName'], $input['LastName'], $input['Email'], $input['Password'], $input['BirthDate'])) {
                $result = registerUser(
                    $conn,
                    $input['FirstName'],
                    $input['LastName'],
                    $input['Email'],
                    $input['Password'],
                    $input['BirthDate']
                );
            } else {
                $result = ['error' => 'Missing registration data'];
            }
        } elseif ($action === 'login') {
            if (isset($input['Email'], $input['Password'])) {
                $result = loginUser($conn, $input['Email'], $input['Password']);
            } else {
                $result = ['error' => 'Missing login data'];
            }
        } else {
            $result = ['error' => 'Unknown action'];
        }
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