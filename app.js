// Nova's Web Apps Database
const APPS_DATA = [
  {
    id: "MonsterSnackShop",
    title: "Monster Snack Shop 👾 | Dialogue Cafe Game",
    category: "english",
    icon: "👾",
    description: "Interactive ESL functional dialogue cafe game for kids! Serve hungry monsters delicious treats using natural English phrases and voice audio.",
    url: "https://nova0816.github.io/MonsterSnackShop/",
    repoUrl: "https://github.com/nova0816/MonsterSnackShop",
    tags: ["ESL", "Dialogue Game", "Kids", "Audio", "Interactive Cafe"],
    accent: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
    glow: "rgba(255, 107, 107, 0.25)"
  },
  {
    id: "LearnFrench",
    title: "Élan - Interactive French Learning PWA",
    category: "language",
    icon: "🇫🇷",
    description: "Conversational French PWA featuring interactive vocabulary flip cards, listening drills, speech practice, and native audio pronunciations.",
    url: "https://nova0816.github.io/LearnFrench/",
    repoUrl: "https://github.com/nova0816/LearnFrench",
    tags: ["PWA", "French", "Vocabulary", "Audio Drills", "Speech API"],
    accent: "linear-gradient(135deg, #ec4899, #f43f5e)",
    glow: "rgba(236, 72, 153, 0.25)"
  },
  {
    id: "MemoryGame",
    title: "Cute Memory Match - Learn to Read!",
    category: "kids",
    icon: "🧸",
    description: "Vibrant animal & vocabulary memory matching game across 12 fun topics (Animals, Colors, Fruits, Shapes, School, Beach, Kitchen) designed for kids.",
    url: "https://nova0816.github.io/MemoryGame/",
    repoUrl: "https://github.com/nova0816/MemoryGame",
    tags: ["Kids", "Memory Game", "12 Topics", "Audio Rewards", "Interactive"],
    accent: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    glow: "rgba(245, 158, 11, 0.25)"
  },
  {
    id: "ReviewGame",
    title: "Vocabulary Explorer: Story Series",
    category: "english",
    icon: "📚",
    description: "Story-based English vocabulary explorer with animated episode cards (Autumn Wind, Time Treasure) featuring interactive matching and voice audio.",
    url: "https://nova0816.github.io/ReviewGame/",
    repoUrl: "https://github.com/nova0816/ReviewGame",
    tags: ["English", "Story Cards", "Vocabulary", "Audio", "Episodes"],
    accent: "linear-gradient(135deg, #10b981, #059669)",
    glow: "rgba(16, 185, 129, 0.25)"
  },
  {
    id: "VerbGame",
    title: "Word Explorer: Action Verbs!",
    category: "english",
    icon: "🎨",
    description: "Action verb mastery game featuring 10 level progressions across 4 difficulty modes (Easy, Listen, Normal, Hard) with word ordering challenges.",
    url: "https://nova0816.github.io/VerbGame/",
    repoUrl: "https://github.com/nova0816/VerbGame",
    tags: ["Grammar", "Action Verbs", "Audio Drills", "Levels", "Sentences"],
    accent: "linear-gradient(135deg, #6366f1, #4f46e5)",
    glow: "rgba(99, 102, 241, 0.25)"
  },
  {
    id: "VoiceGame",
    title: "NEURAL MAZE // Voice-Controlled Challenge",
    category: "voice",
    icon: "🐰",
    description: "Cyberpunk voice-controlled maze game where you use Web Speech API vocal commands ('GO UP', 'GO DOWN', 'JUMP OVER') to guide Bunny through the maze!",
    url: "https://nova0816.github.io/VoiceGame/",
    repoUrl: "https://github.com/nova0816/VoiceGame",
    tags: ["Voice Control", "Web Speech API", "Cyberpunk", "Maze Game", "Fun"],
    accent: "linear-gradient(135deg, #06b6d4, #0284c7)",
    glow: "rgba(6, 182, 212, 0.25)"
  }
];

// State
let currentCategory = "all";
let searchQuery = "";

// DOM Elements
const appsGrid = document.getElementById("apps-grid");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");
const categoryTabs = document.getElementById("category-tabs");
const emptyState = document.getElementById("empty-state");
const resetFiltersBtn = document.getElementById("reset-filters-btn");

// Initialize Portal
document.addEventListener("DOMContentLoaded", () => {
  renderApps();
  updateCategoryCounts();
  setupEventListeners();
  
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Setup Event Listeners
function setupEventListeners() {
  // Search input event
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery.length > 0) {
      clearSearchBtn.classList.remove("hidden");
    } else {
      clearSearchBtn.classList.add("hidden");
    }
    renderApps();
  });

  // Clear search button
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.classList.add("hidden");
    searchInput.focus();
    renderApps();
  });

  // Category Tab Click
  categoryTabs.addEventListener("click", (e) => {
    const tabBtn = e.target.closest(".tab-btn");
    if (!tabBtn) return;

    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    tabBtn.classList.add("active");

    currentCategory = tabBtn.dataset.category;
    renderApps();
  });

  // Reset Filters Button
  resetFiltersBtn.addEventListener("click", () => {
    currentCategory = "all";
    searchQuery = "";
    searchInput.value = "";
    clearSearchBtn.classList.add("hidden");

    document.querySelectorAll(".tab-btn").forEach(btn => {
      if (btn.dataset.category === "all") btn.classList.add("active");
      else btn.classList.remove("active");
    });

    renderApps();
  });
}

// Render Apps Cards
function renderApps() {
  const filtered = APPS_DATA.filter(app => {
    const matchesCategory = currentCategory === "all" || app.category === currentCategory;
    const matchesSearch = searchQuery === "" ||
      app.title.toLowerCase().includes(searchQuery) ||
      app.description.toLowerCase().includes(searchQuery) ||
      app.tags.some(t => t.toLowerCase().includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    appsGrid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  appsGrid.classList.remove("hidden");

  appsGrid.innerHTML = filtered.map(app => `
    <article class="app-card" style="--card-accent: ${app.accent}; --card-glow: ${app.glow};">
      <div class="app-card-header">
        <div class="app-icon-box">
          ${app.icon}
        </div>
        <div class="status-badge" title="Live on GitHub Pages">
          <span class="status-dot"></span>
          <span>Live</span>
        </div>
      </div>

      <div class="app-card-body">
        <h2 class="app-title">${escapeHtml(app.title)}</h2>
        <p class="app-description">${escapeHtml(app.description)}</p>

        <div class="app-tags">
          ${app.tags.map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>

      <div class="card-actions">
        <a href="${app.url}" target="_blank" class="btn-launch" rel="noopener noreferrer">
          <span>Launch App</span>
          <i data-lucide="external-link"></i>
        </a>
        <a href="${app.repoUrl}" target="_blank" class="btn-github" title="View GitHub Source Code" rel="noopener noreferrer">
          <i data-lucide="github"></i>
        </a>
      </div>
    </article>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Update Category Count Badges
function updateCategoryCounts() {
  const counts = {
    all: APPS_DATA.length,
    language: 0,
    english: 0,
    kids: 0,
    voice: 0
  };

  APPS_DATA.forEach(app => {
    if (counts[app.category] !== undefined) {
      counts[app.category]++;
    }
  });

  Object.keys(counts).forEach(cat => {
    const el = document.getElementById(`cat-count-${cat}`);
    if (el) el.textContent = counts[cat];
  });

  const totalAppsEl = document.getElementById("total-apps-count");
  if (totalAppsEl) totalAppsEl.textContent = APPS_DATA.length;
}

// Utility: Escape HTML
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
