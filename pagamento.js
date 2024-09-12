document.getElementById('pagamento').addEventListener('change', function() {
    const trocoSection = document.getElementById('trocoSection');
    const trocoValorSection = document.getElementById('trocoValorSection');
    const precisaTroco = document.getElementById('precisaTroco');
    const paymentIcon = document.getElementById('paymentIcon');
    
    if (this.value === 'dinheiro') {
        paymentIcon.className = 'fas fa-money-bill-wave';
        trocoSection.classList.remove('hidden');
    } else {
        trocoSection.classList.add('hidden');
        trocoValorSection.classList.add('hidden');
        precisaTroco.value = '';
        
        if (this.value === 'pix') {
            paymentIcon.className = 'fas fa-qrcode';
        } else if (this.value === 'credito' || this.value === 'debito') {
            paymentIcon.className = 'fas fa-credit-card';
        }
    }
});

document.getElementById('precisaTroco').addEventListener('change', function() {
    const trocoValorSection = document.getElementById('trocoValorSection');
    
    if (this.value === 'sim') {
        trocoValorSection.classList.remove('hidden');
    } else {
        trocoValorSection.classList.add('hidden');
    }
});

document.getElementById('pagamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formaPagamento = document.getElementById('pagamento').value;
    const precisaTroco = document.getElementById('precisaTroco').value;
    const trocoValor = document.getElementById('trocoValor').value || "Não precisa de troco";

    const mensagem = `
        Forma de Pagamento: ${formaPagamento}
        Precisa de Troco: ${precisaTroco}
        Troco para: ${trocoValor}
    `;

    alert(mensagem); // Remova isso depois de implementar o envio para e-mail
});

document.getElementById('pagamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = localStorage.getItem('name');
    const age = localStorage.getItem('age');
    const alergia = localStorage.getItem('alergia');
    const medicamento = localStorage.getItem('medicamento');
    const date = localStorage.getItem('date');
    const horario = localStorage.getItem('horario');

    const pagamento = document.getElementById('pagamento').value;
    const precisaTroco = document.getElementById('precisaTroco').value;
    const trocoValor = document.getElementById('trocoValor').value;

    const data = {
        name, age, alergia, medicamento, date, horario, pagamento, precisaTroco, trocoValor
    };

    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('E-mail enviado com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar o e-mail.');
    });
});

