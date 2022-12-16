/* VARIAVEIS DE CONTROLE DO NOSSO JOGO */
let perguntasFeitas = [];

// PERGUNTAS DO JOGO
const perguntas = [
    {
        pergunta: "Qual destas lingugens não é considerada uma linguagem de programação?",
        respostas: ["PHP","Javascript","C++","HTML"],
        correta: "resp3"
    },
    {
        pergunta: "Em que Ano o Leandro Nasceu",
        respostas: ["1995","1999","2000","1998"],
        correta: "resp1"
    },
    {     
        pergunta: "O que significa a sigla HTML",
        respostas: ["HipTor My Language","HyperText Markup Language","HT Merge Library","HiperText MarkLanguage"],
        correta: "resp1"
    },
    {
        pergunta: "Em que Ano o Leandro Nasceu",
        respostas: ["1999","1995","1998","2000"],
        correta: "resp0"
    }
];

var qtdPerguntas = perguntas.length - 1;
gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas){
     //Gerar um numero aleatorio;
     let aleatorio = (Math.random() * maxPerguntas).toFixed(); //toFixed() -> tira os decimas e deixa só os inteiros;
     //Converter para numero;
     aleatorio = Number(aleatorio);
     //Mostrar no console qual foi a pergunta sorteada;
     console.log(aleatorio);

     //Verificar se a pergunta sorteada já foi feita;
     if(!perguntasFeitas.includes(aleatorio)){
         //Colocar como pergunta feita;
         perguntasFeitas.push(aleatorio);

         //Preencher o html com os dados da questão sorteado;
         var p_selecionada = perguntas[aleatorio].pergunta;
         console.log(p_selecionada);

         //Alimentar a pergunta vinda do sorteio;
         $("#pergunta").html(p_selecionada);
         $("#pergunta").attr('data-indice',aleatorio);

         //Colocar as respostas
         for(var i = 0; i < 4; i++){
            $('#resp'+i).html(perguntas[aleatorio].respostas[i]);
         }

         //Embarralhar as respostas;
         var pai = $("#respostas"); 
         var botoes = pai.children(); //pega os filhos do elemento id "#respostas" (que são os 4 botoes); 
         
         //botoes.length -> tamanho do array de botoes (4 -> de 0 á 3);
         for(var i = 1; i < botoes.length ; i++){
             pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
         }

     }
    else{
        //Se a pergunta já foi feita;
        console.log("A pergunta já foi feita. Sorteando novamente");

        if(perguntasFeitas.length < qtdPerguntas + 1){
            return gerarPergunta(qtdPerguntas);
        }else{
            alert("Acabaram as perguntas!");
        }

    }


}


$(".resposta").click(function(){
    //Percorrer todas as respostas e desmarcar a classe;
    resetarBotoes();
    //Adicionar a classe selecionada;
    $(this).addClass("selecionada"); // addClass() -> metodo para adicionar uma classe;
});



$("#confirm").click(function(){
     //Pegar o indice da pergunta;
     var indice = $('#pergunta').attr('data-indice');

     //Qual é a resposta certa;
     var respCerta = perguntas[indice].correta;

     //Qual foi a resposta que o usuario selecionaou;
     $(".resposta").each(function(){
         if($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');

            if(respCerta == respostaEscolhida){
                alert("Acertou camarada...");
                proximaPergunta();
            }else{
                console.log("Errou...");
                $('#'+ respCerta).addClass('correta');
                $('#'+ respostaEscolhida).removeClass('selecionada');
                $('#'+ respostaEscolhida).addClass('errada');
                setTimeout(function(){
                    gameOver(); 
                }, 4000);
            }
         }
     });
    
});

function newGame(){
    perguntasFeitas = [];
    resetarBotoes();
    gerarPergunta(qtdPerguntas);
}

function proximaPergunta(){
    
    resetarBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetarBotoes(){
   // each() -> percorre os elementos com a classe ".resposta";
        $(".resposta").each(function(){
             // hasClass() -> pergunta se tem a classe;
             if($(this).hasClass('selecionada')){
                   $(this).removeClass('selecionada');
               }
             if($(this).hasClass('errada')){
                   $(this).removeClass('errada');
               }
             if($(this).hasClass('correta')){
                   $(this).removeClass('correta');
               }
        });
            
}


function gameOver(){
    $('#quiz').addClass("oculto");
    $('#status').removeClass("oculto");   
}

$('#novoJogo').click(function(){
    newGame();
    $('#quiz').removeClass("oculto");
    $('#status').addClass("oculto");
});