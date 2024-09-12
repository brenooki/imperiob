const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicialização do app Express
const app = express();
app.use(bodyParser.json()); // Para processar requisições JSON
app.use(cors()); // Para permitir requisições de diferentes origens

// Configuração do Nodemailer para envio de e-mails via Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'brendorodrigues467@gmail.com', // Seu e-mail do Gmail
        pass: 'vqgoeibhzhuwxjdi' // A senha de app gerada
    }
});

// Função para verificar a configuração de transporte
transporter.verify((error, success) => {
    if (error) {
        console.log("Erro na configuração do Nodemailer:", error);
    } else {
        console.log("Servidor pronto para envio de e-mails");
    }
});

// Rota para envio de e-mail
app.post('/send-email', (req, res) => {
    const { name, age, alergia, medicamento, date, horario, pagamento, precisaTroco, trocoValor } = req.body;

    // Validação dos dados de entrada
    if (!name || !age || !date || !horario) {
        return res.status(400).send({ message: 'Preencha todos os campos obrigatórios!' });
    }

    // Construção do conteúdo do e-mail
    let pagamentoInfo = <p><strong>Pagamento:</strong> ${pagamento}</p>;
    if (pagamento === 'dinheiro') {
        pagamentoInfo += <p><strong>Precisa de Troco:</strong> ${precisaTroco}</p>;
        if (precisaTroco === 'sim') {
            pagamentoInfo += <p><strong>Troco para:</strong> R$ ${trocoValor}</p>;
        }
    }

    // Opções de e-mail
    const mailOptions = {
        from: 'brendorodrigues467@gmail.com', // Seu e-mail do Gmail
        to: 'brendorodrigues467@gmail.com',  // O e-mail para onde será enviado
        subject: 'Novo Agendamento - IMPÉRIO BRONZE',
        html: `
            <h2>Detalhes do Agendamento</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong>Alergia:</strong> ${alergia}</p>
            <p><strong>Medicamento:</strong> ${medicamento}</p>
            <p><strong>Data:</strong> ${date}</p>
            <p><strong>Horário:</strong> ${horario}</p>
            <h3>Forma de Pagamento</h3>
            ${pagamentoInfo}
        `
    };

    // Envio do e-mail via Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Erro ao enviar e-mail:", error);
            return res.status(500).send({ message: 'Erro ao enviar o e-mail', error });
        }
        console.log("E-mail enviado:", info.response);
        res.status(200).send({ message: 'E-mail enviado com sucesso', info });
    });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});