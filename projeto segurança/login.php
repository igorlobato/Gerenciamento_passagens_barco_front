<?php
    session_start(); // Inicia a sessão para armazenar mensagens e token

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

// Processar o formulário de login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email']) && isset($_POST['password'])) {
    $data = [
        'email' => $_POST['email'],
        'password' => $_POST['password']
    ];

    $result = callApi('http://localhost/api/login', $data);

    if ($result['status'] === 200) {
        $_SESSION['token'] = $result['response']['token'];
        $_SESSION['signin_success'] = 'Login realizado com sucesso!';
        header('Location: index.php');
        exit;
    } else {
        $_SESSION['signin_error'] = $result['response']['message'] ?? 'Erro ao fazer login. Verifique as credenciais.';
        $_SESSION['form_data'] = [
            'email' => $data['email'],
        ];
    }
}

// Verificar se deve exibir o formulário de cadastro, isso aqui é para quando der erro no cadastro não voltar para o form de login e precisar clicar no inscrever-se denovo.
$showSignup = isset($_GET['form']) && $_GET['form'] === 'signup';

// Obter dados do formulário salvos, se existirem, para caso der erro não precisar preencher tudo novamente.
$formData = $_SESSION['form_data'] ?? [];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Login</title>
</head>

<body>
    <div class="container" id="container" <?php if ($showSignup): ?>class="active"<?php endif; ?>>
        <div class="form-container sign-up">
            <form action="register.php" method="POST">
                <h1>Criar Conta</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>ou use seu e-mail para registro</span>
                <?php
                // Log para depurar
                file_put_contents('debug.log', "signup_error: " . ($_SESSION['signup_error'] ?? 'N/A') . "\n", FILE_APPEND);
                file_put_contents('debug.log', "signup_success: " . ($_SESSION['signup_success'] ?? 'N/A') . "\n", FILE_APPEND);
                ?>
                <?php if (isset($_SESSION['signup_error'])): ?>
                    <div style="color: red;"><?php echo htmlspecialchars($_SESSION['signup_error']); unset($_SESSION['signup_error']); ?></div>
                <?php endif; ?>
                <?php if (isset($_SESSION['signup_success'])): ?>
                    <div style="color: green;"><?php echo htmlspecialchars($_SESSION['signup_success']); unset($_SESSION['signup_success']); ?></div>
                <?php endif; ?>
                <!-- Adicionado campos e  para obrigação de preenchimento antes de enviar o form -->
                <input type="text" name="name" placeholder="Name" value="<?php echo htmlspecialchars($formData['name'] ?? ''); ?>" required>
                <input type="email" name="email" placeholder="E-mail" value="<?php echo htmlspecialchars($formData['email'] ?? ''); ?>" required>
                <input type="text" name="cpf" placeholder="CPF: 9999999999" value="<?php echo htmlspecialchars($formData['cpf'] ?? ''); ?>" required>
                <input type="text" name="numero" placeholder="Number: (99)99999-9999" value="<?php echo htmlspecialchars($formData['numero'] ?? ''); ?>" required>
                <input type="password" name="password" placeholder="Password: 8 characters" required>
                <input type="password" name="password_confirmation" placeholder="Confirm Password" required>
                <button>Inscrever-se</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form action="login.php" method="POST">
                <h1>Entrar</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>ou use sua senha de e-mail</span>
                <input type="email" name="email" placeholder="E-mail" value="<?php echo htmlspecialchars($formData['email'] ?? ''); ?>" >
                <input type="password" name="password" placeholder="Password" >
                <a href="#">Esqueceu sua senha?</a>
                <button>Entrar</button>
                                <?php
                // Log para depurar
                file_put_contents('debug.log', "signin_error: " . ($_SESSION['signin_error'] ?? 'N/A') . "\n", FILE_APPEND);
                file_put_contents('debug.log', "signin_success: " . ($_SESSION['signin_success'] ?? 'N/A') . "\n", FILE_APPEND);
                ?>
                <?php if (isset($_SESSION['signin_error'])): ?>
                    <div style="color: red;"><?php echo htmlspecialchars($_SESSION['signin_error']); unset($_SESSION['signin_error']); ?></div>
                <?php endif; ?>
                <?php if (isset($_SESSION['signin_success'])): ?>
                    <div style="color: green;"><?php echo htmlspecialchars($_SESSION['signin_success']); unset($_SESSION['signup_success']); ?></div>
                <?php endif; ?>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Bem vindo de volta!</h1>
                    <p>Insira seus dados pessoais para usar todos os recursos do site</p>
                    <button class="hidden" id="login">Entrar</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Olá amigo!</h1>
                    <p>Cadastre-se com seus dados pessoais para usar todos os recursos do site</p>
                    <button class="hidden" id="register">Inscrever-se</button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/app.js"></script>
    <!-- Código para mostrar o form de registro ao clicar nele. -->
    <?php if ($showSignup): ?>
    <script>
        document.getElementById('container').classList.add('active');
    </script>
    <?php endif; ?>
</body>

</html>