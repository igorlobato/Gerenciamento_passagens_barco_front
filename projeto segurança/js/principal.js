// Gerenciar Reservas
const reservaForm = document.getElementById('reservaForm');
const listaReservas = document.getElementById('listaReservas');

reservaForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const destino = document.getElementById('destino').value;
    const data = document.getElementById('data').value;

    const div = document.createElement('div');
    div.classList.add('item');
    div.textContent = `${nome} reservou passagem para ${destino} na data ${data}.`;

    listaReservas.appendChild(div);

    reservaForm.reset();
});

// Gerenciar Encomendas
const encomendaForm = document.getElementById('encomendaForm');
const listaEncomendas = document.getElementById('listaEncomendas');

encomendaForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value;
    const descricao = document.getElementById('descricao').value;

    const div = document.createElement('div');
    div.classList.add('item');
    div.textContent = `${cliente} cadastrou uma encomenda: ${descricao}.`;

    listaEncomendas.appendChild(div);

    encomendaForm.reset();
});

document.getElementById('formContato').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso!');
});
