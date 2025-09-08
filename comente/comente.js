const form = document.getElementById('comentarioForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  mostrarPopup(); 
  form.reset();
});

function fecharFormulario() {
  document.getElementById('comentarioBox').style.display = 'none';
}

function mostrarPopup() {
  document.getElementById("popupSucesso").classList.remove("hidden");
}

function fecharPopup() {
  document.getElementById("popupSucesso").classList.add("hidden");
}


  function voltarRadar() {
    window.location.href = "../radar%20social/radarsocial.html";
  }


