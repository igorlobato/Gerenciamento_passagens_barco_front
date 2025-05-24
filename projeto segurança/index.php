<?php
session_start();

// Verificar se o usuário está logado, senão redireciona para login.php
if (!isset($_SESSION['token'])) {
    header('Location: login.php');
    exit;
}

// Processar logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    // Chamar a API de logout
    $result = callApi('http://localhost/api/logout', null, 'POST', $_SESSION['token']);
    
    // Destruir a sessão
    session_destroy();
    header('Location: login.php');
    exit;
}

// Função para fazer chamadas à API 
function callApi($url, $data, $method = 'POST', $token = null) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        $token ? "Authorization: Bearer $token" : ''
    ]);
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    file_put_contents('debug.log', "API URL: $url\nMethod: $method\nResponse: $response\nStatus: $httpCode\n", FILE_APPEND);
    return ['response' => json_decode($response, true), 'status' => $httpCode];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Sistema - Bem-vindo</title>
    <style>

    </style>
</head>
<body>
    <div class="dashboard-container">
        <h1>Bem-vindo ao sistema!</h1>
        <p>Você está logado com sucesso.</p>
        <a href="index.php?action=logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Sair</a>
    </div>
</body>
</html>