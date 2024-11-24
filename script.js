const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function sendEmail(){
  const bodymessage = `Name: ${name.value}<br> Email: ${email.value}<br> Number: ${number.value}<br> Message: ${message.value}<br>`

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : 'beatrizmartins3252@gmail.com',
        Password : "B37BBF3A5B04603978F4705C2483D5E021CE",
        To : 'beatrizmartins3252@gmail.com',
        From : 'beatrizmartins3252@gmail.com',
        Subject : subject.value,
        Body : bodymessage
    }).then(
      message => {
        if (message == "OK"){
          Swal.fire({
            title: "Sucess!",
            text: "Message sent Sucessfully!",
            icon: "success"
          });
        }
      }
    );
}

function checkInputs(){
  const items = document.querySelectorAll(".item");

  for (const item of items){
    if (item.value == ""){
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});



let numeroSorteado = criarNumeroSorteado(); // Gera o número secreto que o jogador precisa adivinhar
let tentativasFeitas = []; // Armazena todas as tentativas feitas pelo jogador

const exibirSenha = () => {
    alert(`A senha sorteada era: ${numeroSorteado}`); // Exibe o número secreto após o jogo
}

document.getElementById('botaoEnviarNumeros').addEventListener('click', function() {
    const tentativaAtual = document.getElementById('inputNumeros').value; // Captura a tentativa do usuário

    if (validarTentativa(tentativaAtual)) { // Verifica se a tentativa é válida
        const { touros, vacas } = avaliarTentativa(tentativaAtual); // Compara a tentativa com o número secreto
        tentativasFeitas.push({ tentativa: tentativaAtual, touros, vacas }); // Armazena a tentativa e o resultado
        exibirResultado(); // Exibe os resultados das tentativas

        if (touros === 4) { // Se o jogador acertou o número, o jogo termina
            alert("Você acertou a senha, parabéns!");
            reiniciarJogo(); // Reinicia o jogo após o acerto
        }

        document.getElementById('inputNumeros').value = ''; // Limpa o campo de entrada após cada tentativa
    } else {
        alert("Você precisa digitar quatro números diferentes."); // Alerta quando a tentativa não é válida
    }
});

// Função para gerar um número secreto com 4 dígitos únicos
function criarNumeroSorteado() {
    let numeros = []; // Armazena os números únicos do segredo

    while (numeros.length < 4) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
        if (!numeros.includes(numeroAleatorio)) {
            numeros.push(numeroAleatorio); // Adiciona o número ao array se ele for único
        }
    }

    return numeros.join(''); // Converte o array de números para uma string
}

// Função para validar se a tentativa tem exatamente 4 números diferentes
function validarTentativa(tentativa) {
    return /^\d{4}$/.test(tentativa) && new Set(tentativa).size === 4; // Verifica se a tentativa contém 4 dígitos únicos
}

// Função para comparar a tentativa com o número secreto e contar os touros e vacas
function avaliarTentativa(tentativa) {
    let touros = 0;
    let vacas = 0;

    for (let i = 0; i < tentativa.length; i++) {
        if (tentativa[i] === numeroSorteado[i]) {
            touros++; // Incrementa touros se o número está correto e na posição certa
        } else if (numeroSorteado.includes(tentativa[i])) {
            vacas++; // Incrementa vacas se o número está correto, mas na posição errada
        }
    }

    return { touros, vacas }; // Retorna a quantidade de touros e vacas
}

// Função para exibir os resultados das tentativas anteriores
function exibirResultado() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpa a área de resultados antes de exibir novas tentativas

    for (let i = tentativasFeitas.length - 1; i >= 0; i--) {
        const tentativaItem = tentativasFeitas[i];
        let resultadoString = '';

        for (let j = 0; j < tentativaItem.tentativa.length; j++) {
            const digito = tentativaItem.tentativa[j];
            if (numeroSorteado[j] === digito) {
                resultadoString += `<span class="bull">${digito}</span>`; // Marca os touros com destaque
            } else if (numeroSorteado.includes(digito)) {
                resultadoString += `<span class="cow">${digito}</span>`; // Marca as vacas com destaque
            } else {
                resultadoString += `<span>${digito}</span>`; // Exibe o número sem destaque
            }
        }

        resultadoDiv.innerHTML += `<p>${resultadoString} - ${tentativaItem.touros} Touros, ${tentativaItem.vacas} Vacas</p>`; // Exibe o resultado da tentativa
    }
}

// Função para reiniciar o jogo, gerando um novo número secreto e limpando as tentativas
function reiniciarJogo() {
    tentativasFeitas = []; // Limpa as tentativas feitas
    numeroSorteado = criarNumeroSorteado(); // Gera um novo número secreto
    exibirResultado(); // Exibe os resultados atualizados
}

let btnResetar = document.getElementById('botaoResetar'); // Seleciona o botão de reiniciar

btnResetar.addEventListener('click', () => {
    window.location.reload(); // Recarrega a página para reiniciar o jogo
});
