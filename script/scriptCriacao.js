// Variáveis que vão armazenar as informações do quizz fornecidas pelo usuário
let titulo = "";
let url = "";
let perguntas = 3;
let niveis = "";

//Função que confere se o valor passado é uma URL válida
function ehURL() {
    let dominio = "http://";
    for (let i = 0; i < 7; i++) {
        if (dominio[i] !== url[i]) {
            if (dominio[i] !== url[i + 1]) {
                return false;
            }
        }
    }
    return true;
}

function fazerPerguntas(corpo) {
    for (let i = 1; i < perguntas; i++) {
        corpo.innerHTML += `
        <br class="vinteequatro">
        <form class="prompt perguntasMinimizado ${i + 1}">
            <p class="tituloInterno">Pergunta ${i + 1}</p>
            <img src="./img/create.png">
        </form>
        `;
    }
}

function abrirMenu(menu) {

}

function ehCor() {
    return true;
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
        valido = ehURL();
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
    <form class="prompt basicoPerguntas 1">
        <p class="tituloInterno">Pergunta 1</p>
        <br class="doze">
        <input type="text" id="textoPergunta" name="textoPergunta" placeholder="Texto da pergunta" />
        <input type="text" id="corFundo" name="corFundo" placeholder="Cor de fundo da pergunta" />
        <br class="vinteeoito">

        <p class="tituloInterno">Resposta correta</p>
        <br class="vinteequatro">
        <input type="text" id="correta" name="correta" placeholder="Respota correta" />
        <input type="text" id="urlCorreta" name="urlCorreta" placeholder="URL da imagem" />
        <br class="vinteeoito">

        <p class="tituloInterno">Respostas incorretas</p>
        <br class="quatorze">
        <input type="text" id="incorreta1" name="incorreta1" placeholder="Resposta incorreta 1" />
        <input type="text" id="corFundo" name="corFundo" placeholder="URL da imagem 1" />
        <br class="trintaedois">
        <input type="text" id="incorreta2" name="incorreta2" placeholder="Resposta incorreta 2" />
        <input type="text" id="corFundo" name="corFundo" placeholder="URL da imagem 2" />
        <br class="trintaedois">
        <input type="text" id="incorreta3" name="incorreta3" placeholder="Resposta incorreta 3" />
        <input type="text" id="corFundo" name="corFundo" placeholder="URL da imagem 3" />
    </form>
    `;
    fazerPerguntas(corpo);
    corpo.innerHTML += `<button class="confirmacao .pergunta" onclick="confirmarPerguntas()">Prosseguir pra criar níveis</button>`;
}
// textoPergunta corFundo correta urlCorreta incorreta1 urlIncorreta1
function validarPerguntas() {
    let valido = true;
    let dados = document.querySelector(`.${i}`);
    
}

function confirmarPerguntas() {
    let resposta = 0;
    for (let i = 1; i < perguntas+1; i++) {
        resposta = validarPerguntas(i);
        switch (resposta) {
            case 0:
                alert("ERRO: Preencha todos os dados para continuar!");
                break;
            case 1:
                alert("ERRO: Dados inválidos! Por favor, digite novamente.");
                break;
            case 2:
                criarNiveis();
                break;
            default:
                alert("ERRO: caso desconhecido, favor atualizar a página.");
                break;
        }
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