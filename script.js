document.addEventListener('DOMContentLoaded', () => {
  const scenes = {
    boot: document.getElementById('bootScene'),
    loading: document.getElementById('loadingScene'),
    battle: document.getElementById('battleScene'),
    evolution: document.getElementById('evolutionScene'),
    invite: document.getElementById('inviteScene')
  };

  const loadingBar = document.getElementById('loadingBar');
  const aButton = document.getElementById('aButton');
  const inviteCard = document.getElementById('inviteCard');
  const battleText = document.getElementById('battleText');
  const partyBall = document.getElementById('partyBall');
  const freyjaSprite = document.getElementById('freyjaSprite');
  const explosion = document.getElementById('explosion');

  let currentScene = 'boot';
  let stage = 0;

  function setScene(name) {
    Object.values(scenes).forEach(scene => scene.classList.remove('active', 'fade-in', 'fade-out'));
    if (name !== 'invite' && inviteCard) inviteCard.classList.remove('show');
    if (scenes[name]) {
      scenes[name].classList.add('active', 'fade-in');
      currentScene = name;
    }
  }

  function pressA() {
    if (currentScene === 'boot') {
      setScene('loading');
      loadingBar.style.width = '0%';
      let progress = 0;
      const interval = setInterval(() => {
        progress += 6;
        loadingBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          setScene('battle');
          if (battleText) battleText.innerHTML = '<p>A wild PartySaur appeared! <span class="hint">(press A)</span></p>';
          if (partyBall) {
            partyBall.style.opacity = '0';
            partyBall.classList.remove('throwing');
          }
          if (freyjaSprite) freyjaSprite.classList.remove('walking');
          if (explosion) explosion.classList.remove('active');
          stage = 1;
        }
      }, 80);
      return;
    }

    if (currentScene === 'battle') {
      const messages = [
        'A wild PartySaur appeared!',
        'Freyja jumps into battle!',
        'Throwing party ball!',
        'Boom! Party time!'
      ];

      if (stage < messages.length) {
        if (battleText) battleText.innerHTML = `<p>${messages[stage]} <span class="hint">(press A)</span></p>`;
        if (stage === 1 && freyjaSprite) freyjaSprite.classList.add('walking');
        if (stage === 2 && partyBall) {
          partyBall.style.opacity = '1';
          partyBall.classList.add('throwing');
        }
        if (stage === 3 && explosion) explosion.classList.add('active');
        stage += 1;
      } else {
        setScene('evolution');
        setTimeout(() => {
          setScene('invite');
          if (inviteCard) inviteCard.classList.add('show');
        }, 1200);
      }
    }
  }

  aButton.addEventListener('click', () => {
    aButton.classList.add('active');
    setTimeout(() => aButton.classList.remove('active'), 180);
    pressA();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'a') {
      aButton.classList.add('active');
      setTimeout(() => aButton.classList.remove('active'), 180);
      pressA();
    }
  });
});

/* ==========================================
   CHANGE SCENE FUNCTION
========================================== */


function changeScene(scene){

    document.querySelectorAll(".scene")
        .forEach(section => {

            section.classList.remove("active");

        });


    scene.classList.add("active");


}



/* ==========================================
   A BUTTON PRESS
========================================== */


function pressA(){


    aButton.classList.add("active");


    setTimeout(()=>{

        aButton.classList.remove("active");

    },200);



    if(gameStarted === false){

        startGame();

    }


}



/* Keyboard A Button */

document.addEventListener(
    "keydown",
    function(event){


        if(
            event.key.toLowerCase() === "a"
        ){

            pressA();

        }


    }
);



/* Mobile A Button */


aButton.addEventListener(
    "click",
    function(){

        pressA();

    }
);



/* ==========================================
   START GAME
========================================== */


function startGame(){


    gameStarted = true;


    screen.classList.add("booting");


    changeScene(loadingScene);



    runLoading();



}



/* ==========================================
   LOADING BAR
========================================== */


function runLoading(){


    loadingProgress = 0;



    const loadingInterval = setInterval(()=>{


        loadingProgress += 5;


        loadingBar.style.width =
            loadingProgress + "%";



        if(loadingProgress >= 100){


            clearInterval(loadingInterval);



            setTimeout(()=>{


                startBattle();


            },800);



        }


    },100);



}



/* ==========================================
   START BATTLE
========================================== */


function startBattle(){


    screen.classList.remove("booting");


    changeScene(battleScene);



}
/* ==========================================
   SCRIPT.JS - PART 2
   BATTLE SEQUENCE
========================================== */


/* ==========================================
   SPRITE ELEMENTS
========================================== */


const partySaur = document.getElementById("partySaur");

const freyjaSprite = document.getElementById("freyjaSprite");

const partyBall = document.getElementById("partyBall");

const explosion = document.getElementById("explosion");

const battleText = document.getElementById("battleText");



/* ==========================================
   BATTLE START SEQUENCE
========================================== */


function startBattle(){


    screen.classList.remove("booting");


    changeScene(battleScene);



    setTimeout(()=>{


        battleMessage(
            "A wild PartySaur appeared!"
        );


    },500);



    setTimeout(()=>{


        freyjaArrives();


    },2500);



}



/* ==========================================
   FREYJA WALKS IN
========================================== */


function freyjaArrives(){


    freyjaSprite.classList.add(
        "walking"
    );



    setTimeout(()=>{


        battleMessage(
            "Freyja joined the battle!"
        );


    },2500);



    setTimeout(()=>{


        throwPartyBall();


    },5000);



}



/* ==========================================
   TEXT BOX UPDATE
========================================== */


function battleMessage(message){


    battleText.innerHTML = `

        <p>
            ${message}
        </p>

    `;


}



/* ==========================================
   PARTY BALL THROW
========================================== */


function throwPartyBall(){


    battleMessage(
        "Freyja used PARTY BALL!"
    );



    partyBall.style.opacity = "1";



    partyBall.classList.add(
        "throwing"
    );



    setTimeout(()=>{


        createExplosion();



    },1200);



}



/* ==========================================
   EXPLOSION
========================================== */


function createExplosion(){


    partyBall.style.opacity = "0";



    explosion.classList.add(
        "active"
    );



    battleMessage(
        "It's super effective!"
    );



    setTimeout(()=>{


        evolutionStart();



    },1500);



}



/* ==========================================
   EVOLUTION SEQUENCE
========================================== */


function evolutionStart(){


    changeScene(
        evolutionScene
    );



    screen.classList.add(
        "evolution-flash"
    );



    setTimeout(()=>{


        screen.classList.remove(
            "evolution-flash"
        );



        showInvitation();



    },3500);



}
/* ==========================================
   SCRIPT.JS - PART 3
   INVITATION REVEAL + RSVP
========================================== */


/* ==========================================
   SHOW INVITATION
========================================== */


function showInvitation(){


    changeScene(
        inviteScene
    );



    const card = document.querySelector(
        ".invite-card"
    );



    card.classList.add(
        "show"
    );



}



/* ==========================================
   RSVP BUTTON
========================================== */


const rsvpButton = document.getElementById(
    "rsvpButton"
);



rsvpButton.addEventListener(
    "click",
    function(){


        /*
          Replace the link below with
          your Google Forms RSVP link
        */


        const googleFormLink =
        https://docs.google.com/forms/d/1LSUz_iss5VpoBAu3pf22RcVnwogjFcrFYt8ZX3VBAlc/edit?eops=0;



        window.open(
            googleFormLink,
            "_blank"
        );



    }
);



/* ==========================================
   SCREEN START PROTECTION
========================================== */


window.addEventListener(
    "load",
    function(){


        changeScene(
            bootScene
        );


    }
);
document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("aButton");

    button.addEventListener("click", () => {

        console.log("A button pressed");

        pressA();

    });


    document.addEventListener("keydown", (event) => {

        if(event.key.toLowerCase() === "a"){

            console.log("Keyboard A pressed");

            pressA();

        }

    });

});



/* ==========================================
   OPTIONAL RETRO SOUND HOOK
========================================== */


/*

You can add Game Boy sounds later:

function playSound(file){

    const sound =
    new Audio(file);

    sound.play();

}

Example:

playSound("assets/audio/start.wav");

*/
