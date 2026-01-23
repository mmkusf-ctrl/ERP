/* ========= Core Storage Keys ========= */
const ERP = {
  AUTH: "stark_erp_auth_v1",          // { loggedIn: true/false, user: "A|B|C|D" }
  USERS: "stark_erp_users_v1",        // optional
  TASKS: "stark_erp_tasks_v1",        // shared tasks (localStorage for now)
  ITEMS: "stark_erp_items_v1",        // inventory items
  POS:   "stark_erp_pos_v1",          // purchase orders
  CUSTOMERS: "stark_erp_customers_v1",
  SALES: "stark_erp_sales_v1",        // sales lines (orderId, customer, sku, qty, date, location, unitPrice)
  ORDERS: "stark_erp_orders_v1",      // sales orders (header)
  SHIP: "stark_erp_shipments_v1"      // logistics shipments
};

function lsLoad(key, fallback){
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}
function lsSave(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

function esc(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function toast(title, message){
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return alert(`${title}\n\n${message}`);

  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `
    <div>
      <strong>${esc(title)}</strong>
      <span>${esc(message)}</span>
    </div>
    <button class="close" aria-label="Close">×</button>
  `;
  el.querySelector(".close").onclick = () => el.remove();
  wrap.prepend(el);
  setTimeout(() => { if (el.isConnected) el.remove(); }, 9000);
}

/* ========= Mobile menu ========= */
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

/* ========= Auth ========= */
function getAuth(){ return lsLoad(ERP.AUTH, { loggedIn:false, user:"A" }); }
function setAuth(obj){ lsSave(ERP.AUTH, obj); }

function requireAuth(){
  const a = getAuth();
  if (!a.loggedIn) window.location.href = "index.html";
  return a;
}

function logout(){
  setAuth({ loggedIn:false, user:"A" });
  window.location.href = "index.html";
}

function setActiveNav(activeHref){
  document.querySelectorAll(".nav a, .mobile-links a").forEach(a=>{
    const href = a.getAttribute("href");
    if (href === activeHref) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function initUserSwitcher(){
  const sel = document.getElementById("userSwitch");
  if (!sel) return;
  const a = getAuth();
  sel.value = a.user || "A";
  sel.onchange = () => {
    const cur = getAuth();
    cur.user = sel.value;
    setAuth(cur);
    toast("User switched", `Now viewing as User ${cur.user}.`);
    if (typeof window.onUserChanged === "function") window.onUserChanged(cur.user);
  };
}

/* ========= Small helpers ========= */
function uid(prefix){
  return `${prefix}-${Math.random().toString(16).slice(2,8).toUpperCase()}${Date.now().toString(16).slice(-4).toUpperCase()}`;
}
function monthKey(dateIso){
  const d = new Date(dateIso);
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  return `${y}-${m}`;
}
function monthLabel(ym){
  const [y,m] = ym.split("-");
  const d = new Date(Number(y), Number(m)-1, 1);
  return d.toLocaleString(undefined, { month:"long", year:"numeric" });
}
