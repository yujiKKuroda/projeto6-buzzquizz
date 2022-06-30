// Variáveis que vão armazenar as informações do quizz fornecidas pelo usuário
let titulo = "";
let url = "";
let perguntas = "";
let niveis = "";

//Função que confere se o valor passado é uma URL válida
function ehURL() {
    let dominio = "http://";
    for (let i = 0; i < 7; i++){
        if (dominio[i] !== url[i]) {
            if (dominio[i] !== url[i+1]) {
                return false;
            }
        }
    }
    return true;
}

// Função que valida todos os dados da primeira tela
function validarComeco() {
    let valido = true;
    titulo = tituloQuizz.value;
    url = URLQuizz.value;
    perguntas = quantPerguntas.value;
    niveis = quantNiveis.value;
    if (titulo !== "" && url !== "" && perguntas !== "" && niveis !== "") {
        if (titulo.length > 20 && titulo.length < 65) {
            valido = ehURL();
            if (valido === true) {
                if (perguntas >= 3 && niveis >= 2){
                    return true;
                }
            }
        }
    }
    return false;
}

// Função que imprime a segunda tela
function criarPerguntas() {
    alert("Tudo certo!");
}

// Função que é executada ao clicar. Se estiver tudo certo, avança. Se não, emite um alerta
function confirmarComeco() {
    let resposta = validarComeco();
    if (resposta === true) {
        criarPerguntas();
    } else {
        alert("ERRO: Dados inválidos! Por favor, digite novamente");
    }
}