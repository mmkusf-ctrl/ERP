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
