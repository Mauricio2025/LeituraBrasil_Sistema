import { supabase } from "./supabaseConfig.js";

// Função para fazer upload de arquivos
export async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Selecione um arquivo!");
    return;
  }

  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`public/${file.name}`, file);

    if (error) throw error;

    alert("Upload concluído!");
    await listFiles(); // Atualiza a lista de arquivos
  } catch (error) {
    alert("Erro no upload: " + error.message);
  }
}

// Função para listar arquivos
export async function listFiles() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  try {
    const { data, error } = await supabase.storage.from("uploads").list("public");

    if (error) throw error;

    if (!data || data.length === 0) {
      fileList.innerHTML = "<p class='text-center'>Nenhum arquivo encontrado.</p>";
      return;
    }

    data.forEach((file) => {
      if (file.name.endsWith(".pdf")) { // Filtra apenas PDFs
        const { publicUrl } = supabase.storage
          .from("uploads")
          .getPublicUrl(`public/${file.name}`);

        if (!publicUrl) {
          console.error(`Erro ao gerar URL para o arquivo: ${file.name}`);
          return;
        }

        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
          <a href="${publicUrl}" target="_blank" class="d-block mb-2">${file.name}</a>
          <iframe src="${publicUrl}" style="width:100%; height:150px; border:1px solid #ddd;"></iframe>
        `;

        fileList.appendChild(li);
      }
    });
  } catch (error) {
    alert("Erro ao listar arquivos: " + error.message);
  }
}
