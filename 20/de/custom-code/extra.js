// Verwijder de scroll indicator zodra het script geladen is
document.addEventListener("DOMContentLoaded", function() {
  var el = document.querySelector(".md-scroll-indicator");
  if (el) el.style.display = "none";
});
