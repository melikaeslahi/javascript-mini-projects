let $ = document;

const image = $.querySelector('#cover');
const title = $.querySelector('#title');
const artist = $.querySelector('#artist');
const currentTimeEl =$.querySelector('#current-time');
const durationEl = $.querySelector('#duration');
const progress = $.querySelector('#progress');
const audio = $.querySelector('audio');
const prevBtn = $.getElementById('prev');
const playBtn = $.getElementById('play');
const nextBtn = $.getElementById('next');
const background = $.getElementById("background");
const progressContainer = $.getElementById("progress-container");


const songs =[
    {
      path: "./media/music1.mp3",
      displayName: "parishan khail",
      artist: "homayoun shajarian",
      cover:"images/image1.jpeg",
    },
    {
     path: "media/music2.mp3",
     displayName: "mahtab",
     artist: "viguen",
     cover:"images/image2.jpeg",
    },
    {
     path: "media/music3.mp3",
     displayName:"Ahay khabardar",
     artist: "homayoun shajarian",
     cover:"images/image1.jpeg",
     },
     {
     path: "media/music4.mp3",
     displayName: "Chera Rafti",
     artist: "homayoun shajarian",
     cover:"images/image1.jpeg",
     }, 
     {
      path: "media/music5.mp3",
      displayName: "Khaneye Soda",
      artist: "homayoun shajarian",
      cover:"images/image1.jpeg",
    },
    {
      path: "media/music6.mp3",
      displayName: "Bare Degar Faramooshi",
      artist: "homayoun shajarian",
      cover:"images/image1.jpeg",
    },  
]

//check playing

isPlaying = false;

function playSong(){
    isPlaying = true;
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.setAttribute('title' , "pause");
    audio.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause" , "fa-play");
    playBtn.setAttribute('title' , "play");
    audio.pause();
}

playBtn.addEventListener('click' , function () {
    if (isPlaying) {
        pauseSong();
    }else{
        playSong();
    }
    
})

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audio.src = song.path;
    changeCover(song.cover);
}

function changeCover(cover){
    // image.classList.remove("active");
    setTimeout(() => {
      image.src = cover;
    //   image.classList.add("active");
    }, 100);
    // background.src = cover;
}

// Current Song
let songIndex = 0;

//previous song

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songIndex -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

//update progressbar and time

function updateProgressBar(e){
    if (isPlaying) {
        const duration = e.srcElement.duration;
        const currentTime = e.srcElement.currentTime;

        //update progressbar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + "%";
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = "0" + durationSeconds;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
           durationEl.textContent = durationMinutes + ":" + durationSeconds;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }
        currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
    }

}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration =  audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

//event listeners
prevBtn.addEventListener('click' , prevSong);
nextBtn.addEventListener('click' , nextSong );
audio.addEventListener('ended' , nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);


