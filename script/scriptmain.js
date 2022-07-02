let quizzes;
let dadosDoQuizz;
let acertos;

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

const arrayQuizzes = [];

function exibirQuizzes(resposta){
    console.log(resposta);
    quizzes=resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes(){
    const pagina = document.querySelector(".pagina");
    if(arrayQuizzes.length === 0){

        pagina.innerHTML=`
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
            <div class="todosQuizzes" onclick="iniciarQuizz(${quizz.id})">
                <div class="imagemPosition"></div>
                <img src="${quizz.image}"/>
                <div class="tituloQuizz"> 
                    <p>${quizz.title}</p> 
                </div>
            </div>`   
        });
        
    } 
    else if(arrayQuizzes.length !== 0){
        
        pagina.innerHTML=`
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
            <div class="listaTodosQuizzes" ></div>
        `;

        listaQuizzesUsuario = document.querySelector(".listaQuizzesUsuario");
        listaTodosQuizzes = document.querySelector(".listaTodosQuizzes");    

        arrayQuizzes.forEach((quizz) => {
            listaQuizzesUsuario.innerHTML += `
            <div class="todosQuizzes" onclick = "iniciarQuizz(${quizz.id})">
                <div class="imagemPosition"></div>
                <img src="${quizz.image}"/>
                <div class="tituloQuizz"> 
                    <p>${quizz.title}</p> 
                </div>
            </div>`   
        });
        
        quizzes.forEach((quizz) => {
            listaTodosQuizzes.innerHTML += `
            <div class="todosQuizzes" onclick="iniciarQuizz(${quizz.id})">
                <div class="imagemPosition"></div>
                <img src="${quizz.image}"/>
                <div class="tituloQuizz">
                    <p>${quizz.title}</p> 
                </div>
            </div>`   
          });

    }
    
}
function iniciarQuizz(id){

    console.log("entrei")
    const promessa = axios.get(`
    https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
    );
    promessa.then(irParaPaginaQuizz);
}
function irParaPaginaQuizz(resposta){
    console.log(resposta);
    dadosDoQuizz = resposta.data;
    document.querySelector(".pagina").innerHTML='';
    renderizarDadosDoQuizz(dadosDoQuizz);
}

function renderizarDadosDoQuizz(resposta){

    const paginaQuizz = document.querySelector(".pagina");
    
    paginaQuizz.innerHTML= `  
        <div class="topoResponderQuizz">
        <img src="${resposta.image} alt="">
            <p> ${resposta.title}</p>
        </div>
    `
    resposta.questions.forEach(pergunta => {
        paginaQuizz.innerHTML+= `
            <div class="questaoQuizz">
                <div class="perguntaQuizz"> 
                    <p>${pergunta.title}</p>
                </div>
                <div class="todas-opcoes-resposta">
                    <div class="opcaoResposta" onclick="VerificarResposta(${pergunta.answers[0].isCorrectAnswer}, this)" >
                        <img src="${pergunta.answers[0].image}" alt="">
                        <p>${pergunta.answers[0].text}</p>
                    </div>
                    <div class="opcaoResposta" onclick="VerificarResposta(${pergunta.answers[1].isCorrectAnswer}, this)" >
                        <img src="${pergunta.answers[1].image}" alt="">
                        <p>${pergunta.answers[1].text}</p>
                    </div>
                    <div class="opcaoResposta" onclick="VerificarResposta(${pergunta.answers[2]?.isCorrectAnswer}, this)" >
                        <img src="${pergunta.answers[2]?.image}" alt="">
                        <p>${pergunta.answers[2]?.text}</p>
                    </div>
                    <div class="opcaoResposta" onclick="VerificarResposta(${pergunta.answers[3]?.isCorrectAnswer}, this)" >
                        <img src="${pergunta.answers[3]?.image}" alt="">
                        <p>${pergunta.answers[3]?.text}</p>
                    </div>
                </div>
            </div> 
        `
    });
    
    
}
function VerificarResposta(ehRespostaCerta, respostaClicada){
    console.log("entrei na resposta", ehRespostaCerta, respostaClicada)
    if (ehRespostaCerta){
        acertos++;
    }
    const containerRespostas = respostaClicada.parentNode;
    console.log(containerRespostas, "aqui o eu to cansado")

    const todasAsRespostas = containerRespostas.querySelectorAll(".opcaoResposta");

    todasAsRespostas.forEach((resposta) => {
        if(resposta.innerHTML !== respostaClicada.innerHTML){
            resposta.classList.add("resposta-nao-selecionada");
        }
       
    });
    /* respostaClicada.classList.add() */

        

}
