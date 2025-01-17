import { supabase } from "./supabaseConfig.js";

export async function listFiles() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  try {
    // Lista arquivos do bucket "uploads" no caminho "public/"
    const { data, error } = await supabase.storage.from("uploads").list("public");

    if (error) {
      console.error("Erro ao listar arquivos:", error.message);
      alert("Erro ao listar arquivos: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      fileList.innerHTML = "<p class='text-center'>Nenhum arquivo encontrado.</p>";
      return;
    }

    // Adiciona os arquivos à lista
    data.forEach((file) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <a href="ler.html?file=${encodeURIComponent(file.name)}" class="text-decoration-none text-primary fw-bold">
              <i class="fas fa-file-alt me-2"></i>${file.name}
            </a>
        </div>

      `;

      fileList.appendChild(li);
    });
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const fileName = event.target.getAttribute("data-file");
        const confirmDelete = confirm(`Tem certeza de que deseja excluir o arquivo "${fileName}"?`);

        if (confirmDelete) {
          try {
            const { error } = await supabase.storage.from("uploads").remove([`public/${fileName}`]);

            if (error) {
              throw error;
            }

            alert("Arquivo excluído com sucesso.");
            listFiles(); // Atualiza a lista de arquivos após exclusão
          } catch (error) {
            console.error("Erro ao excluir arquivo:", error.message);
            alert("Erro ao excluir arquivo: " + error.message);
          }
        }
      });
    });
  } catch (error) {
    console.error("Erro inesperado ao listar arquivos:", error.message);
    alert("Erro inesperado ao listar arquivos: " + error.message);
  }
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  listFiles();
});
