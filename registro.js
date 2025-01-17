import { supabase } from "./supabaseConfig.js";

const registerForm = document.getElementById("registerForm");
const successModal = new bootstrap.Modal(document.getElementById("successModal")); // Instância do modal

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // Registrar o usuário no Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw new Error("Erro ao registrar usuário: " + signUpError.message);

    // Inserir dados adicionais na tabela profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        name,
        email,
        password, // Armazena a senha diretamente (não recomendado)
      },
    ]);

    if (profileError) throw new Error("Erro ao criar perfil: " + profileError.message);

    // Exibir modal de sucesso
    successModal.show();

    // Redirecionar ao fechar o modal
    document.getElementById("goToLogin").addEventListener("click", () => {
      window.location.href = "login.html";
    });
  } catch (error) {
    console.error("Erro ao cadastrar:", error.message);
    alert("Erro ao cadastrar: " + error.message);
  }
});