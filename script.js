AOS.init();

function toggleForm(type) {
    var formNatural = document.getElementById('form-natural');
    var formArtificial = document.getElementById('form-artificial');
    
    if (type === 'natural') {
        formNatural.style.display = formNatural.style.display === 'block' ? 'none' : 'block';
        formArtificial.style.display = 'none';
    } else if (type === 'artificial') {
        formArtificial.style.display = formArtificial.style.display === 'block' ? 'none' : 'block';
        formNatural.style.display = 'none';
    }
}

document.querySelector('.styled-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name-natural').value;
    const age = document.getElementById('age-natural').value;
    const alergia = document.getElementById('alergia_natural').value;
    const medicamento = document.getElementById('medicamento_natural').value;
    const date = document.getElementById('date_natural').value;
    const horario = document.getElementById('horario_natural').value;

    // Armazenar os dados no localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);
    localStorage.setItem('alergia', alergia);
    localStorage.setItem('medicamento', medicamento);
    localStorage.setItem('date', date);
    localStorage.setItem('horario', horario);

    // Redirecionar para a página de pagamento
    window.location.href = 'pagamento.html';
});
