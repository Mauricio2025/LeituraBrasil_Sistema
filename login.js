import { supabase } from "./supabaseConfig.js";

// Exibir o spinner ao carregar a página
window.addEventListener("load", () => {
  showSpinner();
  setTimeout(() => {
    hideSpinner();
  }, 3000); // 3 segundos
});

const loginForm = document.getElementById("loginForm");
const successModal = new bootstrap.Modal(document.getElementById("successModal")); // Instância do modal

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    showSpinner();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    hideSpinner();

    if (error) {
      console.error("Erro ao fazer login:", error.message);
      showModal("errorModal", `Erro: ${error.message}`);
    } else {
      const userName = data.user?.user_metadata?.name || "usuário"; // Recupere o nome do usuário ou use um fallback
      const welcomeMessage = `Bem-vindo à plataforma, ${userName}!`;

      // Atualizar o texto do modal
      document.getElementById("successModalLabel").textContent = "Login Bem-Sucedido";
      document.querySelector("#successModal .modal-body p").textContent = welcomeMessage;

      // Exibir modal de sucesso
      successModal.show();

      // Limpar os campos do formulário após o login bem-sucedido
      loginForm.reset();

      // Redirecionar ao fechar o modal
      document.getElementById("goToDashboard").addEventListener("click", () => {
        window.location.href = "./upload.html";
      });
    }
  } catch (err) {
    console.error("Erro inesperado:", err);
    hideSpinner();
    showModal("errorModal", "Ocorreu um erro inesperado. Tente novamente.");
  }
});

function showModal(modalId, message = "") {
  const modal = document.getElementById(modalId);
  if (message) {
    modal.querySelector("p").textContent = message;
  }
  modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
}

function showSpinner() {
  document.getElementById("loadingSpinner").style.display = "flex";
}

function hideSpinner() {
  document.getElementById("loadingSpinner").style.display = "none";
}
