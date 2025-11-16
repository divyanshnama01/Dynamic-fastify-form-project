// public/index.js
const API_GET = "/names";
const API_POST = "/names";

const form = document.getElementById("nameForm");
const input = document.getElementById("nameInput");
const listEl = document.getElementById("namesList");
const emptyMsg = document.getElementById("emptyMsg");
const countEl = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");

function log(...args){ console.log("[name-app]", ...args); }
function escapeHtml(s){ return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[c]); }
function initials(name){
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if(parts.length===0) return "";
  if(parts.length===1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0]+parts[parts.length-1][0]).toUpperCase();
}

function renderList(names){
  listEl.innerHTML = "";
  if(!Array.isArray(names) || names.length === 0){
    emptyMsg.style.display = "block";
    countEl.textContent = "0 names submitted";
    return;
  }
  emptyMsg.style.display = "none";
  countEl.textContent = `${names.length} ${names.length===1 ? "name" : "names"} submitted`;
  names.forEach((n, idx) => {
    const li = document.createElement("li"); li.className = "item";
    li.innerHTML = `
      <div class="left">
        <div class="avatar">${initials(n)}</div>
        <div class="name-text">${escapeHtml(n)}</div>
      </div>
      <div class="actions"><button class="icon-btn remove">Remove</button></div>
    `;
    li.querySelector(".remove").addEventListener("click", () => {
      // optimistic client removal (server doesn't have delete endpoint yet)
      names.splice(idx, 1);
      renderList(names);
    });
    listEl.appendChild(li);
  });
}

async function loadNames(){
  try {
    log("GET", API_GET);
    const res = await fetch(API_GET, { cache: "no-store" });
    if(!res.ok){
      log("GET failed", res.status, res.statusText);
      renderList([]);
      return;
    }
    const data = await res.json();
    log("Loaded names:", data);
    renderList(data);
  } catch (err) {
    console.error("Failed to load names:", err);
    renderList([]);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if(!name){ input.focus(); return; }
  input.disabled = true;
  try {
    log("POST", API_POST, name);
    const res = await fetch(API_POST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    log("POST status:", res.status);
    if(res.ok){
      input.value = "";
      await loadNames();
      input.focus();
    } else {
      let body;
      try { body = await res.json(); } catch(e){ body = await res.text().catch(()=>null); }
      console.error("Server error:", res.status, body);
      alert("Server error: " + (body && body.error ? body.error : res.status));
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error: could not reach server.");
  } finally {
    input.disabled = false;
  }
});

clearBtn.addEventListener("click", () => {
  if (!confirm("Clear list locally? (this clears client view only)")) return;
  renderList([]);
  countEl.textContent = "0 names submitted";
});

window.addEventListener("load", () => {
  if (!form || !input || !listEl) {
    console.error("Missing DOM elements", { form, input, listEl });
    return;
  }
  loadNames();
});

