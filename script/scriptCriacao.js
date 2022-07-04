// Variáveis que vão armazenar as informações do quizz fornecidas pelo usuário
let titulo = "";
let url = "";
let perguntas = 3;
let niveis = "";

let textoPergunta = [];
let corFundo = [];
let correta = [];
let urlCorreta = [];
let incorreta1 = [];
let urlIncorreta1 = [];
let incorreta2 = [];
let urlIncorreta2 = [];
let incorreta3 = [];
let urlIncorreta3 = [];

//Função que confere se o valor passado é uma URL válida
function ehURL(endereco) {
    let dominio = "http://";
    for (let i = 0; i < 7; i++) {
        if (dominio[i] !== endereco[i]) {
            if (dominio[i] !== endereco[i + 1]) {
                console.log(endereco[i]);
                return false;
            }
        }
    }
    return true;
}

function fazerPerguntas(corpo) {
    for (let i = 0; i < perguntas; i++) {
        corpo.innerHTML += `
        <div class="${i+1}">
            <div class="escondido perguntasMinimizado">
                <p class="tituloInterno">Pergunta ${i+1}</p>
                <img src="./img/create.png" onclick="abrirPergunta(this)">
            </div>
            <div class="pergunta${i+1}">
                <form class="prompt basicoPerguntas ${i+1}">
                    <p class="tituloInterno">Pergunta ${i+1}</p>
                    <br class="doze">
                    <input type="text" id="textoPergunta_${i+1}" name="textoPergunta" placeholder="Texto da pergunta" />
                    <input type="text" id="corFundo_${i+1}" name="corFundo" placeholder="Cor de fundo da pergunta" />
                    <br class="vinteeoito">

                    <p class="tituloInterno">Resposta correta</p>
                    <br class="vinteequatro">
                    <input type="text" id="correta_${i+1}" name="correta" placeholder="Respota correta" />
                    <input type="text" id="urlCorreta_${i+1}" name="urlCorreta" placeholder="URL da imagem" />
                    <br class="vinteeoito">

                    <p class="tituloInterno">Respostas incorretas</p>
                    <br class="quatorze">
                    <input type="text" id="incorreta1_${i+1}" name="incorreta1" placeholder="Resposta incorreta 1" />
                    <input type="text" id="urlIncorreta1_${i+1}" name="urlIncorreta1" placeholder="URL da imagem 1" />
                    <br class="trintaedois">
                    <input type="text" id="incorreta2_${i+1}" name="incorreta2" placeholder="Resposta incorreta 2" />
                    <input type="text" id="urlIncorreta2_${i+1}" name="urlIncorreta2" placeholder="URL da imagem 2" />
                    <br class="trintaedois">
                    <input type="text" id="incorreta3-${i+1}" name="incorreta3" placeholder="Resposta incorreta 3" />
                    <input type="text" id="urlIncorreta3_${i+1}" name="urlIncorreta3" placeholder="URL da imagem 3" />
                </form>
            </div>
        </div>
        <br class="vinteequatro">
        `;
    }
}

function abrirMenu(menu) {

}

function ehCor(cor) {
    if (cor.length === 7) {
        let corTeste = cor.toUpperCase();
        if (corTeste[0] === '#') {
            for (let i = 1; i < 7; i++) {
                corTeste[i] = corTeste.charCodeAt(i);
                if ((corTeste[i] < 47 && corTeste[i] > 58) || (corTeste[i] < 64 && corTeste[i] > 71)) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Função que imprime a primeira tela
function criarComeco() {
    let pagina = document.querySelector(".pagina");
    pagina.innerHTML = "";
    let corpo = document.querySelector(".corpo");
    corpo.classList.add("criacao");
    corpo.innerHTML = "";
    corpo.innerHTML += `
    <p class="tituloCriacao">Comece pelo começo</p>
    <br class="vinteesete">
    <form class="prompt basico">
        <input type="text" id="tituloQuizz" name="tituloQuizz" placeholder="Título do seu quizz" />
        <input type="text" id="URLQuizz" name="URLQuizz" placeholder="URL da imagem do seu quizz" />
        <input type="text" id="quantPerguntas" name="quantPerguntas"
            placeholder="Quantidade de perguntas do quizz" />
        <input type="text" id="quantNiveis" name="quantNiveis" placeholder="Quantidade de níveis do quizz" />
    </form>
    <button class="confirmacao" onclick="confirmarComeco()">Prosseguir pra criar perguntas</button>
    `;
}

// Função que valida todos os dados da primeira tela
function validarComeco() {
    let valido = true;
    if (titulo.length > 20 && titulo.length < 65) {
        valido = ehURL(url);
        if (valido === true) {
            if (perguntas >= 3 && niveis >= 2) {
                return true;
            }
        }
    }
    return false;
}

// Função que é executada ao clicar. Se estiver tudo certo, avança. Se não, emite um alerta
function confirmarComeco() {
    titulo = tituloQuizz.value;
    url = URLQuizz.value;
    perguntas = quantPerguntas.value;
    niveis = quantNiveis.value;
    if (titulo !== "" && url !== "" && perguntas !== "" && niveis !== "") {
        if (validarComeco()) {
            criarPerguntas();
        } else {
            alert("ERRO: Dados inválidos! Por favor, digite novamente");
        }
    } else {
        alert("ERRO: Preencha todos os dados para continuar!");
    }
}

// Função que imprime a segunda tela
function criarPerguntas() {
    let corpo = document.querySelector(".corpo");
    corpo.classList.remove("criacao");
    corpo.classList.add("perguntas");
    corpo.innerHTML = "";
    corpo.innerHTML += `
    <p class="tituloCriacao">Crie suas perguntas</p>
    <br class="trintaeseis">
    `;
    fazerPerguntas(corpo);
    corpo.innerHTML += `<button class="confirmacao .pergunta" onclick="confirmarPerguntas()">Prosseguir pra criar níveis</button>`;
}

function validarPerguntas() {
    let valido = true;
    textoPergunta = document.getElementsByName("textoPergunta");
    corFundo = document.getElementsByName("corFundo");
    correta = document.getElementsByName("correta");
    urlCorreta = document.getElementsByName("urlCorreta");
    incorreta1 = document.getElementsByName("incorreta1");
    urlIncorreta1 = document.getElementsByName("urlIncorreta1");
    incorreta2 = document.getElementsByName("incorreta2");
    urlIncorreta2 = document.getElementsByName("urlIncorreta2");
    incorreta3 = document.getElementsByName("incorreta3");
    urlIncorreta3 = document.getElementsByName("urlIncorreta3");

    if ((incorreta1.length >= 1 && urlIncorreta1.length === incorreta1.length) || (incorreta2.length >= 1 && urlIncorreta2.length === incorreta2.length) || (incorreta3.length >= 1 && urlIncorreta3.length === incorreta3.length)) {
        for (let i = 0; i < perguntas; i++) {
            if (textoPergunta[i].value !== "" && corFundo[i].value !== "" && correta[i].value !== "" && urlCorreta[i].value !== "") {
                if (textoPergunta[i].value.length >= 20) {
                    valido = ehCor(corFundo[i].value);
                    if (valido === true) {
                        valido = ehURL(urlCorreta[i].value);
                        if (valido === true) {
                            return 2;
                        }
                    }
                }
                return 1;
            }
        }
    }
    return 0;
}

// textoPergunta corFundo correta urlCorreta incorreta1 urlIncorreta1
function confirmarPerguntas() {
    let resposta = 0;
    resposta = validarPerguntas();
    switch (resposta) {
        case 0:
            alert("ERRO: Preencha todos os dados para continuar!");
            break;
        case 1:
            alert("ERRO: Dados inválidos! Por favor preencha novamente.");
            break;
        case 2:
            alert("Tudo certo :)");
            break;
        default:
            alert("ERRO: desconhecido.");
            break;
    }
}

function abrirPergunta(menu) {
    let recolher = document.querySelector('.escondido.perguntasMinimizado');
    let recolherPai = recolher.parentNode;
    console.log(recolherPai);
}

// Função que imprime a segunda tela
function criarNiveis() {
    alert("Tudo certo!");
}