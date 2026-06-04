// ==========================================
// ZOOM ACESSÍVEL (Totalmente Funcional)
// ==========================================
// Definimos o tamanho base inicial em px do elemento raiz (HTML)
let tamanhoFonteAtual = 16; 

const btnAumentar = document.getElementById("btn-aumentar-zoom");
const btnDiminuir = document.getElementById("btn-diminuir-zoom");

// Função para aplicar o zoom alterando a raiz do documento
function aplicarZoom() {
    document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
}

// Evento para Aumentar o Texto (+2px por clique até o limite de 26px)
btnAumentar.addEventListener("click", function() {
    if (tamanhoFonteAtual < 26) { 
        tamanhoFonteAtual += 2;
        aplicarZoom();
    }
});

// Evento para Diminuir o Texto (-2px por clique até o limite de 12px)
btnDiminuir.addEventListener("click", function() {
    if (tamanhoFonteAtual > 12) { 
        tamanhoFonteAtual -= 2;
        aplicarZoom();
    }
});