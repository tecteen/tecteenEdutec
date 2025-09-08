const form = document.getElementById('comentarioForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Comentário enviado com sucesso!");
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
