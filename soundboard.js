// --- Audio Setup with HTML5 Audio ---
let audioInitialized = false;
const startPrompt = document.getElementById('start-prompt');

// Map button data-sound to file names
const soundFiles = {
    'among_us_trap': 'sounds/among_us_trap_remix_bass_boosted_leonz_8455886905626474145-mp3cut.mp3',
    'role_reveal': 'sounds/among-us-role-reveal-sound.mp3',
    'discord': 'sounds/discord-notification.mp3',
    'movie_1': 'sounds/movie_1.mp3',
    'vine_boom': 'sounds/vine-boom.mp3',
    'rizz': 'sounds/rizz-sound-effect.mp3',
    'applepay': 'sounds/applepay.mp3',
    'spongebob_fail': 'sounds/spongebob-fail.mp3',
    'anime_wow': 'sounds/anime-wow-sound-effect.mp3',
    'roblox_death': 'sounds/roblox-death-sound_1.mp3',
    'hub_intro': 'sounds/hub-intro-sound.mp3',
    'metal_pipe': 'sounds/metal-pipe-clang.mp3',
    'emotional_damage': 'sounds/emotional-damage-meme.mp3',
    'rizz_sounds': 'sounds/rizz-sounds.mp3',
    'sad_meow': 'sounds/sad-meow-song.mp3',
    'undertaker_bell': 'sounds/undertakers-bell_2UwFCIe.mp3',
    'downer_noise': 'sounds/downer_noise.mp3',
    'gta_san_andreas': 'sounds/gta-san-andreas-ah-shit-here-we-go-again_BWv0Gvc.mp3',
    'discord_call': 'sounds/discord-call-sound.mp3',
    'erro': 'sounds/erro.mp3',
    'maro_jump': 'sounds/maro-jump-sound-effect_1.mp3',
    'discord_leave': 'sounds/discord-leave-noise.mp3',
    'chicken_jockey': 'sounds/chicken-jockey.mp3'
};

// Preload audio elements
const audioElements = {};
for (const [key, src] of Object.entries(soundFiles)) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audioElements[key] = audio;
}

// --- Event Listeners ---
const buttons = document.querySelectorAll('.sound-btn');
buttons.forEach(button => {
    button.addEventListener('click', async () => {
        if (!audioInitialized) {
            audioInitialized = true;
            startPrompt.style.display = 'none';
        }
        const sound = button.dataset.sound;
        playSound(sound);
    });
});

// --- Sound Playback Function ---
function playSound(sound) {
    const audio = audioElements[sound];
    if (!audio) {
        console.error(`Sound "${sound}" not found.`);
        return;
    }
    // Restart sound if already playing
    audio.currentTime = 0;
    audio.play();
}

// --- FAVORITES FEATURE ---
const FAVORITES_KEY = 'mbd_soundboard_favorites';
let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(sound) {
    return favorites.includes(sound);
}

function toggleFavorite(sound) {
    if (isFavorite(sound)) {
        favorites = favorites.filter(fav => fav !== sound);
    } else {
        favorites.push(sound);
    }
    saveFavorites();
    renderFavorites();
    updateButtonStars();
}

function updateButtonStars() {
    document.querySelectorAll('.sound-btn').forEach(btn => {
        const sound = btn.dataset.sound;
        let star = btn.querySelector('.favorite-star');
        if (!star) {
            star = document.createElement('span');
            star.className = 'favorite-star ml-2';
            btn.querySelector('span').after(star);
        }
        star.textContent = isFavorite(sound) ? '★' : '☆';
        star.style.cursor = 'pointer';
        star.onclick = e => {
            e.stopPropagation();
            toggleFavorite(sound);
        };
    });
}

function renderFavorites() {
    const favGrid = document.getElementById('favorites-grid');
    favGrid.innerHTML = '';
    favorites.forEach(sound => {
        if (!soundFiles[sound]) return;
        const btn = document.createElement('button');
        btn.className = 'sound-btn btn-press aspect-square w-full bg-yellow-200 text-black border-4 border-black shadow-harsh transition-transform duration-100 ease-in-out mb-2 flex flex-col items-center justify-center';
        btn.dataset.sound = sound;
        btn.onclick = () => playSound(sound);
        btn.innerHTML = `<span class="text-2xl font-bold">${getSoundLabel(sound)}</span> <span class="favorite-star ml-2">★</span>` +
            `<a href="${soundFiles[sound]}" download class="mt-2 text-xs bg-white border-2 border-black rounded px-2 py-1 hover:bg-black hover:text-white transition-colors">Download</a>`;
        favGrid.appendChild(btn);
    });
}

// Add download buttons to all sound buttons
function addDownloadButtons() {
    document.querySelectorAll('.sound-btn').forEach(btn => {
        const sound = btn.dataset.sound;
        if (!soundFiles[sound]) return;
        if (btn.querySelector('.download-btn')) return; // Prevent duplicate
        const dl = document.createElement('a');
        dl.href = soundFiles[sound];
        dl.download = '';
        dl.textContent = 'Download';
        dl.className = 'download-btn mt-2 text-xs bg-white border-2 border-black rounded px-2 py-1 hover:bg-black hover:text-white transition-colors block';
        btn.appendChild(dl);
    });
}

function getSoundLabel(sound) {
    // Map sound keys to button labels (fallback to key)
    const labels = {
        among_us_trap: 'AMONG US TRAP', role_reveal: 'ROLE REVEAL', discord: 'DISCORD', movie_1: 'MOVIE 1', vine_boom: 'VINE BOOM', rizz: 'RIZZ', applepay: 'APPLE PAY', spongebob_fail: 'SPONGEBOB FAIL', anime_wow: 'ANIME WOW', roblox_death: 'ROBLOX DEATH', hub_intro: 'HUB INTRO', metal_pipe: 'METAL PIPE', emotional_damage: 'EMOTIONAL DAMAGE', rizz_sounds: 'RIZZ SOUNDS', sad_meow: 'SAD MEOW', undertaker_bell: 'UNDERTAKER BELL', downer_noise: 'DOWNER NOISE', gta_san_andreas: 'GTA SAN ANDREAS', discord_call: 'DISCORD CALL', erro: 'ERRO', maro_jump: 'MARO JUMP', discord_leave: 'DISCORD LEAVE', chicken_jockey: 'CHICKEN JOCKEY'
    };
    return labels[sound] || sound;
}

// Initial render
renderFavorites();
updateButtonStars();
addDownloadButtons();
