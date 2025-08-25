let URLContainer = document.querySelector(".url-container");
let videoURL = document.querySelector(".video-url");
let getURLBtn = document.querySelector(".get-url-btn");

let videoContainer = document.querySelector(".video-container");
let videoContainerLoading = document.querySelector(".video-container-loading");
let video = document.querySelector("video");
let controls = document.querySelector(".controls");
let settingsContainer = document.querySelector(".settings-container");

let timeLine = document.querySelector(".time-line");
let currentTime = document.querySelector(".current-time");
let totalTime = document.querySelector(".total-time");
let forward = document.querySelector(".forward");
let backward = document.querySelector(".backward");

let settingsBtn = document.querySelector(".settings");
let closeSettingsBtn = document.querySelector(".close-settings");
let playPauseBig = document.querySelector(".play-pause.big");
let playPauseSmall = document.querySelector(".play-pause.small");
let muteBtn = document.querySelector(".mute");
let playbackRateBtn = document.querySelector(".playback-rate");
let playbackRateContainer = document.querySelector(".playback-rate-container");

let lockScreenBtn = document.querySelector(".lock-screen");
let unlockScreenBtn = document.querySelector(".unlock-screen");
let fullscreenBtn = document.querySelector(".fullscreen");

const app = {
    screenState : {
        fullscreen: false,
        locked: false,
        active: true,
        portrait: true,
        landscape: false,
    },
    ui: {
        svg: {
            resume: `<svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#2e3436" d="m 2 2.5 v 11 c 0 1.5 1.269531 1.492188 1.269531 1.492188 h 0.128907 c 0.246093 0.003906 0.488281 -0.050782 0.699218 -0.171876 l 9.796875 -5.597656 c 0.433594 -0.242187 0.65625 -0.734375 0.65625 -1.226562 c 0 -0.492188 -0.222656 -0.984375 -0.65625 -1.222656 l -9.796875 -5.597657 c -0.210937 -0.121093 -0.453125 -0.175781 -0.699218 -0.175781 h -0.128907 s -1.269531 0 -1.269531 1.5 z m 0 0"/></svg>`,
            pause: `<svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#2e3436" d="m 3 1 h 3 c 0.550781 0 1 0.449219 1 1 v 12 c 0 0.550781 -0.449219 1 -1 1 h -3 c -0.550781 0 -1 -0.449219 -1 -1 v -12 c 0 -0.550781 0.449219 -1 1 -1 z m 0 0"/><path fill="#2e3436" d="m 10 1 h 3 c 0.550781 0 1 0.449219 1 1 v 12 c 0 0.550781 -0.449219 1 -1 1 h -3 c -0.550781 0 -1 -0.449219 -1 -1 v -12 c 0 -0.550781 0.449219 -1 1 -1 z m 0 0"/></svg>`,
            reload: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#0F1729" fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 1.29289C10.6834 0.902369 11.3166 0.902369 11.7071 1.29289L14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5C15 5.26522 14.8946 5.51957 14.7071 5.70711L11.7071 8.70711C11.3166 9.09763 10.6834 9.09763 10.2929 8.70711C9.90237 8.31658 9.90237 7.68342 10.2929 7.29289L11.573 6.01281C7.90584 6.23349 5 9.2774 5 13C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.16524 6.81226 4.22089 11.5947 4.00896L10.2929 2.70711C9.90237 2.31658 9.90237 1.68342 10.2929 1.29289Z"/></svg>`,
            fullscreenOpen: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#434343" stroke="none" stroke-width="1" d="M5.075,6.95 L6.918,5.088 L3.938,2.062 L5.955,0.018 L0.052,0.018 L0.052,6.004 L2.098,3.928 L5.075,6.95 Z"></path><path fill="#434343" stroke="none" stroke-width="1" d="M16.0034788,9.916 L13.832,12.013 L10.799,8.96 L8.918,10.841 L11.957,13.897 L9.961,15.9813842 L16.0034788,15.9813842 L16.0034788,9.916 Z"></path></svg>`,
            fullscreenClose: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#434343" stroke="none" stroke-width="1" d="M15.995,1.852 L14.133,0.00800000003 L11.107,2.988 L9.062,0.972 L9.062,6.875 L15.049,6.875 L12.973,4.828 L15.995,1.852 Z"></path><path fill="#434343" stroke="none" stroke-width="1" d="M0.961,9.008 L3.058,11.095 L0.005,14.128 L1.885,16.008 L4.942,12.97 L6.909,14.966 L6.909,9.008 L0.961,9.008 Z"></path></svg>`,
            settings: `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.526,18.036L27,17.732c-0.626-0.361-1-1.009-1-1.732s0.374-1.371,1-1.732l0.526-0.304  c1.436-0.83,1.927-2.662,1.098-4.098l-1-1.732c-0.827-1.433-2.666-1.925-4.098-1.098L23,7.339c-0.626,0.362-1.375,0.362-2,0  c-0.626-0.362-1-1.009-1-1.732V5c0-1.654-1.346-3-3-3h-2c-1.654,0-3,1.346-3,3v0.608c0,0.723-0.374,1.37-1,1.732  c-0.626,0.361-1.374,0.362-2,0L8.474,7.036C7.042,6.209,5.203,6.701,4.375,8.134l-1,1.732c-0.829,1.436-0.338,3.269,1.098,4.098  L5,14.268C5.626,14.629,6,15.277,6,16s-0.374,1.371-1,1.732l-0.526,0.304c-1.436,0.829-1.927,2.662-1.098,4.098l1,1.732  c0.828,1.433,2.667,1.925,4.098,1.098L9,24.661c0.626-0.363,1.374-0.361,2,0c0.626,0.362,1,1.009,1,1.732V27c0,1.654,1.346,3,3,3h2  c1.654,0,3-1.346,3-3v-0.608c0-0.723,0.374-1.37,1-1.732c0.625-0.361,1.374-0.362,2,0l0.526,0.304  c1.432,0.826,3.271,0.334,4.098-1.098l1-1.732C29.453,20.698,28.962,18.865,27.526,18.036z M16,21c-2.757,0-5-2.243-5-5s2.243-5,5-5  s5,2.243,5,5S18.757,21,16,21z"/></svg>`,
            close: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"/></svg>`,
            locked: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#1C274C" fill-rule="evenodd" clip-rule="evenodd" d="M5.25 9.30277V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V9.30277C18.9768 9.31872 19.1906 9.33948 19.3918 9.36652C20.2919 9.48754 21.0497 9.74643 21.6517 10.3483C22.2536 10.9503 22.5125 11.7081 22.6335 12.6082C22.75 13.4752 22.75 14.5775 22.75 15.9451V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6516C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6516C1.74643 21.0497 1.48754 20.2919 1.36652 19.3918C1.24996 18.5248 1.24998 17.4225 1.25 16.0549V15.9451C1.24998 14.5775 1.24996 13.4752 1.36652 12.6082C1.48754 11.7081 1.74643 10.9503 2.34835 10.3483C2.95027 9.74643 3.70814 9.48754 4.60825 9.36652C4.80938 9.33948 5.02317 9.31872 5.25 9.30277ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V9.25344C16.8765 9.24999 16.4784 9.24999 16.0549 9.25H7.94513C7.52161 9.24999 7.12353 9.24999 6.75 9.25344V8ZM3.40901 11.409C3.68577 11.1322 4.07435 10.9518 4.80812 10.8531C5.56347 10.7516 6.56459 10.75 8 10.75H16C17.4354 10.75 18.4365 10.7516 19.1919 10.8531C19.9257 10.9518 20.3142 11.1322 20.591 11.409C20.8678 11.6858 21.0482 12.0743 21.1469 12.8081C21.2484 13.5635 21.25 14.5646 21.25 16C21.25 17.4354 21.2484 18.4365 21.1469 19.1919C21.0482 19.9257 20.8678 20.3142 20.591 20.591C20.3142 20.8678 19.9257 21.0482 19.1919 21.1469C18.4365 21.2484 17.4354 21.25 16 21.25H8C6.56459 21.25 5.56347 21.2484 4.80812 21.1469C4.07435 21.0482 3.68577 20.8678 3.40901 20.591C3.13225 20.3142 2.9518 19.9257 2.85315 19.1919C2.75159 18.4365 2.75 17.4354 2.75 16C2.75 14.5646 2.75159 13.5635 2.85315 12.8081C2.9518 12.0743 3.13225 11.6858 3.40901 11.409Z"/></svg>`,
            unlocked: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#1C274C" fill-rule="evenodd" clip-rule="evenodd" d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V9.30277C5.02317 9.31872 4.80938 9.33948 4.60825 9.36652C3.70814 9.48754 2.95027 9.74643 2.34835 10.3483C1.74643 10.9503 1.48754 11.7081 1.36652 12.6082C1.24996 13.4752 1.24998 14.5775 1.25 15.9451V16.0549C1.24998 17.4225 1.24996 18.5248 1.36652 19.3918C1.48754 20.2919 1.74643 21.0497 2.34835 21.6516C2.95027 22.2536 3.70814 22.5125 4.60825 22.6335C5.47522 22.75 6.57754 22.75 7.94513 22.75H16.0549C17.4225 22.75 18.5248 22.75 19.3918 22.6335C20.2919 22.5125 21.0497 22.2536 21.6517 21.6516C22.2536 21.0497 22.5125 20.2919 22.6335 19.3918C22.75 18.5248 22.75 17.4225 22.75 16.0549V15.9451C22.75 14.5775 22.75 13.4752 22.6335 12.6082C22.5125 11.7081 22.2536 10.9503 21.6517 10.3483C21.0497 9.74643 20.2919 9.48754 19.3918 9.36652C18.5248 9.24996 17.4225 9.24998 16.0549 9.25H7.94513C7.52161 9.24999 7.12353 9.24999 6.75 9.25344V8ZM3.40901 11.409C3.68577 11.1322 4.07435 10.9518 4.80812 10.8531C5.56347 10.7516 6.56459 10.75 8 10.75H16C17.4354 10.75 18.4365 10.7516 19.1919 10.8531C19.9257 10.9518 20.3142 11.1322 20.591 11.409C20.8678 11.6858 21.0482 12.0743 21.1469 12.8081C21.2484 13.5635 21.25 14.5646 21.25 16C21.25 17.4354 21.2484 18.4365 21.1469 19.1919C21.0482 19.9257 20.8678 20.3142 20.591 20.591C20.3142 20.8678 19.9257 21.0482 19.1919 21.1469C18.4365 21.2484 17.4354 21.25 16 21.25H8C6.56459 21.25 5.56347 21.2484 4.80812 21.1469C4.07435 21.0482 3.68577 20.8678 3.40901 20.591C3.13225 20.3142 2.9518 19.9257 2.85315 19.1919C2.75159 18.4365 2.75 17.4354 2.75 16C2.75 14.5646 2.75159 13.5635 2.85315 12.8081C2.9518 12.0743 3.13225 11.6858 3.40901 11.409Z"/></svg>`,
            soundMax: `<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M18.36,19.36a1,1,0,0,1-.7-.29,1,1,0,0,1,0-1.41,8,8,0,0,0,0-11.32,1,1,0,0,1,1.41-1.41,10,10,0,0,1,0,14.14A1,1,0,0,1,18.36,19.36Z"></path><path fill="#000000" d="M15.54,16.54a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41,4,4,0,0,0,0-5.66,1,1,0,0,1,1.41-1.41,6,6,0,0,1,0,8.48A1,1,0,0,1,15.54,16.54Z"></path><path fill="#000000" d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z"></path></svg>`,
            soundMute: `<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z"></path><path fill="#000000" d="M16,15.5a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l5-5a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,16,15.5Z"></path><path fill="#000000" d="M21,15.5a1,1,0,0,1-.71-.29l-5-5a1,1,0,0,1,1.42-1.42l5,5a1,1,0,0,1,0,1.42A1,1,0,0,1,21,15.5Z"></path></svg>`,
            speed: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00346 10.4003 4.60896 8.93853C5.21446 7.47672 6.23984 6.22729 7.55544 5.34824C8.87103 4.46919 10.4177 4 12 4C13.5823 4 15.129 4.46919 16.4446 5.34824C17.7602 6.22729 18.7855 7.47672 19.391 8.93853C19.9965 10.4003 20.155 12.0089 19.8463 13.5607C19.5376 15.1126 18.7757 16.538 17.6569 17.6569"/><path stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 12L16 10"/></svg>`,
        }
    },
}

console.log(video);
let isSettingsHidden = true;
let timingInterval;
let autoHideControlsInterval;

// For Test Only //
let source_1 = "./videos/THE OLD KNIGHT/THE OLD KNIGHT_720P.mp4";
let source_2 = "./videos/The Bread/The Bread_720P.mp4";
let source_3 = "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4";
//////////////////











function initVideo() {
    // Display Video Container
    videoContainer.style.display = "flex";
    // Play, Pause, Reload
    playPauseBig.addEventListener("click", playPause);
    playPauseSmall.addEventListener("click", playPause);
    video.addEventListener("ended", videoEnded);
    // Controls
    muteBtn.addEventListener("click", mute);
    // Time Line
    totalTime.textContent = timeFormater(video.duration);
    document.querySelectorAll(".playback-rate-container button").forEach((e)=>{
        e.addEventListener("click", changePlaybackRate);
    });
    timeLine.addEventListener("input", changeTimeLine);
    // Forward
    forward.addEventListener("dblclick", ()=>{
        video.currentTime = Math.min(video.currentTime + 10, video.duration); // time must be equal OR less than total time.
        updateVideoTimeLine();
    });
    // Backward
    backward.addEventListener("dblclick", ()=>{
        video.currentTime = Math.max(video.currentTime - 10, 0); // time must be equal to OR big than 0.
        updateVideoTimeLine();
    });
    // Settings
    settingsBtn.addEventListener("click", show_or_hide_settings);
    closeSettingsBtn.addEventListener("click", show_or_hide_settings);
    // Hide Controls
    video.addEventListener("click", hideControls);
    autoHideControlsInterval = setInterval(autoHideControls, 3000);
    videoContainer.addEventListener("click", ()=>{
        // Rest Check Timer For Auto Hide
        if (autoHideControlsInterval !== undefined) { clearInterval(autoHideControlsInterval); }
        autoHideControlsInterval = setInterval(autoHideControls, 3000);
    });
    // Lock, Unlock Controls
    lockScreenBtn.addEventListener("click", lockScreen)
    unlockScreenBtn.addEventListener("click", unlockScreen);
    // Fullscreen
    fullscreenBtn.addEventListener("click", fullscreen);
    
}






function updatePlayPauseUI(videoState = "play") {
    videoState = videoState.toLowerCase();
    if (videoState == "play") {
        playPauseBig.innerHTML = app.ui.svg.resume;
        playPauseSmall.innerHTML = app.ui.svg.resume;
    }
    else if (videoState == "pause") {
        playPauseBig.innerHTML = app.ui.svg.pause;
        playPauseSmall.innerHTML = app.ui.svg.pause;
    }
    else if (videoState == "reload") {
        playPauseBig.innerHTML = app.ui.svg.reload;
        playPauseSmall.innerHTML = app.ui.svg.reload;
    }
}

function playPause() {
    if (video.paused) {
        video.play();
        updatePlayPauseUI("pause");
        timingInterval = setInterval(updateVideoTimeLine, 500);
    }
    else {
        video.pause();
        updatePlayPauseUI("play");
        if (timingInterval != undefined) {
            clearInterval(timingInterval);
        }
    }
}

function videoEnded() {
    updatePlayPauseUI("reload");
    if (timingInterval != undefined) { clearInterval(timingInterval); }
    app.screenState.active = false;
    hideControls();
}


function mute() {
    if (video.muted) {
        video.muted = false;
        video.volume = 1;
        muteBtn.innerHTML = app.ui.svg.soundMax;
    }
    else {
        video.muted = true;
        video.volume = 0;
        muteBtn.innerHTML = app.ui.svg.soundMute;
    }
}


function changePlaybackRate(e) {
    document.querySelectorAll(".playbackElement").forEach((playbackElement)=>{
        playbackElement.classList.remove("selected");
    });
    e.target.classList.add("selected");
    video.playbackRate = e.target.value;
    setTimeout(()=>{
        playbackRateContainer.style.display = "none";
    }, 250);
}
// Display Playback Select Box.
playbackRateBtn.addEventListener("click", function() {
    playbackRateContainer.style.display = "flex";
});



function updateVideoTimeLine() {
    currentTime.textContent = timeFormater(video.currentTime);
    timeLine.value = (video.currentTime / video.duration) * 100;
    timeLine.style.setProperty("--range-value", timeLine.value + "%");
}

function changeTimeLine() {
    video.currentTime = (timeLine.value / 100) * video.duration;
    currentTime.textContent = timeFormater(video.currentTime);
    timeLine.style.setProperty("--range-value", timeLine.value + "%");
    // Rest Check Timer For Auto Hide
    if (autoHideControlsInterval !== undefined) {
        clearInterval(autoHideControlsInterval);
    }
    autoHideControlsInterval = setInterval(autoHideControls, 3000);
}


function timeFormater(tiemInSeconds) {
    tiemInSeconds = tiemInSeconds || 0;
    if (isNaN(parseInt(tiemInSeconds))) return;
    
    let maxTime = video.duration;
    let result = "00:00:00";
    
    let hours = Math.floor(tiemInSeconds / 3600); // 1 hour = 3600 second.
    let minutes = Math.floor((tiemInSeconds % 3600) / 60); // (time remains from hour in seconds divided by 60 to convert it to minutes).
    let seconds = Math.floor(tiemInSeconds % 60); // Example: (65 % 60) =>  division result is 1 (minutes) and remains 5 (seconds).
    
    let hh = String(hours);
    let ss = String(seconds).padStart(2, "0"); // 1 => 01
    let mm = String(minutes).padStart(2, "0"); // 1 => 01
    
    if (maxTime / 3600 >= 1) { // hours >= 1
        result = `${hh}:${mm}:${ss}`;
    }
    else if (((maxTime % 3600) / 60) >= 1) { // (hours < 1) && (minutes >= 1)
        result = `${mm}:${ss}`;
    }
    else { // time is only seconds
        result = `${ss}`;
    }
    return result;
}


function show_or_hide_settings() {
    if(isSettingsHidden) {
        isSettingsHidden = false;
        settingsContainer.style.display = "flex";
    }
    else {
        isSettingsHidden = true;
        settingsContainer.style.display = "none";
    }
}



// Click To Hide
function hideControls() {
    setTimeout(()=>{
        // Hide (screen is locked)
        if (app.screenState.active && app.screenState.locked) {
            app.screenState.active = false;
            unlockScreenBtn.style.display = "none";
        }
        // Show (screen is locked)
        else if (!app.screenState.active && app.screenState.locked) {
            app.screenState.active = true;
            unlockScreenBtn.style.display = "flex";
        }
        // Hide
        else if (app.screenState.active && !app.screenState.locked) {
            app.screenState.active = false;
            controls.style.display = "none";
            playPauseBig.style.display = "none";
            forward.style.display = "none";
            backward.style.display = "none";
            settingsContainer.style.display = "none";
        }
        // Show
        else {
            app.screenState.active = true;
            controls.style.display = "flex";
            playPauseBig.style.display = "flex";
            forward.style.display = "flex";
            backward.style.display = "flex";
            if (!isSettingsHidden) { settingsContainer.style.display = "flex"; }
        }
    }, 50);
}


// Auto Hide
function autoHideControls() {
    if (video.paused) return;
    if (app.screenState.active) {
        hideControls();
    }
}






function lockScreen() {
    if (!app.screenState.locked) {
        app.screenState.locked = true;
        unlockScreenBtn.style.display = "flex";
        controls.style.display = "none";
        settingsContainer.style.display = "none";
        playPauseBig.style.display = "none";
        forward.style.display = "none";
        backward.style.display = "none";
    }
}


function unlockScreen() {
    if (app.screenState.locked) {
        app.screenState.locked = false;
        isSettingsHidden = false;
        show_or_hide_settings();
        unlockScreenBtn.style.display = "none";
        controls.style.display = "flex";
        playPauseBig.style.display = "flex";
        forward.style.display = "flex";
        backward.style.display = "flex";
    }
}




function fullscreen() {
    // the api property (document.fullscreenElement) will return (html element which act fullscreen) or (null)
    if (document.fullscreenElement) {
        app.screenState.fullscreen = false;
        fullscreenBtn.innerHTML = app.ui.svg.fullscreenOpen;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }else {
        app.screenState.fullscreen = true;
        fullscreenBtn.innerHTML = app.ui.svg.fullscreenClose;
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /* IE11 */
            videoContainer.msRequestFullscreen();
        }
    }
    changeScreenOrientation();
}



function changeScreenOrientation() {
    // landscape Mode
    if (app.screenState.fullscreen) {
        app.screenState.landscape = true;
        app.screenState.portrait = false;
        // code for (rotate elements).
        screen.orientation.lock("landscape")
        .then(()=>{ console.log("Screen locked to landscape"); })
        .catch((err)=>{ console.error("Lock failed:",err); });
    }
    // portrait Mode.
    else {
        app.screenState.landscape = false;
        app.screenState.portrait = true;
        // code for (normal direction).
        screen.orientation.unlock();
        console.log("Screen unlocked (act system orientation)");
    }
}





// Change Video Source
function ChangeVideoURL() {
    if (!videoURL.value) return; // stop function if there's no entries.
    URLContainer.classList.add("animation-loading-url")
    videoContainerLoading.textContent = "";
    videoContainer.style.display = "none";
    videoContainerLoading.style.display = "flex";
    video.src = videoURL.value; // Change Video Source.
    video.load(); // reset video element.
    updatePlayPauseUI("play"); // Display (Play) Button As Initial Control.
    let checkVideoStateTimeout = setTimeout(function() {
        showMessage("Error Occurs Video Not Loaded!");
        restVideoElement();
    }, 5000);
    // If Video Have An Error Stop Function:
    video.onerror = ()=>{
        console.log("video.error:", video.error);
        clearTimeout(checkVideoStateTimeout);
        showMessage("Error Occurs Video Not Loaded!");
        restVideoElement();
    }
    // If Video Loaded:
    video.onloadedmetadata = ()=>{
        clearTimeout(checkVideoStateTimeout);
        setTimeout(()=>{
            // If Video Loaded And Work Successfully:
            if (!isNaN(video.duration) && video.duration !== Infinity) {
                URLContainer.classList.remove("animation-loading-url");
                videoContainerLoading.style.display = "none";
                // Reset Timeline & Controls
                initVideo();
                app.screenState.active = false;
                hideControls();
                timeLine.value = 0;
                timeLine.style.setProperty("--range-value", timeLine.value + "%");
                updateVideoTimeLine();
                // showMessage("Video Loaded Successfully!");
            }
            // If Video Loaded But Don't Work:
            else {
                showMessage("Video Not Found!");
                restVideoElement();
            }
        }, 1000);
    }
    function restVideoElement() {
        URLContainer.classList.remove("animation-loading-url");
        videoContainer.style.display = "none";
        timeLine.value = 0;
        timeLine.style.setProperty("--range-value", timeLine.value + "%");
        currentTime.textContent = "00:00";
        totalTime.textContent = "00:00";
        video.removeAttribute("src"); // clear src.
        video.load();
    }
}
getURLBtn?.addEventListener("click", ChangeVideoURL);
// For Test only
// videoURL.value = "./videos/THE OLD KNIGHT/THE OLD KNIGHT_720P.mp4";





function showMessage(msg) {
    URLContainer.classList.remove("animation-loading-url");
    videoContainer.style.display = "none";
    videoContainerLoading.textContent = msg;
    console.log(msg);
    // Show Element With HTML, CSS, JS
}

