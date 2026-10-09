/* ==========================================
   BRIGHTSIDE — APP LOGIC (app.js)
   ========================================== */

// ============ STATE ============
let state = {
  name: '',
  points: 0,
  tasksDone: 0,
  streak: 0,
  completedTasks: [],
  jokePointsEarned: false,
  affirmationPointsEarned: false,
  songPointsEarned: [],
  currentAffirmationFilter: 'all',
  currentAffirmationIndex: 0,
  currentJokeIndex: 0,
};

// ============ DATA ============

const TASKS = [
  { id: 'walk', emoji: '🚶', title: 'Take a 10-min Walk', desc: 'Step outside, breathe fresh air, and let nature lift your mood.', points: 50, category: 'physical' },
  { id: 'run', emoji: '🏃', title: 'Go for a Run', desc: 'Even 5 minutes of running releases endorphins that fight depression.', points: 80, category: 'physical' },
  { id: 'water', emoji: '💧', title: 'Drink 8 Glasses of Water', desc: 'Stay hydrated — your brain needs water to feel its best!', points: 30, category: 'health' },
  { id: 'sleep', emoji: '😴', title: 'Sleep Before Midnight', desc: 'Good sleep is the foundation of mental wellness.', points: 60, category: 'health' },
  { id: 'music', emoji: '🎵', title: 'Listen to Uplifting Music', desc: 'Put on your favorite feel-good playlist for at least 15 minutes.', points: 40, category: 'mental' },
  { id: 'journal', emoji: '📓', title: 'Write in a Journal', desc: 'Write 3 things you are grateful for, no matter how small.', points: 45, category: 'mental' },
  { id: 'breathe', emoji: '🧘', title: '5-Minute Deep Breathing', desc: 'Inhale 4 counts, hold 4, exhale 4. Repeat 5 times. Calm the storm.', points: 35, category: 'mental' },
  { id: 'connect', emoji: '📱', title: 'Call Someone You Love', desc: 'Reach out. A 5-minute chat with a loved one works wonders.', points: 55, category: 'social' },
  { id: 'stretch', emoji: '🤸', title: 'Do a 10-min Stretch', desc: 'Release tension from your body. Your mind will thank you.', points: 40, category: 'physical' },
  { id: 'dance', emoji: '💃', title: 'Dance to One Song', desc: 'Just one song. Let your body move freely. No audience needed!', points: 45, category: 'physical' },
  { id: 'sunlight', emoji: '☀️', title: 'Get 10 mins of Sunlight', desc: 'Vitamin D from sunlight naturally boosts serotonin levels.', points: 35, category: 'health' },
  { id: 'kindness', emoji: '💌', title: 'Do One Act of Kindness', desc: 'Compliment someone, help a stranger, or send a kind message.', points: 60, category: 'social' },
];

const SONGS = [
  { emoji: '🌟', title: 'Here Comes the Sun', artist: 'The Beatles', genre: 'Classic', url: 'https://www.youtube.com/watch?v=KQetemT1sWc', mood: 'hopeful' },
  { emoji: '🎸', title: 'Good as Hell', artist: 'Lizzo', genre: 'Pop', url: 'https://www.youtube.com/watch?v=SmbmeOgWsqE', mood: 'empowering' },
  { emoji: '🌈', title: 'Happy', artist: 'Pharrell Williams', genre: 'Pop', url: 'https://www.youtube.com/watch?v=y6Sxv-sUYtM', mood: 'joyful' },
  { emoji: '💪', title: 'Roar', artist: 'Katy Perry', genre: 'Pop', url: 'https://www.youtube.com/watch?v=CevxZvSJLk8', mood: 'empowering' },
  { emoji: '🌸', title: 'Beautiful Day', artist: 'U2', genre: 'Rock', url: 'https://www.youtube.com/watch?v=co6WMzDOh1o', mood: 'hopeful' },
  { emoji: '🎵', title: 'Don\'t Stop Me Now', artist: 'Queen', genre: 'Classic Rock', url: 'https://www.youtube.com/watch?v=HgzGwKwLmgM', mood: 'joyful' },
  { emoji: '💛', title: 'Count on Me', artist: 'Bruno Mars', genre: 'Pop', url: 'https://www.youtube.com/watch?v=iZENzEigcj8', mood: 'warm' },
  { emoji: '🌻', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', genre: 'Pop', url: 'https://www.youtube.com/watch?v=iPUmE-tne5U', mood: 'joyful' },
];

const JOKES = [
  "Why don't scientists trust atoms? Because they make up everything! 😄",
  "I told my therapist I was feeling blue. She said, 'Have you tried painting?' Now I have 47 terrible paintings. 🎨",
  "What do you call a fish wearing a crown? 👑 King of the sea-bass!",
  "My doctor told me I was paranoid. Well, he didn't say it exactly, but I could tell he was thinking it. 🤔",
  "Why do cows wear bells? Because their horns don't work! 🐄",
  "I'm reading a book about anti-gravity. It's impossible to put down! 📚",
  "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
  "I asked my dog what two minus two is. He said nothing. 🐶",
  "Why can't you give Elsa a balloon? Because she'll let it go! ❄️",
  "I told my cat a joke. She gave me the silent treatment. Typical. 🐱",
  "What did the ocean say to the beach? Nothing, it just waved! 🌊",
  "Why did the math book look so sad? Because it had too many problems. 📖",
  "I'm on a seafood diet. I see food and I eat it! 🍕",
  "Why do we tell actors to 'break a leg?' Because every play has a cast! 🎭",
  "I used to hate facial hair... but then it grew on me. 😂",
];

const AFFIRMATIONS = {
  all: [
    { text: '"You are enough, exactly as you are right now."', category: 'self-love' },
    { text: '"Every storm runs out of rain. This too shall pass."', category: 'hope' },
    { text: '"You are braver than you believe, stronger than you seem."', category: 'strength' },
    { text: '"Healing is not linear. Be patient with yourself."', category: 'self-love' },
    { text: '"You have survived 100% of your worst days so far."', category: 'strength' },
    { text: '"Your feelings are valid. You deserve to feel better."', category: 'self-love' },
    { text: '"Small progress is still progress. You are moving forward."', category: 'hope' },
    { text: '"You are worthy of love, care, and happiness."', category: 'self-love' },
    { text: '"The sun will rise again. So will you."', category: 'hope' },
    { text: '"Your story is not over yet."', category: 'hope' },
    { text: '"You are not alone in this journey."', category: 'self-love' },
    { text: '"Every day you wake up is a chance to begin again."', category: 'hope' },
    { text: '"You are capable of incredible things."', category: 'strength' },
    { text: '"Be kind to yourself the way you\'d be kind to a friend."', category: 'self-love' },
    { text: '"Mountains are climbed one step at a time. You\'ve got this."', category: 'strength' },
  ],
  'self-love': [],
  'strength': [],
  'hope': [],
};

// Pre-fill category arrays
AFFIRMATIONS['self-love'] = AFFIRMATIONS.all.filter(a => a.category === 'self-love');
AFFIRMATIONS['strength'] = AFFIRMATIONS.all.filter(a => a.category === 'strength');
AFFIRMATIONS['hope'] = AFFIRMATIONS.all.filter(a => a.category === 'hope');


// ============ INIT ============
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderTasks();
  renderSongs();
  renderJoke();
  renderAffirmation();
  updateUI();
});

// ============ STATE PERSISTENCE ============
function saveState() {
  localStorage.setItem('brightside_state', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('brightside_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Check if it's a new day — reset daily tasks
      const today = new Date().toDateString();
      const lastDay = parsed.lastDay;
      if (lastDay && lastDay !== today) {
        parsed.completedTasks = [];
        parsed.jokePointsEarned = false;
        parsed.affirmationPointsEarned = false;
        parsed.songPointsEarned = [];
        // Update streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDay === yesterday.toDateString()) {
          parsed.streak = (parsed.streak || 0) + 1;
        } else {
          parsed.streak = 0;
        }
      }
      parsed.lastDay = today;
      state = { ...state, ...parsed };
    } catch(e) {}
  }
  state.lastDay = new Date().toDateString();
  saveState();
}

// ============ NAME ============
function setName() {
  const input = document.getElementById('username-input');
  const name = input.value.trim();
  if (!name) return;
  state.name = name;
  saveState();
  document.getElementById('welcome-msg').textContent =
    `Welcome, ${name}! 🎉 Let's make today a little brighter.`;
  input.value = '';
}

// ============ POINTS ============
function addPoints(amount, label) {
  state.points += amount;
  state.tasksDone++;
  saveState();
  updateUI();
  showToast(`${label} +${amount} pts! ⭐`);
}

function updateUI() {
  document.getElementById('nav-score').textContent = state.points;
  document.getElementById('total-points').textContent = state.points;
  document.getElementById('streak-count').textContent = state.streak;
  document.getElementById('tasks-done').textContent = state.tasksDone;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ TASKS ============
function renderTasks() {
  const grid = document.getElementById('tasks-grid');
  grid.innerHTML = '';
  TASKS.forEach(task => {
    const done = state.completedTasks.includes(task.id);
    const card = document.createElement('div');
    card.className = 'task-card' + (done ? ' completed' : '');
    card.innerHTML = `
      <div class="task-emoji">${task.emoji}</div>
      <div class="task-title">${task.title}</div>
      <div class="task-desc">${task.desc}</div>
      <div class="task-points">⭐ ${task.points} points</div>
      <button class="task-btn" ${done ? 'disabled' : ''} onclick="completeTask('${task.id}')">
        ${done ? '✅ Completed!' : '✔ Mark Done'}
      </button>
    `;
    grid.appendChild(card);
  });
}

function completeTask(taskId) {
  if (state.completedTasks.includes(taskId)) return;
  const task = TASKS.find(t => t.id === taskId);
  if (!task) return;
  state.completedTasks.push(taskId);
  saveState();
  addPoints(task.points, task.title);
  renderTasks();
  // Check for achievement
  if (state.completedTasks.length === TASKS.length) {
    setTimeout(() => showToast('🏆 LEGEND! All tasks done today!'), 1000);
  } else if (state.completedTasks.length === 5) {
    setTimeout(() => showToast('🔥 5 tasks done! You\'re on fire!'), 1000);
  }
}

// ============ SONGS ============
function renderSongs() {
  const grid = document.getElementById('songs-grid');
  grid.innerHTML = '';
  const colors = [
    'linear-gradient(135deg,#6C63FF,#FF6584)',
    'linear-gradient(135deg,#06D6A0,#6C63FF)',
    'linear-gradient(135deg,#FFD166,#FF6584)',
    'linear-gradient(135deg,#FF6584,#6C63FF)',
    'linear-gradient(135deg,#06D6A0,#FFD166)',
    'linear-gradient(135deg,#6C63FF,#06D6A0)',
    'linear-gradient(135deg,#FFD166,#6C63FF)',
    'linear-gradient(135deg,#FF6584,#06D6A0)',
  ];
  SONGS.forEach((song, idx) => {
    const earned = state.songPointsEarned.includes(idx);
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <div class="song-thumb" style="background:${colors[idx % colors.length]}">
        <span class="song-thumb-emoji">${song.emoji}</span>
      </div>
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist} • ${song.genre}</div>
        <div class="song-actions">
          <button class="song-play-btn" onclick="playSong('${song.url}', '${song.title}')">
            ▶ Play on YouTube
          </button>
          <button class="song-pts-btn" onclick="earnSongPoints(${idx})" ${earned ? 'disabled style="opacity:0.4"' : ''}>
            ${earned ? '✅ Done' : '🎵 +15'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function playSong(url, title) {
  window.open(url, '_blank');
  showToast(`Now playing: ${title} 🎵`);
}

function earnSongPoints(idx) {
  if (state.songPointsEarned.includes(idx)) return;
  state.songPointsEarned.push(idx);
  saveState();
  addPoints(15, `Listening to "${SONGS[idx].title}"`);
  renderSongs();
}

// ============ JOKES ============
function renderJoke() {
  document.getElementById('joke-text').textContent = JOKES[state.currentJokeIndex];
  state.jokePointsEarned = false; // Reset per joke
}

function newJoke() {
  state.currentJokeIndex = (state.currentJokeIndex + 1) % JOKES.length;
  state.jokePointsEarned = false;
  document.getElementById('joke-text').textContent = JOKES[state.currentJokeIndex];
  saveState();
}

function earnJokePoints() {
  if (state.jokePointsEarned) {
    showToast('Already earned points for this joke! 😄 Try a new one!');
    return;
  }
  state.jokePointsEarned = true;
  saveState();
  addPoints(10, 'Laughing at a joke 😂');
}

// ============ AFFIRMATIONS ============
function renderAffirmation() {
  const list = AFFIRMATIONS[state.currentAffirmationFilter];
  const idx = state.currentAffirmationIndex % list.length;
  document.getElementById('affirmation-text').textContent = list[idx].text;
  state.affirmationPointsEarned = false;
}

function newAffirmation() {
  const list = AFFIRMATIONS[state.currentAffirmationFilter];
  state.currentAffirmationIndex = (state.currentAffirmationIndex + 1) % list.length;
  state.affirmationPointsEarned = false;
  const aff = list[state.currentAffirmationIndex % list.length];
  document.getElementById('affirmation-text').textContent = aff.text;
  // Animate
  const el = document.getElementById('affirmation-text');
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  setTimeout(() => {
    el.style.transition = 'all 0.4s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 50);
  saveState();
}

function earnAffirmationPoints() {
  if (state.affirmationPointsEarned) {
    showToast('Already earned for this affirmation! Try a new one! 💛');
    return;
  }
  state.affirmationPointsEarned = true;
  saveState();
  addPoints(20, 'Embracing an affirmation 💬');
}

function filterAffirmations(category, btn) {
  state.currentAffirmationFilter = category;
  state.currentAffirmationIndex = 0;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAffirmation();
}

// ============ SHARE ============
function sharePoints() {
  const preview = document.getElementById('share-preview');
  const name = state.name || 'I';
  preview.innerHTML = `
    <div style="font-size:1.5rem;margin-bottom:6px">🌟 BrightSide Progress</div>
    <div style="font-size:0.9rem;opacity:0.8;margin-bottom:16px">${name}'s Mental Wellness Journey</div>
    <div class="big-pts">${state.points}</div>
    <div style="font-size:1rem;margin-top:4px">Wellness Points</div>
    <div style="margin-top:12px;font-size:0.85rem;opacity:0.8">
      🔥 ${state.streak} day streak &nbsp;|&nbsp; ✅ ${state.tasksDone} tasks done
    </div>
  `;
  document.getElementById('share-modal').classList.add('show');
}

function closeModal() {
  document.getElementById('share-modal').classList.remove('show');
}

function getShareText() {
  const name = state.name || 'I';
  return `🌟 ${name} just earned ${state.points} Wellness Points on BrightSide!\n🔥 ${state.streak} day streak | ✅ ${state.tasksDone} tasks done\n\nJoin me on my mental wellness journey! 💛\n#BrightSide #MentalHealth #YouMatter`;
}

function shareWhatsApp() {
  const text = encodeURIComponent(getShareText());
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareTwitter() {
  const text = encodeURIComponent(getShareText());
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function copyShareText() {
  navigator.clipboard.writeText(getShareText()).then(() => {
    showToast('📋 Copied to clipboard!');
    closeModal();
  }).catch(() => {
    showToast('Could not copy. Try manually!');
  });
}

// Close modal on overlay click
document.getElementById('share-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Enter key for name
document.getElementById('username-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') setName();
});

// ============ FOOTER ============
document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <p>Made with 💛 for everyone who needs a little light today.</p>
      <p style="margin-top:8px">
        <strong>BrightSide</strong> — Points have no monetary value. They represent your dedication to yourself. 🌟
      </p>
      <p style="margin-top:12px;font-size:0.8rem">
        If you're struggling, please reach out to a mental health professional or call a helpline in your country.
        <br/><a href="https://www.befrienders.org/" target="_blank">befrienders.org</a> — Worldwide crisis support 💙
      </p>
    </footer>
  `);
});
