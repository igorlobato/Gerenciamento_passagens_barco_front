<?php
session_start();

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
    return ['response' => json_decode($response, true), 'status' => $httpCode];
}

// Processar o formulário de cadastro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'cpf' => $_POST['cpf'],
        'numero' => $_POST['numero'],
        'password' => $_POST['password'],
        'password_confirmation' => $_POST['password_confirmation']
    ];

    // Validação básica no PHP (opcional, já que a API também valida)
    // Se quiserem usar descomentar isso aqui.
    // if (strlen($data['cpf']) !== 11) {
    //     $_SESSION['signup_error'] = 'CPF deve ter 11 dígitos.';
    //     header('Location: login.php');
    //     exit;
    // }
    // if (!preg_match('/^\(\d{2}\)\d{5}-\d{4}$/', $data['numero'])) {
    //     $_SESSION['signup_error'] = 'Número deve estar no formato (99)99999-9999.';
    //     header('Location: login.php');
    //     exit;
    // }

    // Chamar a API
    $result = callApi('http://localhost/api/register', $data);

    if ($result['status'] === 201) {
        $_SESSION['signup_success'] = 'Cadastro realizado com sucesso!';
        header('Location: login.php?form=signup');
        exit;
    } else {
        $_SESSION['signup_error'] = $result['response']['message'] ?? 'Erro ao cadastrar. Verifique os dados.';
        $_SESSION['form_data'] = [
            'name' => $data['name'],
            'email' => $data['email'],
            'cpf' => $data['cpf'],
            'numero' => $data['numero']
        ];
        header('Location: login.php?form=signup');
        exit;
    }
}
?>