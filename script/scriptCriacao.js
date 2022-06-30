// Variáveis que vão armazenar as informações do quizz fornecidas pelo usuário
let titulo = "";
let url = "";
let perguntas = "";
let niveis = "";

function ehURL() {
    try {
        let urlValido = new URL(url);
    } catch (err) {
        return false;
    }
}

// Função que valida todos os dados da primeira tela
function validarComeco() {
    let valido = true;
    titulo = tituloQuizz.value;
    url = URLQuizz.value;
    perguntas = quantPerguntas.value;
    niveis = quantNiveis.value;
    if (titulo !== "" && url !== "" && perguntas !== "" && niveis !== "") {
        console.log("Entrei!");
        if (titulo.length > 20 && titulo.length < 65) {
            console.log("Entrei mais uma vez!");
            valido = ehURL();
            if (valido === true) {
                console.log("E mais uma!");
                if (perguntas >= 3 && niveis >= 2){
                    return true;
                }
            }
        }
    }
    return false;
}

// Função que é executada ao clicar. Se estiver tudo certo, avança. Se não, emite um alerta
function confirmarComeco() {
    let resposta = validarComeco();
    if (resposta === true) {
        //criarPerguntas();
        alert("Tudo certo!");
    } else {
        alert("ERRO: Dados inválidos! Por favor, digite novamente");
    }
}