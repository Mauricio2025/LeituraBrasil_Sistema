import { supabase } from "./supabaseConfig.js";

// Função para salvar anotações
export async function saveNote() {
  const noteInput = document.getElementById("noteInput").value;

  if (!noteInput) {
    alert("Escreva uma anotação!");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("notes")
      .insert([{ note: noteInput, timestamp: new Date() }]);

    if (error) throw error;

    alert("Anotação salva com sucesso!");
    document.getElementById("noteInput").value = ""; // Limpa o campo de texto
  } catch (error) {
    alert("Erro ao salvar anotação: " + error.message);
  }
}
