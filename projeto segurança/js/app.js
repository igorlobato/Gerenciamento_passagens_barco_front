const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

IMask(document.querySelector('input[name="cpf"]'), {
    mask: '000.000.000-00'
});

IMask(document.querySelector('input[name="numero"]'), {
    mask: '(00) 00000-0000'
});

// Mostrar/ocultar senha
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
        const input = document.querySelector(icon.getAttribute('toggle'));
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});
