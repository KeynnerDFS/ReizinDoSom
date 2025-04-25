const volumes = [0, 0.25, 0.5, 0.75, 1];
const volumeLabels = ['0%', '25%', '50%', '75%', '100%'];
const videoSources = [
  'Cringe.mp4',                       // 0%
  'TralaleloTralala.mp4',            // 25%
  'SolaDaBota.mp4',                  // 50%
  'Backyardgans.mp4',                // 75%
  'PÁSSARO_GRITANDO_ESTOURADO_KKK.mp4' // 100%
];

// Elementos do HTML
const volumeSlot = document.getElementById('volumeSlot');
const playButton = document.getElementById('playButton');
const volumeBar = document.getElementById('volumeBar');
const videoPlayer = document.getElementById('videoPlayer');

// Sons
const clickSounds = [
  new Audio('MemeDeBomba.mp3'),
  new Audio('peido.mp3'),
  new Audio('BotãoAmongus.mp3')
];
const roletaSound = new Audio('roleta.mp3');

playButton.addEventListener('click', () => {
  playButton.disabled = true;

  // Pausa vídeo atual
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoPlayer.src = '';

  // Som aleatório de clique
  const somAleatorio = clickSounds[Math.floor(Math.random() * clickSounds.length)];
  somAleatorio.play();

  // Inicia som da roleta
  roletaSound.loop = true;
  roletaSound.play();

  const tempoRoleta = 3000; // 3 segundos
  const intervalo = 100;
  let tempoPassado = 0;

  const animarRoleta = setInterval(() => {
    const indexAleatorio = Math.floor(Math.random() * volumes.length);
    const valorAleatorio = volumes[indexAleatorio];
    const textoAleatorio = volumeLabels[indexAleatorio];

    volumeSlot.textContent = `Volume ${textoAleatorio}`;
    volumeBar.value = valorAleatorio;
    tempoPassado += intervalo;

    if (tempoPassado >= tempoRoleta) {
      clearInterval(animarRoleta);

      // Para som da roleta
      roletaSound.pause();
      roletaSound.currentTime = 0;

      // Sorteia o valor final real
      const indexFinal = Math.floor(Math.random() * volumes.length);
      const finalVolume = volumes[indexFinal];

      volumeSlot.textContent = `Volume ${volumeLabels[indexFinal]}`;
      volumeBar.value = finalVolume;

      // Exibe vídeo correspondente
      videoPlayer.src = videoSources[indexFinal];
      videoPlayer.volume = finalVolume;
      videoPlayer.muted = false;
      videoPlayer.play();

      playButton.disabled = false;
    }
  }, intervalo);
});
