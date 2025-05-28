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
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agência de Viagens</title>
    <link rel="stylesheet" href="css/principal.css">
</head>
<body>
    <header>
        <h1>Agência de Viagens</h1>
        <nav>
            <ul>
                <li><a href="#reservas">Reservas</a></li>
                <li><a href="#encomendas">Encomendas</a></li>
                <li><a href="#gerenciamento">Gerenciamento</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="reservas">
            <h2>Reserva de Passagens</h2>
            <form id="reservaForm">
                <input type="text" id="nome" placeholder="Seu nome" required>
                <input type="text" id="destino" placeholder="Destino" required>
                <input type="date" id="data" required>
                <button type="submit">Reservar</button>
            </form>
            <div id="listaReservas"></div>
        </section>

        <section id="encomendas">
            <h2>Cadastro de Encomendas</h2>
            <form id="encomendaForm">
                <input type="text" id="cliente" placeholder="Nome do cliente" required>
                <input type="text" id="descricao" placeholder="Descrição da encomenda" required>
                <button type="submit">Cadastrar Encomenda</button>
            </form>
            <div id="listaEncomendas"></div>
        </section>

        <section id="gerenciamento">
            <h2>Gerenciamento Geral</h2>
            <p>Veja suas reservas e encomendas cadastradas nas seções acima.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Agência de Viagens. Todos os direitos reservados.</p>
    </footer>

    <script src="js/principal.js"></script>
</body>
</html>
