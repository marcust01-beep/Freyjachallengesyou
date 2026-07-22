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
        loadingBar.style.width = progress + '%';
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
        if (battleText) battleText.innerHTML = '<p>' + messages[stage] + ' <span class="hint">(press A)</span></p>';
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
