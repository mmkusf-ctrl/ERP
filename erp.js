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

// Toast Notifications (Enhanced)
function toast(title, msg, type = 'info') {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return alert(`${title}\n\n${msg}`);

  let borderColor = "var(--primary)";
  if (type === 'success') borderColor = "var(--success)";
  if (type === 'error') borderColor = "var(--danger)";

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
  el.style.borderLeft = `4px solid ${borderColor}`;

  el.innerHTML = `
    <div style="flex:1;">
      <div style="font-weight:700; font-size:14px; margin-bottom:4px;">${escapeHtml(title)}</div>
      <div style="color:var(--text-muted); font-size:13px; line-height:1.4;">${escapeHtml(msg)}</div>
    </div>
    <button class="toast-close" style="border:none; background:transparent; cursor:pointer; font-size:18px; color:var(--text-muted);">&times;</button>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span style="font-size:10px; margin-top:2px;">Overview</span>
        </a>
        <a href="item_master.html" class="bottom-nav-item ${isItems ? 'active' : ''}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <span style="font-size:10px; margin-top:2px;">Items</span>
        </a>
        <a href="orders.html" class="bottom-nav-item ${isOrders ? 'active' : ''}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span style="font-size:10px; margin-top:2px;">Orders</span>
        </a>
        <a href="crm.html" class="bottom-nav-item ${isCRM ? 'active' : ''}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span style="font-size:10px; margin-top:2px;">CRM</span>
        </a>
        <a href="javascript:void(0)" class="bottom-nav-item" onclick="openMobileNav()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <span style="font-size:10px; margin-top:2px;">Menu</span>
        </a>
     `;
    document.body.appendChild(nav);
  }
  /* --- Dynamic UI: Animations & Skeletons --- */
  function animatePageElements() {
    // Animate Cards
    document.querySelectorAll('.card, .card-kpi').forEach((el, i) => {
      el.classList.add('animate-enter');
      // Stagger delay based on index (cap at 10 to avoid long waits)
      if (i < 10) el.classList.add(`stagger-${Math.min(i + 1, 5)}`);
    });

    // Animate Table Rows
    document.querySelectorAll('tbody tr').forEach((el, i) => {
      el.classList.add('animate-enter');
      if (i < 10) el.classList.add(`stagger-${Math.min(i + 1, 5)}`);
    });
  }

  // Simple Skeleton Render
  function renderSkeletonRows(count = 5, cols = 4) {
    let html = "";
    for (let i = 0; i < count; i++) {
      let tds = "";
      for (let j = 0; j < cols; j++) {
        tds += `<td><div class="skeleton" style="height:20px; width:${Math.floor(Math.random() * 50 + 50)}%;"></div></td>`;
      }
      html += `<tr>${tds}</tr>`;
    }
    return html;
  }

  // Auto-run animations on load
  document.addEventListener("DOMContentLoaded", () => {
    // Small delay to ensure render happens first if sync
    setTimeout(animatePageElements, 50);
    initPullToRefresh();
    injectResponsiveTableLabels();
    initKeyboardShortcuts();
  });

  /* --- Enhancements --- */

  // 1. Auto-Inject Data Labels for Mobile Tables
  function injectResponsiveTableLabels() {
    document.querySelectorAll('.table-container table').forEach(table => {
      const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
      table.querySelectorAll('tbody tr').forEach(tr => {
        tr.querySelectorAll('td').forEach((td, index) => {
          if (headers[index] && !td.getAttribute('data-label')) {
            td.setAttribute('data-label', headers[index]);
          }
        });
      });
    });
  }

  // 2. Global Shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const action = prompt("Quick Action (nav, search, task):");
        if (action) toast("Action Pending", "Search/Command feature coming soon: " + action);
      }
    });
  }

  // 3. Ripples (Existing)
  function initRipples() {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.btn, .bottom-nav-item, .clickable-kpi');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${x - radius}px`;
      circle.style.top = `${y - radius}px`;
      circle.classList.add('ripple');

      // Remove existing ripple to prevent buildup
      const existing = target.getElementsByClassName('ripple')[0];
      if (existing) existing.remove();

      target.appendChild(circle);
    });
  }

  // 4. Pull to Refresh (Existing)
  function initPullToRefresh() {
    if (window.innerWidth > 768) return; // Mobile only via Touch events usually

    let startY = 0;
    let ptr = document.createElement('div');
    ptr.className = 'ptr-element';
    ptr.innerHTML = `<div class="ptr-icon">⬇️</div>`;
    document.body.prepend(ptr);

    let isPulling = false;

    window.addEventListener('touchstart', e => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isPulling) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      if (diff > 0 && window.scrollY === 0) {
        // Visualize pull
        ptr.style.height = `${Math.min(diff / 2, 80)}px`;
        ptr.querySelector('.ptr-icon').style.transform = `rotate(${Math.min(diff, 180)}deg)`;
      }
    }, { passive: true });

    window.addEventListener('touchend', e => {
      if (!isPulling) return;
      isPulling = false;
      if (parseInt(ptr.style.height) > 60) {
        // Trigger Refresh
        ptr.style.height = '60px';
        ptr.innerHTML = `<div class="ptr-loading">↻</div><div style="font-size:12px; margin-left:8px;">Refreshing...</div>`;
        setTimeout(() => {
          location.reload();
        }, 800);
      } else {
        ptr.style.height = '0px';
      }
    }, { passive: true });
  }

})();

// Global Utilities (Exposed)
window.formatMoney = (val) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
};

window.formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};

/* --- Live System Simulation --- */
function startLiveSimulation() {
  // Only run if we are on the dashboard or have KPIs
  const revenueNode = document.getElementById('kpi-revenue-val');
  const orderNode = document.getElementById('kpi-orders-val');

  // 1. Random Toasts (Every 15-45 seconds)
  function scheduleNextToast() {
    const delay = Math.random() * 30000 + 15000;
    setTimeout(() => {
      const events = [
        { title: "New Order", msg: "Order #PO-" + Math.floor(Math.random() * 9000 + 1000) + " received from online store.", type: "success" },
        { title: "Inventory Alert", msg: "Low stock warning for Item SK-" + Math.floor(Math.random() * 500), type: "error" },
        { title: "Payment Received", msg: "Payment of " + formatMoney(Math.random() * 500 + 50) + " processed.", type: "success" },
        { title: "System Info", msg: "Data sync completed successfully.", type: "info" }
      ];
      const event = events[Math.floor(Math.random() * events.length)];
      toast(event.title, event.msg, event.type);
      scheduleNextToast();
    }, delay);
  }

  // 2. Real-time KPI Ticks
  if (revenueNode && orderNode) {
    setInterval(() => {
      // 30% chance to update revenue
      if (Math.random() > 0.7) {
        let currentRev = parseFloat(revenueNode.innerText.replace(/[^0-9.-]+/g, "")) || 0;
        currentRev += Math.random() * 200;
        revenueNode.innerText = formatMoney(currentRev);
        // Flash effect
        revenueNode.style.color = "var(--success)";
        setTimeout(() => revenueNode.style.color = "", 500);
      }
      // 20% chance to update orders
      if (Math.random() > 0.8) {
        let currentOrders = parseInt(orderNode.innerText) || 0;
        orderNode.innerText = currentOrders + 1;
      }
    }, 5000);
  }

  scheduleNextToast();
}

// Start simulation on load
document.addEventListener("DOMContentLoaded", () => {
  // Slight delay to not interfere with init
  setTimeout(startLiveSimulation, 2000);
});
