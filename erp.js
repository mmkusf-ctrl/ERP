/* Shared ERP Utilities */

// Mobile Navigation
function openMobileNav() {
  const m = document.getElementById("mobileNav");
  if (m) m.classList.add("open");
}
function closeMobileNav() {
  const m = document.getElementById("mobileNav");
  if (m) m.classList.remove("open");
}

document.addEventListener("click", (e) => {
  const m = document.getElementById("mobileNav");
  if (!m) return;
  // Close if clicking the backdrop (not the drawer itself)
  if (m.classList.contains("open") && e.target === m) closeMobileNav();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileNav();
});

// Toast Notifications
function toast(title, msg) {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return alert(`${title}\n\n${msg}`);

  const el = document.createElement("div");
  // Simple card style for toast
  el.className = "card";
  el.style.padding = "16px";
  el.style.minWidth = "300px";
  el.style.boxShadow = "var(--shadow-lg)";
  el.style.background = "var(--bg-surface)";
  el.style.display = "flex";
  el.style.gap = "12px";
  el.style.animation = "fadeUp 0.3s ease-out";
  el.style.borderLeft = "4px solid var(--primary)";

  el.innerHTML = `
    <div style="flex:1;">
      <div style="font-weight:700; font-size:14px; margin-bottom:4px;">${escapeHtml(title)}</div>
      <div style="color:var(--text-muted); font-size:13px; line-height:1.4;">${escapeHtml(msg)}</div>
    </div>
    <button class="toast-close" style="border:none; bg:transparent; cursor:pointer; font-size:18px; color:var(--text-muted);">&times;</button>
  `;

  el.querySelector(".toast-close").onclick = () => el.remove();
  wrap.prepend(el);

  // Auto remove
  setTimeout(() => {
    if (el.isConnected) {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      setTimeout(() => el.remove(), 300);
    }
  }, 5000);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* --- Mobile Injector --- */
(function () {
  // Only inject on small screens
  if (window.innerWidth <= 768) {
    // Check if already exists
    if (document.querySelector('.bottom-nav')) return;

    const nav = document.createElement("nav");
    nav.className = "bottom-nav";

    const path = window.location.pathname;
    const isHome = path.includes('dashboard') || path.endsWith('/');
    const isItems = path.includes('item_');
    const isCRM = path.includes('crm');
    const isOrders = path.includes('orders');

    nav.innerHTML = `
        <a href="dashboard.html" class="bottom-nav-item ${isHome ? 'active' : ''}">
            <span>🏠</span>
            Overview
        </a>
        <a href="item_master.html" class="bottom-nav-item ${isItems ? 'active' : ''}">
            <span>📦</span>
            Items
        </a>
        <a href="orders.html" class="bottom-nav-item ${isOrders ? 'active' : ''}">
            <span>📄</span>
            Orders
        </a>
        <a href="crm.html" class="bottom-nav-item ${isCRM ? 'active' : ''}">
            <span>👥</span>
            CRM
        </a>
        <a href="javascript:void(0)" class="bottom-nav-item" onclick="openMobileNav()">
            <span>☰</span>
            Menu
        </a>
     `;
    document.body.appendChild(nav);
  }
})();
