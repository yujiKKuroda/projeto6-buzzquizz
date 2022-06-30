let quizzes;

buscarQuizzes();
function buscarQuizzes (){
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
    );
    promessa.then(exibirQuizzes);
}

function exibirQuizzes(resposta){
    console.log(resposta);
    quizzes=resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes(){
    quizzRenderizado = '';
    quizzes.forEach((quizz) => {
        quizzRenderizado += `
        <div class="todosQuizzes">
       <img src="${quizz.image}"/>
            <div class="tituloQuizz"> <p>${quizz.title}</p> </div>
        </div>`   
    });

    document.querySelector(".paginaInicial").innerHTML = quizzRenderizado;
}