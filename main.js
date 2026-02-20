import './style.css';
import { playInkEffect } from './ink-effect.js';

let habits = JSON.parse(localStorage.getItem('nibi_habits')) || [];

function saveHabits() {
  localStorage.setItem('nibi_habits', JSON.stringify(habits));
}

function render() {
  const app = document.querySelector('#app');

  let habitsHtml = habits.map((habit, index) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let daysHtml = '';
    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isDone = habit.records && habit.records.includes(dateStr);

      const dayStr = d.getDate();

      daysHtml += `
        <div class="calendar-day-wrapper">
          <div class="calendar-day ${isDone ? 'done' : ''}" data-index="${index}" data-date="${dateStr}" aria-label="${dateStr} の記録"></div>
          <span class="day-label">${dayStr}</span>
        </div>
      `;
    }

    return `
      <div class="habit-item fade-in">
        <div class="habit-header">
          <span class="habit-name">${habit.name}</span>
          <button class="delete-habit-btn" data-index="${index}" aria-label="削除">×</button>
        </div>
        <div class="habit-calendar">
          ${daysHtml}
        </div>
      </div>
    `;
  }).join('');

  app.innerHTML = `
    <div class="container">
      <header class="header">
        <h1>Nibi</h1>
        <p>「何もない」習慣トラッカー</p>
      </header>
      
      <main class="main-content">
        <div id="habits-container" class="habits-list">
          ${habitsHtml}
        </div>
        
        <div class="add-habit-form fade-in" style="animation-delay: 0.1s;">
          <input type="text" id="new-habit-input" placeholder="新しい習慣..." aria-label="新しい習慣">
          <button id="add-habit-btn" aria-label="追加">＋</button>
        </div>
      </main>
    </div>
  `;

  // Attach Event Listeners
  document.querySelector('#add-habit-btn').addEventListener('click', addHabit);
  document.querySelector('#new-habit-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addHabit();
  });

  document.querySelectorAll('.delete-habit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      habits.splice(idx, 1);
      saveHabits();
      render();
    });
  });

  document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      const dateStr = e.target.dataset.date;

      if (!habits[idx].records) {
        habits[idx].records = [];
      }

      const recordIdx = habits[idx].records.indexOf(dateStr);
      if (recordIdx === -1) {
        habits[idx].records.push(dateStr);
        playInkEffect(e.target);
        e.target.classList.add('done');
      } else {
        habits[idx].records.splice(recordIdx, 1);
        e.target.classList.remove('done');
      }
      saveHabits();
    });
  });
}

function addHabit() {
  const input = document.querySelector('#new-habit-input');
  const name = input.value.trim();
  if (name) {
    habits.push({ name, records: [] });
    saveHabits();
    render();
  }
}

// Initial render
render();
