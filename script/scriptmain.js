let quizzes;


buscarQuizzes();
function buscarQuizzes (){
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"
    );
    promessa.then(exibirQuizzes);
}
//const QuizzesSerializados = localStorage.getItem("arrayQuizzes");
//const arrayQuizzes = JSON.parse(QuizzesSerializados);


// Exemplo de simulação
let quizzExemplo = {
    title: "Testando",
    image: "https://http.cat/411.jpg"
}

const arrayQuizzes = [quizzExemplo];

function exibirQuizzes(resposta){
    console.log(resposta);
    quizzes=resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes(){
    paginaInicial = document.querySelector(".paginaInicial");
    if(arrayQuizzes.length === 0){

        paginaInicial.innerHTML=`
        <div class="Inicio-sem-quizz">
            <div class="criarQuizzInformacao">
                <p>Você não criou nenhum quizz ainda :(</p>
            </div>
            <div class="criarQuizzBotao">
                <p>Criar Quizz</p>
            </div>
        </div>
        <div class="TituloTodosQuizzes">
            <p>Todos os quizzes </p>
        </div>
            <div class="listaTodosQuizzes"></div>
        `;

        listaTodosQuizzes = document.querySelector(".listaTodosQuizzes");

        quizzes.forEach((quizz) => {
            listaTodosQuizzes.innerHTML += `
            <div class="todosQuizzes">
                <div class="imagemPosition"></div>
                <img src="${quizz.image}"/>
                <div class="tituloQuizz"> 
                    <p>${quizz.title}</p> 
                </div>
            </div>`   
        });
        
    } 
    else if(arrayQuizzes.length !== 0){
        
        paginaInicial.innerHTML=`
            <div class="seusQuizzes">
                <div class="tituloQuizzesUsuario">
                    <p> Seus quizzes </p>
                    <ion-icon name="add-circle"></ion-icon>
                </div>
                <div class="listaQuizzesUsuario"></div>
            </div>
            <div class="tituloTodosQuizzes">
                <p>Todos os quizzes </p>
            </div>
            <div class="listaTodosQuizzes"></div>
        `;
        listaQuizzesUsuario = document.querySelector(".listaQuizzesUsuario");
        listaTodosQuizzes = document.querySelector(".listaTodosQuizzes");        
        arrayQuizzes.forEach((quizz) => {
            listaQuizzesUsuario.innerHTML += `
            <div class="todosQuizzes">
                <div class="imagemPosition"></div>
                <img src="${quizz.image}"/>
                <div class="tituloQuizz"> 
                    <p>${quizz.title}</p> 
                </div>
            </div>`   
        });
        
        quizzes.forEach((quizz) => {
            listaTodosQuizzes.innerHTML += `
            <div class="todosQuizzes">
                <div class="imagemPosition"></div>
                <img src="${quizz.image}"/>
                <div class="tituloQuizz">
                 <p>${quizz.title}</p> 
                </div>
            </div>`   
          });

}
}
