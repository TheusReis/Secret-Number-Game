let numerosSorteados = [];
let numeroLimite = 100;
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();
mensagemInicial();

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  if (numerosSorteados.length == numeroLimite) {
    numerosSorteados = [];
  }
  if (numerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  }else{
    numerosSorteados.push(numeroEscolhido);
    console.log(numerosSorteados);
    console.log(numeroEscolhido);
    return numeroEscolhido;
  }
}

function mensagemInicial() {
  mostrarNaTela('h1', 'Jogo do número secreto');
  mostrarNaTela('p', 'Tente adivinhar o número secreto entre 0 e 10');
}

function mostrarNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ('speechSynthesis' in window) {
    let fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.rate = 1.2;
    window.speechSynthesis.speak(fala);
  }else{
    console.log('navegador não suporta speechSynthesis');
  }
}

function chutarNumero() {
  chute = parseInt(document.querySelector('input').value);
  if (chute == numeroSecreto) {
    mostrarNaTela('h1', 'Parabéns! Você acertou!');
    if (tentativas == 1) {
      mostrarNaTela('p', 'Você é um ninja! acertou na primeira tentativa!');
    } else {
      mostrarNaTela('p', 'Você acertou o número secreto! Com ' + tentativas + ' tentativas');
    }
    document.getElementById('reiniciar').removeAttribute('disabled');

  } else { 
      if (chute > numeroSecreto) {
      mostrarNaTela('p', 'O número secreto é menor');
      } else {
      mostrarNaTela('p', 'O número secreto é maior');
      }
      tentativas++;
      zerarCampoChute();
    }
}

function zerarCampoChute() {
  document.querySelector('input').value = '';
}

function reiniciarJogo() {
  tentativas = 1;
  numeroSecreto = gerarNumeroAleatorio();
  zerarCampoChute();
  mensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}