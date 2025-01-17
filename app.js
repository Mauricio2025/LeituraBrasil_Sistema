import { uploadFile, listFiles } from "./fileHandler.js";
import { saveNote } from "./noteHandler.js";

// Inicializa a lista de arquivos ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  listFiles();
});

// Atribui funções aos botões
window.uploadFile = uploadFile;
window.saveNote = saveNote;
