<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Recuperar Senha</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container" style="justify-content: center; align-items: center;">
        <form class="form-container" action="enviaLinkRecuperacao.php" method="POST" style="width: 100%; max-width: 400px;">
            <h2 style="margin-bottom: 10px;">Recuperar Senha</h2>
            <p style="font-size: 14px;">Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>

            <input type="email" name="email" placeholder="Digite seu e-mail" required class="input">

            <button type="submit">Enviar link</button>

            <a href="login.php" style="margin-top: 20px; font-size: 13px; display: inline-block;">Voltar ao login</a>
        </form>
    </div>
</body>
</html>
