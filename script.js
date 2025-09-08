document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnScroll").addEventListener("click", function() {
    document.getElementById("destino").scrollIntoView({ behavior: "smooth" });
  });
});
