let quizzes;
let dadosDoQuizz;
let acertos=0;

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
    const promessa = axios.get(`
    https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
    );
    promessa.then(irParaPaginaQuizz);
}
function irParaPaginaQuizz(resposta){
    dadosDoQuizz = resposta.data;
    document.querySelector(".pagina").innerHTML='';
    renderizarDadosDoQuizz(dadosDoQuizz);
}

function renderizarDadosDoQuizz(resposta){
    console.log(resposta)

    const paginaQuizz = document.querySelector(".pagina");
    
    paginaQuizz.innerHTML= `  
        <div class="topoResponderQuizz">
        <img src="${resposta.image} alt="">
            <p> ${resposta.title}</p>
        </div>
    `
    resposta.questions.forEach(pergunta => {
        let respostasString = '';
        console.log(pergunta.answers);
        const respostasEmbaralhadas = pergunta.answers;
        respostasEmbaralhadas.sort(comparador);
        console.log(respostasEmbaralhadas);
        respostasEmbaralhadas.forEach(resposta => {
            respostasString+= `
                <div 
                    class="opcaoResposta ${resposta.isCorrectAnswer ? "resposta-certa" : "resposta-errada" }" 
                    onclick="VerificarResposta(${resposta.isCorrectAnswer}, this)" 
                >
                    <img src="${resposta.image}" alt="">
                    <p>${resposta.text}</p>
                </div>
            `    // Aqui em cima, utilizei ternário, " resposta esta correta (?), adiciono a classe resposta-certa, caso contrario(:) adiciono resposta-errada "
        });
        paginaQuizz.innerHTML+= `
            <div class="questaoQuizz">
                <div class="perguntaQuizz"> 
                    <p>${pergunta.title}</p>
                </div>
                <div class="todas-opcoes-resposta">
                    ${respostasString}
                </div>
            </div> 
        `
    });
    
    
}
function VerificarResposta(ehRespostaCerta, respostaClicada){
    if (ehRespostaCerta){
        acertos++;
    }
    const questaoAtual = respostaClicada.parentNode.parentNode;
    const containerRespostas = respostaClicada.parentNode;

    const todasAsRespostas = containerRespostas.querySelectorAll(".opcaoResposta");

    todasAsRespostas.forEach((resposta) => {
        if(resposta.innerHTML !== respostaClicada.innerHTML){
            resposta.classList.add("resposta-nao-selecionada");
        }
    });
    todasAsRespostas.forEach((resposta)=> {
        resposta.onclick=null;
        if(resposta.classList.contains("resposta-certa")){
            resposta.classList.add("resposta-correta");
        }
        else { 
            resposta.classList.add("resposta-incorreta")
        }
    });
    
    let questoesQuizz = document.querySelectorAll(".questaoQuizz");
    let proximaQuestao;
    questoesQuizz.forEach((questao, index)=> { 
        if(index !== questoesQuizz.length-1){
            if(questao.innerHTML === questaoAtual.innerHTML){
                proximaQuestao = questoesQuizz[index+1];
            } 
        }
    });

    setTimeout(()=> {
        proximaQuestao.scrollIntoView()
    }, 2000);
}
function comparador() { 
	return Math.random() - 0.5; 
}


