(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();function b(d){const i=d.getBoundingClientRect(),t=document.createElement("div");t.className="ink-drop",t.style.left=`${i.left+i.width/2}px`,t.style.top=`${i.top+i.height/2}px`,document.body.appendChild(t),setTimeout(()=>{t.remove()},900)}let s=JSON.parse(localStorage.getItem("nibi_habits"))||[];function l(){localStorage.setItem("nibi_habits",JSON.stringify(s))}function u(){const d=document.querySelector("#app");let i=s.map((t,n)=>{const e=new Date;e.setHours(0,0,0,0);let a="";for(let r=6;r>=0;r--){const o=new Date(e);o.setDate(o.getDate()-r);const c=o.toISOString().split("T")[0],f=t.records&&t.records.includes(c),m=o.getDate();a+=`
        <div class="calendar-day-wrapper">
          <div class="calendar-day ${f?"done":""}" data-index="${n}" data-date="${c}" aria-label="${c} の記録"></div>
          <span class="day-label">${m}</span>
        </div>
      `}return`
      <div class="habit-item fade-in">
        <div class="habit-header">
          <span class="habit-name">${t.name}</span>
          <button class="delete-habit-btn" data-index="${n}" aria-label="削除">×</button>
        </div>
        <div class="habit-calendar">
          ${a}
        </div>
      </div>
    `}).join("");d.innerHTML=`
    <div class="container">
      <header class="header">
        <h1>Nibi</h1>
        <p>「何もない」習慣トラッカー</p>
      </header>
      
      <main class="main-content">
        <div id="habits-container" class="habits-list">
          ${i}
        </div>
        
        <div class="add-habit-form fade-in" style="animation-delay: 0.1s;">
          <input type="text" id="new-habit-input" placeholder="新しい習慣..." aria-label="新しい習慣">
          <button id="add-habit-btn" aria-label="追加">＋</button>
        </div>
      </main>
    </div>
  `,document.querySelector("#add-habit-btn").addEventListener("click",p),document.querySelector("#new-habit-input").addEventListener("keypress",t=>{t.key==="Enter"&&p()}),document.querySelectorAll(".delete-habit-btn").forEach(t=>{t.addEventListener("click",n=>{const e=parseInt(n.target.dataset.index);s.splice(e,1),l(),u()})}),document.querySelectorAll(".calendar-day").forEach(t=>{t.addEventListener("click",n=>{const e=parseInt(n.target.dataset.index),a=n.target.dataset.date;s[e].records||(s[e].records=[]);const r=s[e].records.indexOf(a);r===-1?(s[e].records.push(a),b(n.target),n.target.classList.add("done")):(s[e].records.splice(r,1),n.target.classList.remove("done")),l()})})}function p(){const i=document.querySelector("#new-habit-input").value.trim();i&&(s.push({name:i,records:[]}),l(),u())}u();
