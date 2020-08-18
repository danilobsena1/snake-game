let canvas = document.getElementById("snake"); // elemento que vai rodar o jogo
let context = canvas.getContext("2d");
let box = 32; //tamanho do quadradinho
let snake = [];
snake[0] = {
    // dando um tamanho para a cobrinha
    x: 8 * box,
    y: 8 * box
}

// criando variavel de direção para a cobrinha
let direction = "right";

// criando o array da comida
let food = {
    // como a comida tem que ficar em lugares aleatorios foi utilizado a função random
    x: Math.floor(Math.random() * 15 + 1) * box, // 
    y: Math.floor(Math.random() * 15 + 1) * box
}

//criando background
function criarBackGround() {
    context.fillStyle = "black";  //fillStyle funciona como o estilo do canvas
    context.fillRect(0, 0, 16 * box, 16 * box); //fillRect desenha o retângulo onde vai acontecer o jogo
}

// criando a cobrinha
function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "lightgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// criando a comida
function drawFood (){
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);
    //  keydown é o evento de clique dos botões do teclado

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left'; // se o botão for o 37 e a direção não for right, mude para left
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {

    //fazendo a cobrinha atravessar os lados da tela
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;


    for(i = 1; i < snake.length; i++){ // i é o corpo da cobra, snake[0] é a cabeça
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ // se por acaso a cabeça se chocar com o corpo., o jogo para e aciona a função de alert
            clearInterval(jogo); //para o jogo
            // alert('');
            alert('\t\tGame Over :[ \n Recarregue a página para jogar novamente');
        }
    }


    criarBackGround();
    criarCobrinha();
    drawFood();

    // criando as posições x e y da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // CRIANDO AS  COORDENADAS DA COBRINHA.
    
    if(direction == "right") { // Se ela for para o lado direito será acrescentado 1 quadradinho a mais.
        snakeX = snakeX + box;
    }
    
    if(direction == "left") { // Se ela for para o lado esquerdo será diminuido 1 quadradinho.
        snakeX = snakeX - box;
    }

    if(direction == "up") { // Se ela for para cima será diminuido 1 quadradinho.
        snakeY = snakeY - box;
    }

    if(direction == "down") { // Se ela for para baixo será acrescentado 1 quadradinho a mais.
        snakeY = snakeY + box;
    }
    
    // aumenando o tamanho da cobra
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }
    else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    // criando a cabeça da cobra
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // metodo unshift que acrescenta uma cabeça no primeiro elemento.
    // unshift ele sempre acrescenta a frente.
}


// criando função setInterval() que atualiza o jogo de tempos em tempos para que a cobrinha consiga se mexer nesse intervalo
let jogo = setInterval(iniciarJogo, 100); //A função iniciarJogo a cada 100 milesegundo ela será renovada e dará continuidade no jogo sem ele travar.

