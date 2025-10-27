// A simple function to format seconds into MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Global audio object
const audio = new Audio();
let isPlaying = false;

// DOM Elements
const megaLinkInput = document.getElementById('megaLinkInput');
const loadButton = document.getElementById('loadButton');
const playPauseButton = document.getElementById('playPauseButton');
const playPauseIcon = playPauseButton.querySelector('i');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const progressBar = document.getElementById('progressBar');
const progressBarContainer = document.getElementById('progressBarContainer');

// --- Event Listeners ---

// 1. Load Track Button
loadButton.addEventListener('click', () => {
    const megaLink = megaLinkInput.value.trim();

    if (megaLink) {
        // --- THIS IS THE KEY SIMPLIFICATION POINT ---
        // In a real app, you would run a complex function here:
        // const streamableURL = decodeMegaLink(megaLink);
        //
        // For demonstration, we'll use a placeholder URL and fake metadata.
        // REPLACE THIS WITH A REAL DIRECT AUDIO LINK (e.g., a Dropbox or public server link)
        const PLACEHOLDER_URL = "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav"; 
        
        // Assume the function works and sets the audio source
        audio.src = PLACEHOLDER_URL;
        trackTitle.textContent = "Awesome MEGA Track"; // Replace with actual track name
        trackArtist.textContent = "MEGA Uploader"; // Replace with actual artist
        
        playPauseButton.disabled = false;
        playPauseButton.classList.remove('disabled');

        // Reset and prepare for playback
        audio.pause();
        isPlaying = false;
        playPauseIcon.className = 'fas fa-play';
        currentTimeDisplay.textContent = '0:00';
        durationDisplay.textContent = '0:00';
        progressBar.style.width = '0%';
        audio.load(); // Start loading the file metadata
    } else {
        alert("Please paste a MEGA link.");
    }
});

// 2. Play/Pause Button
playPauseButton.addEventListener('click', () => {
    if (audio.src) { // Only run if a track is loaded
        if (isPlaying) {
            audio.pause();
            playPauseIcon.className = 'fas fa-play';
        } else {
            audio.play();
            playPauseIcon.className = 'fas fa-pause';
        }
        isPlaying = !isPlaying;
    }
});

// 3. Audio Events (Updating the Player)

// When the audio metadata is loaded (we know the duration)
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// While the audio is playing (update current time and progress bar)
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    if (!isNaN(duration)) {
        // Update time display
        currentTimeDisplay.textContent = formatTime(currentTime);
        
        // Update progress bar
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});

// When the song ends
audio.addEventListener('ended', () => {
    isPlaying = false;
    playPauseIcon.className = 'fas fa-play';
    // For a real Spotify clone, you would load the next track here
});

// 4. Seek functionality (Clicking on the progress bar)
progressBarContainer.addEventListener('click', (e) => {
    if (!isNaN(audio.duration) && audio.src) {
        // Calculate the click position relative to the container width
        const clickX = e.offsetX;
        const totalWidth = progressBarContainer.clientWidth;
        const seekTime = (clickX / totalWidth) * audio.duration;
        
        // Set the new time
        audio.currentTime = seekTime;
    }
});
