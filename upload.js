import { supabase } from "./supabaseConfig.js";

// Função para verificar se o usuário está autenticado
async function checkAuth() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    // Redireciona para a página de login se não estiver autenticado
    window.location.href = "login.html";
  }
}

// Função para sair do sistema
async function logout() {
  try {
    console.log("Iniciando logout...");
    // Mostra o modal de logout
    const logoutModal = new bootstrap.Modal(document.getElementById("logoutModal"));
    logoutModal.show();

    // Espera 2 segundos para simular o logout
    setTimeout(async () => {
      await supabase.auth.signOut();
      alert("Você saiu do sistema!");
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    console.error("Erro ao sair:", error.message);
    alert("Erro ao sair do sistema. Tente novamente.");
  }
}

// Capturar clique no botão de logout
document.getElementById("logoutButton").addEventListener("click", () => {
  console.log("Botão de logout clicado");
  logout();
});


// Função para mostrar o spinner de carregamento
function showLoadingSpinner() {
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.add("active");
}

// Função para esconder o spinner de carregamento
function hideLoadingSpinner() {
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.remove("active");
}

// Função para fazer upload de arquivos
// export async function uploadFile() {
//   const fileInput = document.getElementById("fileInput");
//   const file = fileInput.files[0];

//   if (!file) {
//     alert("Selecione um arquivo!");
//     return;
//   }

//   showLoadingSpinner(); // Mostra o spinner de carregamento

//   try {
//     const { data, error } = await supabase.storage
//       .from("uploads")
//       .upload(`public/${file.name}`, file);

//     if (error) throw error;

//     // Exibe o modal de sucesso
//     const successModal = document.getElementById("successModal");
//     successModal.classList.add("active");





//     // Redireciona para a página de listagem
//     window.location.href = "listagem.html";
//   } catch (error) {
//     console.error("Erro no upload:", error.message);
//     alert("Erro no upload: " + error.message);
//   } finally {
//     hideLoadingSpinner(); // Esconde o spinner de carregamento
//   }
// }

export async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Selecione um arquivo!");
    return;
  }

  showLoadingSpinner(); // Mostra o spinner de carregamento

  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`public/${file.name}`, file);

    if (error) throw error;

    // Exibe o modal de sucesso
    const successModal = document.getElementById("successModal");
    successModal.classList.add("active");
  } catch (error) {
    console.error("Erro no upload:", error.message);
    alert("Erro no upload: " + error.message);
  } finally {
    hideLoadingSpinner(); // Esconde o spinner de carregamento
  }
}


function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
}


// Capturar clique no botão de logout
document.getElementById("logoutButton").addEventListener("click", () => {
  console.log("Botão de logout clicado");
  logout();
});

// Chama a verificação de autenticação ao carregar a página
window.addEventListener("load", checkAuth);

// Atribui as funções ao escopo global para serem chamadas no HTML
window.uploadFile = uploadFile;
window.logout = logout;
