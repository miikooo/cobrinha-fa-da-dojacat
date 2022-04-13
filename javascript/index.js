const somDeFundo = new Audio("music/Doja.mp3")
const SomGameOver = new Audio("music/gameover.mp3")
const SomMover = new Audio("music/lesgo.mp3")
const SomComer = new Audio("music/food.mp3")

var direcao = { x: 0, y: 0 }
var cobrinha = [{ x: 5, y: 5 }]
var fruta =
{
    x: Math.floor(Math.random() * 18),
    y: Math.floor(Math.random() * 18)
}


var pontos = 0;

var ultimaVezAtualizada = 0;
var velocidade = 5;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < (1 / velocidade)) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizacaoGame();
}

function verificaColisao() {
    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha.y) {
            return true;
        }
    }
    //VERIFICAR COLISÃO COM PAREDES
    if (cobrinha[0].x >= 18 || cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0) {
        return true;
    }

    return false;

}

function verificarComeuFrutinha() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        SomComer.play();
        pontos = pontos + 1;
        pontuacao.innerHTML = pontos + " 포인트들";
        cobrinha.unshift({ x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y})
        fruta.x= Math.floor(Math.random() * 16) + 2,
        fruta.y = Math.floor(Math.random() * 16) + 2
        velocidade = velocidade + 0.5;                 
    }  
}


function atualizacaoGame() {
    somDeFundo.play();

    var colidiu = verificaColisao();
    if (colidiu == true) {
        somDeFundo.pause();
        SomMover.pause();
        SomGameOver.play();
        alert("PERDEU, PASSA TUDO!")
        cobrinha = [{ x: 5, y: 5 }];
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }
    verificarComeuFrutinha();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y
    cobrinha[0].x += direcao.x

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var cobrinhaParte = document.createElement('div');
        cobrinhaParte.style.gridColumnStart = cobrinha[i].x;
        cobrinhaParte.style.gridRowStart = cobrinha[i].y;

        if (i == 0) {
            cobrinhaParte.classList.add("cabeca");
        } else {
            cobrinhaParte.classList.add("cobra");
        }

        board.appendChild(cobrinhaParte)
    }
    var frutinha = document.createElement('div')
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta");
    board.appendChild(frutinha)


    window.addEventListener('keydown', function (e) {
        console.log(e)

        SomMover.play();

        switch (e.code) {
            case "KeyW":
            case "ArrowUp":
                direcao.x = 0
                direcao.y = -1;
                //Subir
                break;
            case "KeyA":
            case "ArrowLeft":
                direcao.x = -1
                direcao.y = 0
                //Esquerda
                break;
            case "KeyS":
            case "ArrowDown":
                direcao.x = 0
                direcao.y = 1
                //Baixo
                break;
            case "KeyD":
            case "ArrowRight":
                direcao.x = 1
                direcao.y = 0
                //Direita
                break;
        
        }
    })
}

window.addEventListener("keydown", (e) => direcionaCobrinha(e))


principal()






