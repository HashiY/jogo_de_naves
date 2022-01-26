function start() {
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");//criando essas div no fundogame
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2' class='anima4'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //Principais variaveis do jogo
    var podeAtirar = true;
    var jogo = {}
    var velocidade = 5;
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
        moveinimigo2();
        moveamigo();
        colisao();

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
            if (topo <= 0) {
                $("#jogador").css("top",topo+10);
            }
        }
        
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);	//baixo

            //evitar que a nave nao desça mais q o 
            if (topo >= 434) {	
                $("#jogador").css("top",topo-10);  
            }
        }
        
        if (jogo.pressionou[TECLA.D]) {
            
            //Chama funco Disparo	
            disparo();
        }
    
    } // fim da funco movejogador()

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade); // vai a esquerda
        $("#inimigo1").css("top",posicaoY);//random para aparecer
            
        //recria para aparecer novamente
        if (posicaoX <= 0) {
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
        }
    } //Fim da funco moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left",posicaoX-3);//esuerda

		//reposiciona		
		if (posicaoX <= 0) {
		    $("#inimigo2").css("left",775);
		}
    } // Fim da funcao moveinimigo2()

    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);//direita
                   
        //reposiciona	
        if (posicaoX > 906) {
            $("#amigo").css("left",0);       
        }
    } // fim da funcao moveamigo()

    function disparo() {
        if (podeAtirar == true) {
            podeAtirar = false;
            //saber a posicao do jogador
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            //de onde o tiro vai aparecer
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            //criando a div
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);//posicionando
            $("#disparo").css("left",tiroX);
            //Fucao de tempo para o tiro mover
            var tempoDisparo = window.setInterval(executaDisparo, 30);
        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); //move
    
            //excluindo o disparo
            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;  
             }
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() {        // do jQuery
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        
        // jogador com o inimigo1
        if (colisao1.length > 0) {
		
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            //explosao na posicao do inimigo1
            explosao1(inimigo1X,inimigo1Y);

            //reposiciona o inimigo1
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }
    } //Fim da funcao colisao()

    //Explosao 1
    function explosao1(inimigo1X,inimigo1Y) {
        //criando div
        $("#fundoGame").append("<div id='explosao1'></div");
        //colocando img de explosao
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        //posicao de onde vai aparecer 
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        //vai crescer ate 200 e vai diminuindo ate 0
        div.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        // removendo
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
	} // Fim da funcao explosao1()

}


