function start() {
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");//criando essas div no fundogame
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //Principais variaveis do jogo
    var jogo = {}
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334); // entre 0 a 334
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
    
    jogo.pressionou = [];

    //Verifica se o usuaio pressionou alguma tecla	
	$(document).keydown(function(e){ //se precinou alguma
        jogo.pressionou[e.which] = true;
    });
    
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });
	
    //Game Loop
    jogo.timer = setInterval(loop,30); // cada 30s, temporizador

    function loop() {

        movefundo();
        movejogador();
        moveinimigo1();

    } // Fim da funcao loop()

    //Funcao que movimenta o fundo do jogo
	function movefundo() {
                //vai pegar o valor inicial q seria 0 do css
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);//anda para a esquerda, e chamado a cada 30s
                //se quiser aumentar a velocidade mexe nesse -1
    } // fim da funcao movefundo()
    
    function movejogador() {
	
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));//pega do css
            $("#jogador").css("top",topo-10);//anda 10 para cima
        
            //evitar que a nave sai da div
            if (topo<=0) {
                $("#jogador").css("top",topo+10);
            }
        }
        
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);	//baixo

            //evitar que a nave nao desça mais q o 
            if (topo>=434) {	
                $("#jogador").css("top",topo-10);  
            }
        }
        
        if (jogo.pressionou[TECLA.D]) {
            
            //Chama funco Disparo	
        }
    
    } // fim da funco movejogador()

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade); // vai a esquerda
        $("#inimigo1").css("top",posicaoY);//random para aparecer
            
        //recria para aparecer novamente
        if (posicaoX<=0) {
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
        }
    } //Fim da funco moveinimigo1()

}


