<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Recuperar Senha</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body style="margin: 0; padding: 0; min-height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(to right, #e2e2e2, #c9d6ff); font-family: 'Montserrat', sans-serif; box-sizing: border-box;">
    <div class="container" style="display: flex; justify-content: center; align-items: center; width: 100%; max-width: 400px; background-color: #fff; border-radius: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35); padding: 30px 20px; position: static; transform: none;">
        <form class="form-container" action="enviaLinkRecuperacao.php" method="POST" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; position: static; padding: 0;">
            <h2 style="font-size: 24px; font-weight: 600; color: #333; margin: 0 0 15px; text-align: center;">Recuperar Senha</h2>
            <p style="font-size: 14px; color: #666; margin: 0 0 20px; text-align: center;">Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
            <input type="email" name="email" placeholder="Digite seu e-mail" required style="width: 100%; max-width: 300px; background-color: #eee; border: none; margin: 10px 0; padding: 12px 15px; font-size: 14px; border-radius: 8px; outline: none; box-sizing: border-box;">
            <button type="submit" style="width: 100%; max-width: 200px; background-color: #512da8; color: #fff; font-size: 14px; padding: 12px; border: none; border-radius: 8px; font-weight: 600; text-transform: uppercase; cursor: pointer;">Enviar link</button>
            <a href="login.php" style="color: #512da8; font-size: 13px; text-decoration: none; margin-top: 20px;">Voltar ao login</a>
        </form>
    </div>
</body>
</html>