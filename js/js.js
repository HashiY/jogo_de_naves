function start() {
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");//criando essas div no fundogame
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2' class='anima4'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //Principais variaveis do jogo
    var fimdejogo = false;
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
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;

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
        placar();
        energia();

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
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // jogador com o inimigo1
        if (colisao1.length > 0) {
            energiaAtual--;

            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            //explosao na posicao do inimigo1
            explosao1(inimigo1X,inimigo1Y);

            //reposiciona o inimigo1
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }
        
        // jogador com o inimigo2 
        if (colisao2.length > 0) {
            energiaAtual--;

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
            //Para reposicionar apos alguns segundos
            reposicionaInimigo2();
        }	

        // Disparo com o inimigo1
        if (colisao3.length > 0) {
            pontos = pontos + 100;
            velocidade = velocidade + 0.3;

            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);
            //reposiciona disparo
            $("#disparo").css("left",950);
            //reposiciona inimigo
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        // Disparo com o inimigo2
        if (colisao4.length > 0) {
            pontos = pontos + 50;

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
            
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            //reposiciona
            reposicionaInimigo2();
        }
    
        // jogador com o amigo
        if (colisao5.length > 0) {
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }
    
        //Inimigo2 com o amigo
        if (colisao6.length > 0) {
            perdidos++;

            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();      
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

    //Reposiciona Inimigo2
	function reposicionaInimigo2() {
        //apos 5s
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;
            if (fimdejogo == false) {
                //reposiciona
                $("#fundoGame").append("<div id=inimigo2></div");
            }
        }	
    }	

    //Explosao 2
	function explosao2(inimigo2X,inimigo2Y) {
	    //criando div
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    } // Fim da funcao explosao2()
    
    //Reposiciona Amigo
	function reposicionaAmigo() {
        var tempoAmigo = window.setInterval(reposiciona6, 6000);
        
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;
            
            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    } // Fim da funcao reposicionaAmigo()

    //Explosao 3
    function explosao3(amigoX,amigoY) {
        //cria div
        $("#fundoGame").append("<div id='explosao3' class='anima5'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        //depois de 1s remove
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        }
    } // Fim da funcao explosao3
    
    function placar() {
	    $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    } //fim da funcao placar()

    //Barra de energia
    function energia() {
        if (energiaAtual==3) {
            $("#energia").css("background-image", "url(imgs/energia3.png)");
        }
        if (energiaAtual==2) {
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }
        if (energiaAtual==1) {
            $("#energia").css("background-image", "url(imgs/energia1.png)");
        }
        if (energiaAtual==0) {
            $("#energia").css("background-image", "url(imgs/energia0.png)");
    
            //Game Over
        }
    } // Fim da funcao energia()

}//Fim da funcao start


