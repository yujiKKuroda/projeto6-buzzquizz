let quizzes;
let dadosDoQuizz;
let acertosUsuario=0;
let transformarPorcentagem=0;

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
            <div class="criarQuizzBotao" onclick="criarComeco()">
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
    console.log("estou re-iniciando quizz");
    console.log(id)
    const promessa = axios.get(`
    https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`
    );
    promessa.then(irParaPaginaQuizz);
}
function irParaPaginaQuizz(resposta){
    console.log("estou re-iniciando irParaPaginaQuizz");
    console.log(resposta, " resposta API")
    dadosDoQuizz = resposta.data;
    document.querySelector(".pagina").innerHTML='';
    renderizarDadosDoQuizz(dadosDoQuizz);
}

function renderizarDadosDoQuizz(dadosDoQuizz){
    console.log("estou re-iniciando renderizarDadosDoQuizz");
    console.log(dadosDoQuizz)
    transformarPorcentagem=0; 
    const paginaQuizz = document.querySelector(".pagina");
    paginaQuizz.innerHTML=""
        
    paginaQuizz.innerHTML= `  
        <div class="topoResponderQuizz">
        <div class="imagemPositionTopo"></div>
        <img src="${dadosDoQuizz.image}" />
            <p>${dadosDoQuizz.title}</p>
        </div>
    `
    dadosDoQuizz.questions.forEach(pergunta => {
        let respostasString = '';
    
        const respostasEmbaralhadas = pergunta.answers;
        respostasEmbaralhadas.sort(comparador);
    
        respostasEmbaralhadas.forEach(resposta => {
            respostasString+= `
                <div 
                    class="opcaoResposta ${resposta.isCorrectAnswer ? "resposta-certa" : "resposta-errada" }" 
                    onclick="VerificarResposta(${resposta.isCorrectAnswer}, this, dadosDoQuizz)" 
                >
                    <img src="${resposta.image}" alt="">
                    <p>${resposta.text}</p>
                </div>
            `    // Aqui em cima, utilizei ternário, " resposta esta correta (?), adiciono a classe resposta-certa, caso contrario(:) adiciono resposta-errada "
        });

        paginaQuizz.innerHTML+= `
            <div class="questaoQuizz">
                <div class="perguntaQuizz" style="background-color:${pergunta.color}"> 
                    <p>${pergunta.title}</p>
                </div>
                <div class="todas-opcoes-resposta">
                    ${respostasString}
                </div>
            </div> 
        `
    });

    paginaQuizz.innerHTML+= '<div class="final-da-pagina"></div>'
    
    
}
function VerificarResposta(ehRespostaCerta, respostaClicada, dadosDoQuizz){

    if (ehRespostaCerta){
        acertosUsuario++;
    }
    const questaoAtual = respostaClicada.parentNode.parentNode;
    const containerRespostas = respostaClicada.parentNode;

    const todasAsRespostas = containerRespostas.querySelectorAll(".opcaoResposta");

    todasAsRespostas.forEach((resposta) => {

        if(resposta.innerHTML !== respostaClicada.innerHTML){
            console.log("ADICIONEI O BAGULHO");
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
    let proximaQuestao = document.querySelector(".topoResponderQuizz")

    questoesQuizz.forEach((questao, index)=> { 

        if(questao.innerHTML === questaoAtual.innerHTML){
            if(index !== questoesQuizz.length-1){
                proximaQuestao = questoesQuizz[index+1];
                

                
            }
            else{
                transformarPorcentagem = Math.round((100*acertosUsuario)/(questoesQuizz.length));
                console.log(acertosUsuario);
                console.log(transformarPorcentagem);
                renderizarResultado(dadosDoQuizz);
                let fimDoQuizz = document.querySelector(".final-da-pagina");
                proximaQuestao = fimDoQuizz;
            }
        } 
        
    });

    setTimeout(()=> {
        proximaQuestao.scrollIntoView({behavior:"smooth"})
    }, 2000);
}
function renderizarResultado(dadosDoQuizz){
    console.log(dadosDoQuizz);



    let pagina = document.querySelector(".pagina");
    let fimDoQuizz = pagina.querySelector(".final-da-pagina");

    let niveis = dadosDoQuizz.levels;
    niveis.sort(ordenador);

        niveis.forEach((dadosNiveis) => {
            if( transformarPorcentagem >=  dadosNiveis.minValue){
                console.log("ENTREI NO IF DO FIM DO QUIZZ")
        
                fimDoQuizz.innerHTML = `
                    
                    <div class="fim-do-quizz">
                    
                        <div class="resultado-fim-do-quizz">
                            <p> ${transformarPorcentagem}% ${dadosNiveis.title}</p>
                        </div>
                        <div class="imagem-texto-fim-quizz">
                            <img src="${dadosNiveis.image}" alt="">
                            <p>${dadosNiveis.text}</p>
                        </div>
                    </div>
                    <div class="reiniciar-quizz" onclick="voltarProTopo(${dadosDoQuizz.id})">
                        <p>reiniciar-quizz</p>
                    </div>
                    <div class="voltar-pagina-inicial" onclick="VoltarPaginaInicial()"><p>Voltar para home</p></div>
                `
                return;
            }

        });
    }

    function VoltarPaginaInicial(){
        buscarQuizzes();
        acertosUsuario = 0;
        
        let topoResponderQuizz = document.querySelector(".pagina");
        setTimeout(()=>{topoResponderQuizz.scrollIntoView({behavior:"smooth"})})

    }

    function voltarProTopo(dados){
        acertosUsuario=0;
        iniciarQuizz(dados);
        let topoResponderQuizz = document.querySelector(".pagina");
        setTimeout(()=>{topoResponderQuizz.scrollIntoView({behavior:"smooth"})})

    }
function comparador() { 
	return Math.random() - 0.5; 
}

function ordenador (level1, level2) {
    if ( level1.minValue < level2.minValue ){
      return -1;
    }
    if ( level1.minValue > level2.minValue ){
      return 1;
    }
    return 0;
  }
