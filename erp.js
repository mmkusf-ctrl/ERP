function openMobileNav(){
  const m = document.getElementById("mobileNav");
  if (m) m.classList.add("open");
}
function closeMobileNav(){
  const m = document.getElementById("mobileNav");
  if (m) m.classList.remove("open");
}

document.addEventListener("click", (e) => {
  const m = document.getElementById("mobileNav");
  if (!m) return;
  if (m.classList.contains("open") && e.target === m) closeMobileNav();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileNav();
});

function isAuthed(){
  try { return localStorage.getItem("stark_erp_authed") === "1"; } catch { return false; }
}
function requireAuth(){
  if (!isAuthed()) window.location.href = "index.html";
}
function logout(){
  try {
    localStorage.removeItem("stark_erp_authed");
    localStorage.removeItem("stark_erp_user");
  } catch {}
  window.location.href = "index.html";
}
function setActiveNav(page){
  document.querySelectorAll(".nav a, .mobile-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === page.toLowerCase());
  });
}

function toast(title, msg){
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return alert(title + "\n" + msg);
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `
    <div>
      <div style="font-weight:900;font-size:13px;margin-bottom:2px;">${escapeHtml(title)}</div>
      <div style="color:#667085;font-size:12px;line-height:1.4;">${escapeHtml(msg)}</div>
    </div>
    <button style="border:none;background:transparent;font-size:16px;cursor:pointer;color:rgba(11,18,32,0.55)">×</button>
  `;
  el.querySelector("button").onclick = () => el.remove();
  wrap.prepend(el);
  setTimeout(() => { if (el.isConnected) el.remove(); }, 9000);
}
function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
