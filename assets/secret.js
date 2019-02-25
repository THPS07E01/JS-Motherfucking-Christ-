window.onload = function() {  // execution au chargement de la fenêtre
  // initialisation des variables pour pouvoir les utiliser dans toutes les fonctions
  var canvasWidth = 900;
  var canvasHeight = 600;
  var ctx;
  var blockSize = 30;
  var delay = 75;  // temps exprimé en millisecondes
  var snake;
  var apple;
  var widthInBlocks = canvasWidth/blockSize;
  var heightInBlocks = canvasHeight/blockSize;
  var score;
  var timeout;
  var soundAppleElt = document.createElement("audio");
  soundAppleElt.src = "putain.mp3";
  document.body.appendChild(soundAppleElt);
  var soundGameOverElt = document.createElement("audio");
  soundGameOverElt.src = "chatte.mp3";
  document.body.appendChild(soundGameOverElt);

  init();

  function init() {
    var canvas = document.createElement('canvas');  // canvas est une fonction JS qui va permettre de dessiner sur la page
    canvas.width = canvasWidth; // défini une largeur pour le canvas
    canvas.height = canvasHeight; // défini une hauteur pour le canvas
    canvas.style.border = '30px solid gray';  // ajoute une bordure au canvas pour qu'il soit visible
    canvas.style.margin = 'auto';
    canvas.style.display = 'block';
    canvas.style.backgroundColor = 'rgba(221, 221, 221, 0.5)';
    document.body.appendChild(canvas) // lie le canvas au body de la page HTML via "document.body"
    // appendChild est une fonction JS qui permet d'accrocher un tag, dans ce cas cela accroche le canvas au body de la page HTML
    ctx = canvas.getContext('2d');  // afin de dessiner il faut appeler la fonction getContext, le '2d' indique que ce sera un dessin en 2 dimensions car il existe plusieurs manières de dessiner dans un canvas
    snake = new Snake([[6,4], [5,4], [4,4]], 'right');  // creer le serpent
    apple = new Apple([10, 10]);  // creer une pomme
    score = 0;
    refreshCanvas();
  }

  function refreshCanvas() {  // fonction qui anime le serpent
    snake.move();
    if (snake.checkCollisions())
      gameOver();
    else {
      if (snake.isEatingApple(apple)) { // si le serpent mange la pomme, en créer une nouvelle qui ne peut apparaitre sur le serpent
        score++;
        soundAppleElt.play();
        snake.ateApple = true;
        do {
          apple.setNewPosition()
        } while (apple.isOnSnake(snake));
      };
      ctx.clearRect(0, 0, canvasWidth, canvasHeight); // efface le canvas, cela donnera une illusion de mouvement en supprimant la position précédente du snake pour par la suite afficher la nouvelle
      drawScore();
      snake.draw();
      apple.draw();
      timeout = setTimeout(refreshCanvas, delay); // permet de faire appel à la fonction à plusieurs reprise setTimeout(fonction, temps) fonction = fonction à appeler, temps = défini le temps entre chaque appel
    }
  }

  function gameOver() {
    ctx.save();
    ctx.font = 'bold 70px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 5;
    var centerX = canvasWidth/2;
    var centerY = canvasHeight/2;
    ctx.strokeText('GameOver', centerX, centerY/2);
    ctx.fillText('GameOver', centerX, centerY/2);
    ctx.font = 'bold 30px sans-serif';
    ctx.strokeText('Appuis sur ESPACE pour rejouer', centerX, centerY+centerY/2);
    ctx.fillText('Appuis sur ESPACE pour rejouer', centerX, centerY+centerY/2);
    ctx.restore();
    soundGameOverElt.play();
  }

  function restart() {
    snake = new Snake([[6,4], [5,4], [4,4]], 'right');
    apple = new Apple([10, 10]);
    score = 0;
    clearTimeout(timeout);
    refreshCanvas();
  }

  function drawScore() {
    ctx.save();
    ctx.font = 'bold 200px sans-serif';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var centerX = canvasWidth/2;
    var centerY = canvasHeight/2;
    ctx.fillText(score.toString(), centerX, centerY);
    ctx.restore();
  }

  function drawBlock(ctx, position) { // fonction qui dessine chaque blocks composant le serpent
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize); // dessine un rectangle fillRect() avec pour valeurs x = axe horizontal, y = axe vertical, blockSize(1er) = largeur du block à dessiner, blockSize(2eme) = hauteur du block à dessiner
  }

  function Snake(body, direction) { // création du serpent en tant qu'objet
    this.body = body;
    this.direction = direction;
    this.ateApple = false;

    this.draw = function() {  // fonction qui dessine le serpent
      ctx.save(); // sauvegarde les configurations du canvas et les restaure par la suite grace à .restore(), si il n'y avait pas cette fonction tout les elements du canvas serait alors de la même couleur
      ctx.fillStyle = '#FF0000';  // défini la couleur du serpent
      for (var i = 0; i < this.body.length; i++) {  // exécution  d'un boucle pour chaque block composant le serpent
        drawBlock(ctx, this.body[i]);
      };
      ctx.restore();
    };

    this.move = function() {  // fonction pour faire bouger le serpent
      var nextPosition = this.body[0].slice();
      switch (this.direction) {
        case 'left':
          nextPosition[0] -= 1
          break;
        case 'right':
          nextPosition[0] += 1
          break;
        case 'up':
          nextPosition[1] -= 1
          break;
        case 'down':
          nextPosition[1] += 1
          break;
        default:
          throw('Invalid Direction');
      };
      this.body.unshift(nextPosition);
      if (!this.ateApple) // si le serpent vient de manger une pomme ne supprime pas le dernier block lors de ce mouvement
        this.body.pop();
      else
        this.ateApple = false;
    };

    this.setDirection = function(newDirection) {  // fonction qui vérifie que la direction saisie est valide
      var allowedDirections;
      switch (this.direction) {
        case 'left':
        case 'right':
          allowedDirections = ['up', 'down']
          break;
        case 'up':
        case 'down':
          allowedDirections = ['left', 'right']
          break;
        default:
          throw('Invalid Direction');
      };
      if (allowedDirections.indexOf(newDirection) > -1) // Inspecte la valeur newDirection avec les valeurs présente dans allowedDirections. Si la valeur est présente cela retournera son index donc 0 ou 1 et le cas échéant retournera -1
        this.direction = newDirection;
    };

    this.checkCollisions = function() { // verifie qu'il n'y ai pas de game over
      var wallCollision = false;
      var snakeCollision = false;
      var head = this.body[0];
      var rest = this.body.slice(1);
      var snakeX = head[0];
      var snakeY = head[1];
      var minX = 0;
      var minY = 0;
      var maxX = widthInBlocks - 1;
      var maxY = heightInBlocks - 1;
      var isNotBetweenX = snakeX < minX || maxX < snakeX; // verifie que le serpent est toujours sur le terrain sur l'axe horizontal
      var isNotBetweenY = snakeY < minY || maxY < snakeY; // verifie que le serpent est toujours sur le terrain sur l'axe vertical
      if (isNotBetweenX || isNotBetweenY) // verifie si il y a collision avec un mur
        wallCollision = true;
      for (var i = 0; i < rest.length; i++) {
        if (snakeX === rest[i][0] && snakeY === rest[i][1])
          snakeCollision = true;
      };
      return wallCollision || snakeCollision;
    };

    this.isEatingApple = function(appleToEat) {
      var head = this.body[0];
      if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
        return true;
      else
        return false;
    };
  }

  function Apple(position) {
    this.position = position;

    this.draw = function() {
      ctx.save();
      ctx.fillStyle = '#33CC33';
      ctx.beginPath();
      var radius = blockSize/2;
      var x = this.position[0] * blockSize + radius;
      var y = this.position[1] * blockSize + radius;
      ctx.arc(x, y, radius, 0, Math.PI*2, true);
      ctx.fill()
      ctx.restore();
    };

    this.setNewPosition = function() {
      var newX = Math.round(Math.random() * (widthInBlocks - 1));
      var newY = Math.round(Math.random() * (heightInBlocks - 1));
      this.position = [newX, newY];
    };

    this.isOnSnake = function(snakeToCheck) {
      var isOnSnake = false;
      for (var i = 0; i < snakeToCheck.body.length; i++) {
        if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
          isOnSnake = true;
      };
      return isOnSnake;
    };
  }

  document.onkeydown = function handleKeyDown(e) {  // execution lorsque l'utilisateur appui sur une touche de son clavier
    var key = e.keyCode;
    var newDirection;
    switch (key) {
      case 37:
        newDirection = 'left';
        break;
      case 38:
        newDirection = 'up';
        break;
      case 39:
        newDirection = 'right';
        break;
      case 40:
        newDirection = 'down';
        break;
      case 32:
        restart();
        return;
      default:
        return;
    };
    snake.setDirection(newDirection);
  }
}
