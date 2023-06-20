const tabuleiro = document.querySelector(".tabuleiro");

let comidaeixoX, comidaeixoY;
let snakeX = 5, snakeY = 10;
let velocityX = 0; velocityY = 0;
let snakecorpo = [];
let game = false
let pointvalue = 0;
let bestPointValue = 0;
let point = document.getElementById('point')
let bestPoint = document.getElementById('bestPoint')
let NamePlayer;
let input = document.querySelector('.Nome');
let level;

const trocaComidalugar = () => {
    comidaeixoX = Math.floor(Math.random() * 20) + 1;
    comidaeixoY = Math.floor(Math.random() * 24) + 1;
}


const trocarDirecao = (e) => {

    if (e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;

    }
}
const inicioGame = () => {
    if (game == true) {
        var confirmar = confirm("Game Over, Jogar denovo?")
        if (confirmar == true) {
            snakeX = 5, snakeY = 10
            game = false
            point.innerHTML = "Poutuação: 0";
            velocityX = 0;
            velocityY = 0;
            pointvalue = 0;
            snakecorpo = [];
        }
        else if (confirmar == false) {
            alert("Você desistiu")
            snakeX = 5, snakeY = 10
            game = false
            location.reload()
        }
    }

    let personalizacao = `<div class="comida" style="grid-area: ${comidaeixoY} / ${comidaeixoX}"></div>`;
    if (snakeX === comidaeixoX && snakeY == comidaeixoY) {
        pointvalue++;
        point.innerHTML = "Pontuação: " + pointvalue;
        if (pointvalue > bestPointValue) {
            bestPoint.innerHTML = "Melhor Pontuação: " + pointvalue;
            bestPointValue = pointvalue;
        }
        trocaComidalugar();
        snakecorpo.push([comidaeixoX, comidaeixoY]);
        console.log(snakecorpo)
    }

    for (let i = snakecorpo.length - 1; i > 0; i--) {
        snakecorpo[i] = snakecorpo[i - 1];
    }

    snakecorpo[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 24) {
        game = true;
    }

    for (let i = 0; i < snakecorpo.length; i++) {

        if (i > 0) {
            personalizacao += `<div class="comida" style="grid-area: ${snakecorpo[i][1]} / ${snakecorpo[i][0]}"></div>`;
        }
        else {
            personalizacao += `<div class="cabeca" style="grid-area: ${snakecorpo[i][1]} / ${snakecorpo[i][0]}"></div>`;
        }

    }
    tabuleiro.innerHTML = personalizacao;

}

function PlayGame() {
    trocaComidalugar();
    setInterval(inicioGame, level);
    document.addEventListener("keydown", trocarDirecao);
    NamePlayer = input.value;
    if (NamePlayer == "") {
        alert("Digite o nome do jogador")
    }
    else {
        document.querySelector(".jogo").classList.add("jogoVisible")
        document.querySelector('.menu-inicial').classList.add("jogo")
        document.querySelector('#NomeJogador').value
        document.querySelector('#Jogador').innerHTML = NamePlayer;
    }
}
function SelectCheckBox(nivel, nivel1, nivel2) {
    switch (nivel) {
        case 'easy':
            level = 100;
            break;
        case 'Medium':
            level = 60;
            break;
        case 'Hard':
            level = 25;
            break;
    }
    document.querySelector(nivel1).disabled = true;
    document.querySelector(nivel2).disabled = true;
    input.classList.add("NomeVisible")
}
