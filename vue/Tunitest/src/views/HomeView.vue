<script setup>

import { ref, watch, onMounted } from 'vue';
import { nextTick } from 'vue';
import axios from 'axios';
import musicData from '/src/assets/data.json';
console.log(musicData.playlist1.length)

console.log(musicData)
//import fs from 'fs/promises';

//import path from 'path';
const currentPlaylist = ref(musicData.playlist1.value)
console.log(currentPlaylist.value)
const currentPlaylistNb = ref(musicData.playlist1.length)
const audio = ref(null);
const timer = ref(null);
const timerCount = ref('0:00')
const currentMusicIndex = ref(1);
const duration = ref(null)
const isRandom = ref(false);



import music1 from '/src/assets/music/music1.mp3';
import music2 from '/src/assets/music/music2.mp3';
import music3 from '/src/assets/music/music3.mp3';
import music4 from '/src/assets/music/music4.mp3';
import music5 from '/src/assets/music/music5.mp3';



import music6 from '/src/assets/music/music6.mp3';
import music7 from '/src/assets/music/music7.mp3';
import music8 from '/src/assets/music/music8.mp3';

import cover1 from '/src/assets/cover/cover1.jpeg';
import cover2 from '/src/assets/cover/cover2.jpeg';
import cover3 from '/src/assets/cover/cover3.jpeg';
import cover4 from '/src/assets/cover/cover4.jpeg';
import cover5 from '/src/assets/cover/cover5.jpeg';
import cover6 from '/src/assets/cover/cover6.jpeg';
import cover7 from '/src/assets/cover/cover7.jpeg';
import cover8 from '/src/assets/cover/cover8.jpeg';


const Play1mp3 = [music1, music2, music3,music4,music5];
const Play2mp3 = [music6, music7, music8];

const Play1img = [cover1, cover2, cover3,cover4,cover5];
const Play2img = [cover6, cover7, cover8];


/*
const url = "http://pauluxnetwork.synology.me:5668/webapi/entry.cgi"


const coverFiles = [];
const musicFiles = [];


for (let i = 1; i <= 7; i++) {
    let music = `http://localhost:3000/music/music${i}.mp3`;
    let cover = `http://localhost:3000/cover/cover${i}.jpeg`; 

    
    musicFiles.push(music);
    coverFiles.push(cover);
}

console.log(coverFiles);
console.log(musicFiles);

/*

const musicFilesGlob = import.meta.glob('/src/assets/music/*.mp3');
const coverFilesGlob = import.meta.glob('/src/assets/cover/*.jpeg');

for (const path in musicFilesGlob) {
    if (Object.hasOwnProperty.call(musicFilesGlob, path)) {
        musicFiles.push(path);
    }
}

for (const path in coverFilesGlob) {
    if (Object.hasOwnProperty.call(coverFilesGlob, path)) {
        coverFiles.push(path);
    }
}
console.log(coverFiles);
console.log(musicFiles);

*/



let actualAudio = Play1mp3[currentMusicIndex.value - 1];
let actualCover = Play1img[currentMusicIndex.value - 1];

let previousAudio = null;
let AudioNow = new Audio(actualAudio);
let coverNow = new Image();
coverNow.src = actualCover.src;

const audioElement = ref(null);
const isPlay = ref(false);
const coverImageSrc = ref(actualCover);


watch(currentMusicIndex, (newIndex) => {
  actualAudio = Play1mp3[newIndex - 1];
  actualCover = Play1img[newIndex - 1];
});

watch(actualAudio, (newAudio) => {
  AudioNow = new Audio(newAudio);
  audioElement.value = AudioNow;
  actualCover = Play1img[Play1mp3.indexOf(newAudio)];
  console.log('up to date');
});


AudioNow.addEventListener('ended', () => {
  nextAudio();
  
});


const nextAudio = () => {
  time = 0;
  if (previousAudio) {
    previousAudio.pause();
    previousAudio.currentTime = 0;
  }

  if (isRandom.value == false){

 
    if (currentMusicIndex.value === currentPlaylistNb.value) {
      console.log("FAIS EL")
    currentMusicIndex.value = 1;
    isPlay.value = true;
  } else {
    currentMusicIndex.value += 1;
    isPlay.value = true;
  }
  }
  else{
    currentMusicIndex.value = Math.floor(Math.random() * currentPlaylistNb.length)+1
    isPlay.value = true;
  }


  actualAudio = Play1mp3[currentMusicIndex.value - 1];
  actualCover = coverFiles[currentMusicIndex.value - 1];
  audioElement.value = new Audio(actualAudio);
  AudioNow.src = actualAudio;
  AudioNow.play();
  previousAudio = AudioNow;

  // Update the cover image src
  coverImageSrc.value = actualCover;
};
const prevAudio = () => {
  time = 0;
  if (previousAudio) {
    previousAudio.pause();
    previousAudio.currentTime = 0;
  }

  if (isRandom.value == false){
    if (currentMusicIndex.value === 1) {
    currentMusicIndex.value = currentPlaylistNb.length;
    isPlay.value = true;
  } else {
    currentMusicIndex.value -= 1;
    isPlay.value = true;
  }
  }
  else{
    currentMusicIndex.value = Math.floor(Math.random() * currentPlaylistNb.length)+1
    console.log(currentMusicIndex.value)
    isPlay.value = true;
  }

  actualAudio = Play1mp3[currentMusicIndex.value - 1];
  actualCover = Play1img[currentMusicIndex.value - 1];
  AudioNow = new Audio(actualAudio);
  AudioNow.src = actualAudio;
  AudioNow.play();
  audioElement.value = AudioNow;
  previousAudio = AudioNow;

  // Update the cover image src using nextTick
  nextTick(() => {
    coverImageSrc.value = actualCover;
  });
};

const pauseAudio = () => {
  const audio = AudioNow;

  if (audio.paused === false) {
    audio.pause();
    isPlay.value = false;
  } else {
    audio.play();
    isPlay.value = true;
  }
};

const randomSong = () => {
  if (isRandom.value == false){
    isRandom.value = true;
  }
  else {
    isRandom.value = false;
  }
  
  console.log(isRandom);
}

const formatDuration = (totalSeconds) => {
    // Convertir la durée totale en minutes et secondes
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds - minutes * 60);
    // Ajouter un zéro devant les secondes si elles sont inférieures à 10
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // Retourner la durée formatée
    return minutes + ":" + seconds;
}

let time = 0;
const timerSetup = () => {
  audioElement.value = AudioNow;
  duration.value = formatDuration(audioElement.value.duration);
  console.log('yes', duration.value)
   if (isPlay.value == true){
    time += 1;
   }
    console.log('time : ' + time)
    
    // Convertir le temps en minutes et secondes
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    // Ajouter un zéro devant les secondes si elles sont inférieures à 10
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    
    // Mettre à jour le contenu du minuteur
    timerCount.value = minutes + ":" + seconds;
    console.log(' nope ' + timerCount.value)
}


const checkTimer = () => {
  if (timerCount.value === duration.value) {
    nextAudio();
  }
};

const moreTime = () =>{
    time += 10;
    AudioNow.currentTime += 10;
  }


setInterval(timerSetup, 1000);
setInterval(checkTimer, 1000);
</script>

<template>
  <main>
    <div class="logo">
        <svg width="40" height="40" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.3311 5.17065C30.3311 5.17065 16.1427 -3.4984 6.57209 1.61342C-2.99853 6.72426 0.185223 24.0925 2.00174 31.3658C3.8173 38.639 7.71371 39.692 13.201 38.6673C18.6893 37.6416 32.4633 33.5282 37.7212 22.3081C42.98 11.088 30.3311 5.17065 30.3311 5.17065ZM10.5537 15.5375C9.89915 17.7563 9.73648 20.1252 9.69775 21.335C9.68129 21.8493 9.30946 22.2808 8.80789 22.3753C8.79917 22.3772 8.78949 22.3792 8.78077 22.3802C8.14848 22.498 7.55491 22.0422 7.49585 21.3983C7.24893 18.7275 7.99549 16.1521 8.46124 14.8547C8.66652 14.2829 9.29494 13.9839 9.86139 14.1962C9.87495 14.2011 9.8885 14.2059 9.90206 14.2108C10.4298 14.4124 10.7145 14.993 10.5537 15.5375ZM16.2531 14.5215C15.2461 17.9327 14.9963 21.5756 14.9372 23.4351C14.912 24.2182 14.3504 24.8825 13.5845 25.0276C13.5612 25.0325 13.538 25.0364 13.5148 25.0413C12.5542 25.2185 11.646 24.5279 11.5549 23.551C11.1696 19.4337 12.3218 15.4615 13.0393 13.4657C13.356 12.5861 14.3233 12.1361 15.1948 12.4634C15.2083 12.4682 15.2219 12.4731 15.2354 12.478C16.0536 12.7887 16.502 13.678 16.2531 14.5215ZM21.3754 26.3241C21.3386 27.4657 20.5146 28.4242 19.3981 28.6345C19.3788 28.6384 19.3584 28.6423 19.3381 28.6462C17.9408 28.9063 16.6249 27.9011 16.4923 26.478C15.9423 20.547 17.601 14.8274 18.6351 11.95C19.0892 10.6877 20.4797 10.0273 21.7307 10.4938C21.7579 10.5036 21.785 10.5143 21.8111 10.524C22.9973 10.976 23.6257 12.2744 23.2655 13.4978C21.8208 18.408 21.4616 23.6445 21.3754 26.3241ZM27.4921 16.4131C26.609 19.4093 26.3902 22.6061 26.3379 24.2387C26.3156 24.9283 25.8189 25.5108 25.145 25.6384C25.1295 25.6413 25.1149 25.6442 25.1004 25.6471C24.2551 25.804 23.4485 25.2088 23.3672 24.3487C23.0263 20.7292 24.0392 17.2352 24.6705 15.48C24.9484 14.7076 25.7986 14.3121 26.5645 14.5995C26.5761 14.6033 26.5887 14.6082 26.6003 14.6121C27.3207 14.8868 27.7109 15.6709 27.4921 16.4131ZM30.7204 18.4236C30.2527 20.0132 30.1365 21.709 30.1084 22.575C30.0968 22.9412 29.8334 23.2519 29.4752 23.3201C29.4684 23.3211 29.4606 23.323 29.4529 23.324C28.9988 23.4088 28.5727 23.0854 28.5291 22.6227C28.3519 20.7058 28.8874 18.857 29.2224 17.9258C29.3706 17.5119 29.8247 17.3024 30.2343 17.4563C30.2411 17.4593 30.2469 17.4612 30.2537 17.4641C30.6362 17.6102 30.8366 18.0291 30.7204 18.4236Z" fill="white"/>
        </svg>
    </div>
    <div class="single">
      <img :src="coverImageSrc">
      <div class="music">
        <div class="data">
        <h2>{{ musicData.playlist1[currentMusicIndex-1].name }}</h2>
        <h3>{{ musicData.playlist1[currentMusicIndex-1].artist }}</h3>
      </div>
      <div ref="timerSetup" ><p id="timer"> {{ timerCount }} / {{ duration}}</p></div>
        
        <audio id="myaudio" ref="audioElement"   control v-if="AudioNow.src">
          
          <!--<source :src="audioSRC" type="audio/mpeg">-->
          <source :src="AudioNow.src" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <div v-else>Loading audio...</div>
        <div class="musicSet">
        <div class="ctrl">
          <svg @click="moreTime" fill="#ffffff" width="20" height="20" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
          <path d="M21,15a3,3,0,0,0-3,3v3a3,3,0,0,0,6,0V18A3,3,0,0,0,21,15Zm1,6a1,1,0,0,1-2,0V18a1,1,0,0,1,2,0Z
          M13,12V7a1,1,0,0,0-2,0v4H8a1,1,0,0,0,0,2h4A1,1,0,0,0,13,12Z
          M23,2a1,1,0,0,0-1,1V5.374A12,12,0,1,0,7.636,23.182,1.015,1.015,0,0,0,8,23.25a1,1,0,0,0,.364-1.932A10,10,0,1,1,20.636,7H18a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V3A1,1,0,0,0,23,2Z
          M15.383,15.076a1,1,0,0,0-1.09.217l-3,3a1,1,0,0,0,1.414,1.414L14,18.414V23a1,1,0,0,0,2,0V16A1,1,0,0,0,15.383,15.076Z"/></svg>
          <div class="ctrl2">
          
          <svg @click="prevAudio" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0304 2.99718C13.4968 2.64331 14.1668 2.97601 14.1668 3.5615V13.439C14.1668 14.0246 13.4968 14.3572 13.0304 14.0034L6.52023 9.0646C6.14658 8.78112 6.14658 8.21941 6.52023 7.93594L13.0304 2.99718ZM15.5835 3.5615C15.5835 1.80502 13.5735 0.806938 12.1742 1.86853L5.664 6.8073C4.54306 7.65763 4.54306 9.3429 5.664 10.1933L12.1742 15.132C13.5735 16.1936 15.5835 15.1955 15.5835 13.439V3.5615Z" fill="white"/>
            <path d="M2.8335 2.12533C2.8335 1.73413 2.51638 1.41699 2.12516 1.41699C1.73395 1.41699 1.41683 1.73413 1.41683 2.12533V14.8753C1.41683 15.2665 1.73395 15.5837 2.12516 15.5837C2.51638 15.5837 2.8335 15.2665 2.8335 14.8753V2.12533Z" fill="white"/>
            </svg>
            <div id="play" @click="pauseAudio" >
                <svg @click="timerSetup" v-if="isPlay" width="40" height="40" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.25 9.75C3.25 6.68587 3.25 5.1538 4.20191 4.20191C5.1538 3.25 6.68587 3.25 9.75 3.25C12.8141 3.25 14.3462 3.25 15.2981 4.20191C16.25 5.1538 16.25 6.68587 16.25 9.75V29.25C16.25 32.3141 16.25 33.8461 15.2981 34.7981C14.3462 35.75 12.8141 35.75 9.75 35.75C6.68587 35.75 5.1538 35.75 4.20191 34.7981C3.25 33.8461 3.25 32.3141 3.25 29.25V9.75Z" fill="white"/>
                  <path d="M22.75 9.75C22.75 6.68587 22.75 5.1538 23.7019 4.20191C24.6539 3.25 26.1859 3.25 29.25 3.25C32.3141 3.25 33.8461 3.25 34.7981 4.20191C35.75 5.1538 35.75 6.68587 35.75 9.75V29.25C35.75 32.3141 35.75 33.8461 34.7981 34.7981C33.8461 35.75 32.3141 35.75 29.25 35.75C26.1859 35.75 24.6539 35.75 23.7019 34.7981C22.75 33.8461 22.75 32.3141 22.75 29.25V9.75Z" fill="white"/>
                  </svg>

                <svg @click="timerSetup" v-if="!isPlay" width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.465 16.367C41.1784 18.3864 41.1784 23.6136 37.465 25.6329L15.0441 37.8254C11.4351 39.788 7 37.2335 7 33.1924V8.80757C7 4.76644 11.4351 2.21203 15.0441 4.17459L37.465 16.367Z" fill="white"/>
                </svg>
            </div>
          
          
          <svg @click="nextAudio" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.96961 2.99718C3.50315 2.64331 2.83317 2.97601 2.83317 3.5615V13.439C2.83317 14.0246 3.50315 14.3572 3.96961 14.0034L10.4798 9.0646C10.8534 8.78112 10.8534 8.21941 10.4798 7.93594L3.96961 2.99718ZM1.4165 3.5615C1.4165 1.80502 3.42646 0.806938 4.82583 1.86853L11.336 6.8073C12.4569 7.65763 12.4569 9.3429 11.336 10.1933L4.82583 15.132C3.42646 16.1936 1.4165 15.1955 1.4165 13.439V3.5615Z" fill="white"/>
            <path d="M14.1665 2.12533C14.1665 1.73413 14.4836 1.41699 14.8748 1.41699C15.266 1.41699 15.5832 1.73413 15.5832 2.12533V14.8753C15.5832 15.2665 15.266 15.5837 14.8748 15.5837C14.4836 15.5837 14.1665 15.2665 14.1665 14.8753V2.12533Z" fill="white"/>
            </svg>
            
      </div>
      <div class="random">
          <svg  v-if="isRandom" @click="randomSong" width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.0012 16.4856C0.0012 16.9016 0.1452 17.2616 0.4332 17.5656C0.7212 17.8696 1.0812 18.0136 1.5132 17.9976H3.0012C4.0252 17.9976 5.0012 17.7976 5.9292 17.3976C6.8572 16.9976 7.6492 16.4616 8.3052 15.7896C8.9612 15.1176 9.4972 14.3176 9.9132 13.3896C10.3292 12.4616 10.5292 11.4936 10.5132 10.4856C10.5132 9.2536 10.9452 8.1976 11.8092 7.3176C12.6732 6.4376 13.7372 5.9976 15.0012 5.9976H18.0012V7.4856C18.0012 7.8216 18.0972 8.1096 18.2892 8.3496C18.4812 8.5896 18.6972 8.7656 18.9372 8.8776C19.1772 8.9896 19.4572 9.0216 19.7772 8.9736C20.0972 8.9256 20.3612 8.7896 20.5692 8.5656L23.5692 5.5656C23.8732 5.2456 24.0172 4.8856 24.0012 4.4856C23.9852 4.0856 23.8412 3.7336 23.5692 3.4296L20.5692 0.4296C20.3292 0.2056 20.0572 0.0696 19.7532 0.0216C19.4492 -0.0264 19.1692 0.00560002 18.9132 0.1176C18.6572 0.2296 18.4412 0.4056 18.2652 0.6456C18.0892 0.8856 18.0012 1.1656 18.0012 1.4856V2.9976H15.0012C13.9932 2.9976 13.0252 3.1976 12.0972 3.5976C11.1692 3.9976 10.3692 4.5256 9.6972 5.1816C9.0252 5.8376 8.4892 6.6376 8.0892 7.5816C7.6892 8.5256 7.4972 9.4936 7.5132 10.4856C7.5132 11.7336 7.0732 12.7976 6.1932 13.6776C5.3132 14.5576 4.2492 14.9976 3.0012 14.9976H1.5132C1.0972 14.9976 0.7372 15.1416 0.4332 15.4296C0.1292 15.7176 -0.0148 16.0696 0.0012 16.4856ZM0.0012 4.5096C0.0012 4.9256 0.1452 5.2776 0.4332 5.5656C0.7212 5.8536 1.0812 5.9976 1.5132 5.9976H3.0012C3.7052 5.9976 4.3532 6.1496 4.9452 6.4536C5.5372 6.7576 6.0572 7.1736 6.5052 7.7016C6.8412 6.6776 7.3372 5.7576 7.9932 4.9416C6.5372 3.6456 4.8732 2.9976 3.0012 2.9976H1.5132C1.0972 2.9976 0.7372 3.1496 0.4332 3.4536C0.1292 3.7576 -0.0148 4.1096 0.0012 4.5096ZM10.0332 16.0776C11.4572 17.3576 13.1132 17.9976 15.0012 17.9976H18.0012V19.5096C18.0012 19.8296 18.0972 20.1176 18.2892 20.3736C18.4812 20.6296 18.6972 20.8056 18.9372 20.9016C19.1772 20.9976 19.4572 21.0216 19.7772 20.9736C20.0972 20.9256 20.3612 20.7896 20.5692 20.5656L23.5692 17.5656C23.8732 17.2616 24.0172 16.9016 24.0012 16.4856C23.9852 16.0696 23.8412 15.7256 23.5692 15.4536L20.5692 12.4536C20.3292 12.2136 20.0572 12.0696 19.7532 12.0216C19.4492 11.9736 19.1692 12.0056 18.9132 12.1176C18.6572 12.2296 18.4412 12.4136 18.2652 12.6696C18.0892 12.9256 18.0012 13.2056 18.0012 13.5096V14.9976H15.0012C14.3132 14.9976 13.6652 14.8536 13.0572 14.5656C12.4492 14.2776 11.9372 13.8616 11.5212 13.3176C11.1692 14.3416 10.6732 15.2616 10.0332 16.0776Z" fill="white"/>
          </svg>
          <svg v-if="!isRandom" @click="randomSong" width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.2012 16.4856H0.201348L0.201052 16.4779C0.187281 16.1199 0.308277 15.8234 0.570749 15.5748C0.837874 15.3217 1.14875 15.1976 1.5132 15.1976H3.0012C4.30208 15.1976 5.417 14.7366 6.33462 13.819C7.25225 12.9014 7.7132 11.7865 7.71323 10.4856L7.71317 10.4824C7.69764 9.5192 7.88386 8.57882 8.27335 7.65963C8.66396 6.7378 9.18557 5.96054 9.83691 5.32471C10.4901 4.68709 11.2691 4.17231 12.1764 3.78126C13.0794 3.39201 14.0205 3.1976 15.0012 3.1976H18.0012H18.2012V2.9976V1.4856C18.2012 1.20475 18.2776 0.966933 18.4265 0.763873C18.583 0.550377 18.7718 0.397781 18.9934 0.300831C19.2109 0.205673 19.4518 0.176483 19.722 0.219153C19.9829 0.260346 20.2181 0.376244 20.4303 0.573534L23.4238 3.567C23.6631 3.83613 23.7873 4.14272 23.8014 4.49359C23.8149 4.83306 23.6957 5.14128 23.4259 5.42603L20.4278 8.42418L20.4277 8.42408L20.4226 8.42951C20.2474 8.61826 20.0255 8.73411 19.7475 8.77581C19.4577 8.81928 19.2189 8.78837 19.0218 8.69636C18.8138 8.59931 18.6212 8.44449 18.4454 8.22466C18.2844 8.02349 18.2012 7.7807 18.2012 7.4856V5.9976V5.7976H18.0012H15.0012C13.685 5.7976 12.5691 6.25812 11.6665 7.17748C10.7658 8.09484 10.3132 9.20113 10.3132 10.4856L10.3132 10.4888C10.3288 11.4672 10.1348 12.4063 9.7307 13.3078C9.32352 14.2161 8.80034 14.9961 8.16208 15.6499C7.52568 16.3018 6.75589 16.8235 5.85003 17.2139C4.94738 17.603 3.99835 17.7976 3.0012 17.7976H1.5132V17.7975L1.5058 17.7977C1.12913 17.8117 0.825412 17.6888 0.578391 17.4281C0.325324 17.1609 0.2012 16.85 0.2012 16.4856ZM0.2012 4.5096H0.20136L0.20104 4.50161C0.18745 4.16184 0.306822 3.86282 0.574621 3.59502C0.842517 3.32713 1.15219 3.1976 1.5132 3.1976H3.0012C4.76173 3.1976 6.33191 3.78519 7.71847 4.96747C7.17333 5.67665 6.743 6.46 6.42742 7.3167C6.01732 6.88859 5.55361 6.5412 5.03656 6.27569C4.41466 5.95633 3.73508 5.7976 3.0012 5.7976H1.5132C1.13067 5.7976 0.822662 5.67222 0.574621 5.42418C0.325018 5.17457 0.2012 4.87383 0.2012 4.5096ZM18.2012 17.9976V17.7976H18.0012H15.0012C13.2243 17.7976 11.6618 17.2169 10.3058 16.051C10.8365 15.3451 11.2645 14.566 11.59 13.7144C11.9804 14.1507 12.4412 14.4951 12.9716 14.7463C13.607 15.0473 14.2843 15.1976 15.0012 15.1976H18.0012H18.2012V14.9976V13.5096C18.2012 13.247 18.2764 13.0063 18.43 12.7829C18.5873 12.5541 18.7753 12.3962 18.9934 12.3008C19.2109 12.2057 19.4518 12.1765 19.722 12.2192C19.98 12.2599 20.2144 12.3817 20.4278 12.595L23.4278 15.595C23.6611 15.8283 23.7871 16.1231 23.8013 16.4933C23.8151 16.8516 23.6938 17.1581 23.4278 17.4242L20.4278 20.4242L20.4277 20.4241L20.4226 20.4295C20.2474 20.6183 20.0255 20.7341 19.7475 20.7758C19.4539 20.8199 19.2112 20.7958 19.0115 20.7159C18.8128 20.6364 18.6244 20.4872 18.4492 20.2536C18.2832 20.0322 18.2012 19.7863 18.2012 19.5096V17.9976Z" stroke="white" stroke-width="0.4"/>
          </svg>

        </div>
        </div>

        
        </div>
        
    </div>
    
    <div class="navigation">
      <router-link to="/"><svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.77149 32.8009L2.77148 32.8009C1.87916 31.9086 1.40495 30.726 1.16222 28.9207C0.917566 27.1009 0.916504 24.7246 0.916504 21.4893V9.44508C0.916504 7.91468 0.918689 7.21876 1.02631 6.64838L0.534977 6.55567L1.02631 6.64838C1.50968 4.08642 3.51366 2.08244 6.07562 1.59906L5.98292 1.10773L6.07562 1.59906C6.64601 1.49144 7.34193 1.48926 8.87233 1.48926C9.54218 1.48926 9.84525 1.48976 10.134 1.51678L10.134 1.51678C11.4024 1.63538 12.6056 2.13374 13.5863 2.94673C13.8096 3.13184 14.0242 3.34579 14.4978 3.81945L14.4979 3.81948L15.438 4.75948L15.438 4.75949L15.5003 4.82186C16.8346 6.15621 17.5775 6.89913 18.4732 7.39753L18.7163 6.96062L18.4732 7.39754C18.9652 7.67124 19.4871 7.88737 20.0284 8.04168C21.0142 8.3227 22.0648 8.32266 23.9518 8.32259L24.04 8.32259H24.6784C26.94 8.32259 28.5893 8.32352 29.8578 8.483C31.1138 8.64091 31.9266 8.94728 32.5511 9.50885C32.6724 9.61797 32.7878 9.73338 32.8967 9.85455L32.8969 9.85475C33.4584 10.4791 33.7648 11.2919 33.9228 12.5479C34.0822 13.8164 34.0832 15.4658 34.0832 17.7273V21.4893C34.0832 24.7246 34.0821 27.1009 33.8374 28.9207C33.5947 30.726 33.1205 31.9086 32.2281 32.8009L32.2281 32.8009C31.3358 33.6932 30.1533 34.1675 28.3479 34.4102C26.5281 34.6549 24.1519 34.6559 20.9165 34.6559H14.0832C10.8478 34.6559 8.47152 34.6549 6.65177 34.4102C4.84641 34.1675 3.66383 33.6932 2.77149 32.8009ZM19.2811 18.0726C19.2811 17.0889 18.4836 16.2913 17.4998 16.2913C16.5161 16.2913 15.7186 17.0889 15.7186 18.0726V19.708H14.0832C13.0994 19.708 12.3019 20.5055 12.3019 21.4893C12.3019 22.473 13.0994 23.2705 14.0832 23.2705H15.7186V24.9059C15.7186 25.8897 16.5161 26.6872 17.4998 26.6872C18.4836 26.6872 19.2811 25.8897 19.2811 24.9059V23.2705H20.9165C21.9002 23.2705 22.6978 22.473 22.6978 21.4893C22.6978 20.5055 21.9002 19.708 20.9165 19.708H19.2811V18.0726Z" stroke="white"/>
      </svg>
      
    </router-link>
    <div class="active">
      <svg width="37" height="37" viewBox="0 0 33 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.6542 0.488491C18.3836 0.223647 16.2291 1.55516 15.4506 3.70437C15.2752 4.18873 15.2136 4.7124 15.1848 5.26131C15.1631 5.67542 15.1577 6.16904 15.1566 6.7504L15.1561 7.56559C15.1561 7.57421 15.1561 7.58281 15.1561 7.59137V22.0439C13.6337 20.615 11.5857 19.74 9.33317 19.74C4.633 19.74 0.822754 23.5501 0.822754 28.2504C0.822754 32.9507 4.633 36.7608 9.33317 36.7608C14.0334 36.7608 17.8436 32.9507 17.8436 28.2504V12.5027C18.0314 12.6028 18.2347 12.7044 18.4576 12.8157L23.3085 15.2411C24.058 15.6157 24.6679 15.9207 25.1676 16.1386C25.6714 16.3582 26.1673 16.5374 26.679 16.597C28.9494 16.8619 31.1039 15.5303 31.8824 13.3812C32.0579 12.8968 32.1194 12.3731 32.1484 11.8242C32.1769 11.2798 32.1769 10.598 32.1769 9.76019L32.1771 9.61178C32.1773 8.98873 32.1775 8.50133 32.0891 8.03943C31.8616 6.85047 31.2042 5.7869 30.2426 5.05163C29.8689 4.76599 29.433 4.54823 28.8756 4.26984L24.0247 1.84444C23.2752 1.46971 22.6653 1.16477 22.1656 0.946942C21.6618 0.727284 21.1659 0.548171 20.6542 0.488491Z" fill="#E52535"/>
      </svg>
    </div>
      

    <router-link to="/library">
      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1192 3.58302H13.1193H23.8803L23.8805 3.58302C24.247 3.58292 24.4944 3.58338 24.705 3.60398C25.9303 3.72385 26.9615 4.33258 27.5914 5.18346H9.40832C10.0382 4.33258 11.0693 3.72385 12.2946 3.60398C12.5052 3.58338 12.7527 3.58292 13.1192 3.58302Z" stroke="white"/>
      <path d="M31.168 9.66672C31.3889 9.71023 31.6088 9.75981 31.827 9.81653C31.9031 9.97116 31.9693 10.1303 32.025 10.2933C32.0373 10.3291 32.0491 10.3651 32.0602 10.4013L31.168 9.66672ZM31.168 9.66672C30.4541 8.56246 29.1241 7.78125 27.5366 7.78125H9.72868C8.14115 7.78125 6.81119 8.56246 6.09729 9.66673C6.41063 9.60501 6.7259 9.5555 7.04081 9.51514L31.168 9.66672ZM31.168 9.66672C30.8546 9.60501 30.5394 9.5555 30.2246 9.51514C28.5271 9.29752 26.3961 9.29765 23.9752 9.29779L23.9453 9.29779H13.5026H13.32H13.32L31.168 9.66672ZM5.24024 10.2933C5.22802 10.3291 5.21629 10.3651 5.20508 10.4013C5.26803 10.3822 5.33125 10.3638 5.39471 10.3461L5.24024 10.2933ZM5.24024 10.2933C5.29592 10.1303 5.36214 9.97116 5.43824 9.81653L5.24024 10.2933Z" stroke="white"/>
      <path d="M32.1787 26.1065L32.6735 26.1788L32.1787 26.1065C31.9071 27.9638 31.7096 29.306 31.4138 30.3248C31.1231 31.3258 30.7528 31.9563 30.1697 32.4217C29.5812 32.8913 28.8308 33.149 27.6837 33.2816C26.5262 33.4155 25.0301 33.4163 22.9781 33.4163H14.0222C11.9702 33.4163 10.4741 33.4155 9.31662 33.2816C8.16957 33.149 7.41921 32.8913 6.83074 32.4217C6.24756 31.9563 5.87723 31.3258 5.58653 30.3248C5.29068 29.306 5.09323 27.9638 4.82156 26.1065L4.32682 26.1788L4.82155 26.1065L4.16948 21.6487C3.82326 19.2818 3.57343 17.5641 3.5838 16.2463C3.59403 14.9483 3.8575 14.1273 4.46518 13.4947C5.08084 12.8537 5.9624 12.4971 7.39783 12.3131C8.84193 12.1279 10.7549 12.127 13.3701 12.127H23.6302C26.2454 12.127 28.1584 12.1279 29.6025 12.3131C31.0379 12.4971 31.9195 12.8537 32.5352 13.4947C33.1428 14.1273 33.4063 14.9483 33.4165 16.2463C33.4269 17.5641 33.1771 19.2818 32.8309 21.6487L32.1787 26.1065ZM13.6182 26.0935C12.6834 26.0935 11.8335 26.7868 11.8335 27.7498C11.8335 28.7129 12.6834 29.4062 13.6182 29.4062H23.3822C24.317 29.4062 25.1668 28.7128 25.1668 27.7498C25.1668 26.7869 24.3169 26.0935 23.3822 26.0935H13.6182Z" stroke="white"/>
      </svg>
  </router-link>


    </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');

main{
  background-color: #E52535;
  margin: 0; height: 100%; overflow: hidden
}

h2{
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 600;
 
  
}
h3{
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 300;

  margin-bottom: 25px;
}

.isRandom{
  opacity: 10%;
}

.logo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 7vh;
  position: absolute;
}

.single img{
  margin-top: -3vh;
  width: 100vw;
  height: 100vw;
  border-radius: 0px 0px 60px 60px;
  -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
  mask-image: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0));

}
 
.single{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;

}

.music{
  padding-top: 5vh;
  display: flex;
  flex-direction: column ;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 2vh;
  width: 100%;

}
.navigation{
  display: flex;
  justify-content: center ;
  align-items: center;
  padding-top: 3vh;
  gap: 20vw;
  padding-bottom: 1vh;
}
.active{
  padding: 20px;
  background-color: white;
  fill: white;
  border-radius: 200px;
}




.ctrl{
  display: flex;
  align-items: center;
  gap: 60px;
  height: 100%;
  width: 100%;
}
.ctrl svg{
  height: 40px;

}
.ctrl2{
  display: flex;
  align-items: center;
  gap: 15px;
}

.musicSet{
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
 
  height: 100%;
}
.random{
 justify-content: end;
 display: flex;

}
#blank{
  width: 24px;
  height: 40px;
}
p{
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 500;
}
.data{
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}
</style>