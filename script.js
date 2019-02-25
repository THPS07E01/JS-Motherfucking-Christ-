// Modification n°1 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let footerElt = document.getElementsByTagName("footer") // Sélectionne le footer
  let i = 0

  function footerOnClick(){ // Imprime le nombre de cliques en console
    console.log(`Clique n° ${++i}`);
  }

  footerElt[0].addEventListener("click", footerOnClick) // Évènement du clique sur le footer

// Modification n°2 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let navBar = document.getElementById("navbarHeader") // Sélectionne la navbar
  let navBarBtn = document.getElementsByClassName("navbar-toggler") // Sélectionne le bouton de la navbar

  function toggleCollapse(){ // Fonction qui supprime puis ajoute la classe "collapse" à la navbar
    navBar.classList.toggle("collapse");
  }

  navBarBtn[0].addEventListener("click", toggleCollapse) // Évènement du clique sur le bouton de la navbar

// Modification n°3 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let firstEditBtn = document.getElementsByClassName("btn-outline-secondary")[0] // Sélectionne le premier bouton 'Edit'
  let firstCardText = document.getElementsByClassName("card-text")[0] // Sélectionne le texte de la première carte

  function changeTextColor(){ // Change la couleur du texte en rouge
    firstCardText.style.color = "red"
  }

  firstEditBtn.addEventListener("click", changeTextColor) // Évènement du clique sur le bouton 'Edit'

// Modification n°4 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let secondEditBtn = document.getElementsByClassName("btn-outline-secondary")[1] // Sélectionne le deuxième bouton 'Edit'
  let secondCardText = document.getElementsByClassName("card-text")[1] // Sélectionne le texte de la deuxième carte
  let colorText = secondCardText.style // Sélectionne le CSS du texte

  function changeTextColorToGreen(){ // Change la couleur du texte de noir à vert ou l'inverse
    colorText.color == 'green' ? colorText.color = '' : colorText.color = 'green'
  }

  secondEditBtn.addEventListener("click", changeTextColorToGreen) // Évènement du clique sur le bouton 'Edit'

// Modification n°5 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let styleSheets = document.styleSheets[0] // Sélectionne le CSS de la page
  let header = document.getElementsByTagName("header")[0] // Sélectionne la navbar

  function disableCss(){ // Désactive le CSS de la page
    styleSheets.disabled === true ? styleSheets.disabled = false : styleSheets.disabled = true
  }

  header.addEventListener("dblclick", disableCss) // Évènement du double clique sur le 'Header'

// Modification n°6 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  for (let y = 0; y < 6; y++ ) { // Boucle qui permet d'itérer sur toutes les cartes
    let allCards = document.getElementsByClassName("card")[y] // Récupère la carte de l'itération en cours
    let viewBtn = allCards.getElementsByClassName("btn-success")[0] // Récupère le bouton 'View' de chaque carte
    let cardImg = allCards.getElementsByClassName("card-img-top")[0] // Récupère l'image de chaque carte
    let cardText = allCards.getElementsByClassName("card-text")[0] // Récupère le texte de chaque carte
    let isDead = false
    let isAlive = true
    let christ = isDead // Interrupteur On/Off

    function reduceSama() { // Fonction qui modifie les cartes
      if (christ == isDead) {
        cardText.style.display = 'none'
        cardImg.style.width = '20%'
        christ = isAlive
    } else {
        cardText.style.display = 'block'
        cardImg.style.width = ''
        christ = isDead
      }
    }
    viewBtn.addEventListener('mouseover', reduceSama) // Évènement du survol sur le bouton 'View'
  }

// Modification n°7 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let rowCards = document.getElementsByClassName("row")[1] // Récupère le parent de toutes les cartes
  let nextBtn = document.getElementsByClassName("btn-secondary")[0] // Récupère le bouton 'Suivant'
  let matrix = false

  function placeBefore() { // Fonction qui déplace la dernière carte en première position
    rowCards.insertBefore(rowCards.lastChild, rowCards.childNodes[0])
  }

  nextBtn.addEventListener("click", placeBefore) // Évènement du clique sur le bouton 'Suivant'

// Modification n°8 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let previousBtn = document.getElementsByClassName("btn-primary")[0] // Récupère du bouton 'Précédent'

  function placeAfter(event) { // Fonction qui déplace la première carte en dernière position
    event.preventDefault()
    rowCards.insertBefore(rowCards.firstChild, rowCards.childNodes[-1])
  }

  previousBtn.addEventListener('click', placeAfter) // Évènement du clique sur le bouton 'Précédent'

// Modification n°9 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  let logoName = document.getElementsByClassName("navbar-brand")[0] // Récupère la balise 'div' du logo
  let bodyElt = document.getElementsByTagName("body")[0] // Récupère toute la balise 'body'

  function dressUp (){ // Fonction qui modifie la mise en page du site
    document.onkeydown = function moveYourBody(e) {  // Exécution lorsque l'utilisateur appuie sur une touche de son clavier
    let key = e.keyCode;
    switch (key) {
      case 65: // Touche 'A'
        bodyElt.classList = ""
        bodyElt.classList.add("col-4")
        break;
      case 89: // Touche 'Y'
        bodyElt.classList = ""
        bodyElt.classList.add("col-4", "offset-md-4")
        break;
      case 80: // Touche 'P'
        bodyElt.classList = ""
        bodyElt.classList.add("col-4", "offset-md-8")
        break;
      case 66: // Touche 'B'
        bodyElt.classList = ""
        break;
    };
  }}

  logoName.addEventListener("focus", dressUp) // Évènement qui se déclenche suite à la sélection du logo

// =============================================================================
// ZONE SECRETE !! *************************************************************
// =============================================================================
// --------------------- etape 1 -----------------------------------------------
let jsImgElt = document.getElementsByClassName('card-img-top')[2]
let secretUnlocked = false

function unlockTheSecret(e) {
  if (secretUnlocked === false) {
    e.preventDefault();
    let secretSoundElt = document.createElement("audio");
    secretSoundElt.src = "assets/the-legend-of-zelda-ocarina-of-time-secret-sound.mp3";
    secretSoundElt.autoplay = "true";
    document.body.appendChild(secretSoundElt);
    console.log('========================================');
    console.log("       Quête débloquée --- (1/3)");
    console.log("Retrouver le trésor perdu sur cette page");
    console.log('========================================');
    secretUnlocked = true
  }
};

jsImgElt.addEventListener('mouseenter', unlockTheSecret)

// --------------------- etape 2 -----------------------------------------------
let rubyCardElt = document.getElementsByClassName('card')[3]
let rubyImgElt = rubyCardElt.getElementsByClassName('card-img-top')[0]
let rubyTextElt = rubyCardElt.getElementsByClassName('card-text')[0]
let rubyEditElt = rubyCardElt.getElementsByClassName('btn-outline-secondary')[0]
let keyFound = false

function findTheKey() {
  if (secretUnlocked === true && keyFound === false) {
    rubyImgElt.src = 'assets/treasure_key.jpg'
    rubyTextElt.innerHTML = "<p>Bravo tu as trouvé la clé !<br>Ca me rappelle qu'il n'y a pas si longtemps une div était coincée au nord.<br> Je me demande bien si elle y est toujours...</p>"
    rubyTextElt.style.color = 'darkblue'
    let keySoundElt = document.createElement("audio");
    keySoundElt.src = "http://s1download-universal-soundbank.com/mp3/sounds/1562.mp3";
    keySoundElt.autoplay = "true";
    document.body.appendChild(keySoundElt);
    console.log('========================================');
    console.log("    La quête se poursuit  --- (2/3)");
    console.log("    Mais que faire de cette clé...");
    console.log('========================================');
    keyFound = true
  }
};

rubyEditElt.addEventListener('click', findTheKey)

// --------------------- etape 3 -----------------------------------------------
let theLostDiv = document.getElementsByClassName('col-sm-8 col-md-7 py-4')[0]
let divFree = false

function freeTheDiv() {
  if (keyFound === true && divFree === false) {
    let pDivPrincessElt = document.createElement('p')
    pDivPrincessElt.style.color = 'grey'
    pDivPrincessElt.innerHTML = "Princesse Div dit : <a href='assets/secret.html' target='_blank'>Merci de m'avoir libérée</a>"
    theLostDiv.appendChild(pDivPrincessElt)
    let divSoundElt = document.createElement("audio");
    divSoundElt.src = "assets/ff-vii-victory-theme.mp3";
    divSoundElt.autoplay = "true";
    document.body.appendChild(divSoundElt);
    console.log('========================================');
    console.log("      Quête términée  --- (3/3)");
    console.log("    La Princesse Div a été libérée");
    console.log('========================================');
    divFree = true
  }
};

theLostDiv.addEventListener('click', freeTheDiv)

console.log('_/_/_/_/   _/_/_/_/   _/_/_/_/');
console.log('_/         _/         _/');
console.log('_/_/_/_/   _/_/_/     _/_/_/');
console.log('      _/   _/         _/');
console.log('_/_/_/_/   _/         _/');
