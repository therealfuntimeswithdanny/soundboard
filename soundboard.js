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
