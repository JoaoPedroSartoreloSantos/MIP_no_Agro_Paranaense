document.addEventListener("DOMContentLoaded", function() {
    
    // Pega a tag <html> que é a raiz do site
    const htmlRoot = document.documentElement; 
    let tamanhoFonteBase = 16; // Tamanho original em pixels

    const btnAumentar = document.getElementById("btn-aumentar-zoom");
    const btnDiminuir = document.getElementById("btn-diminuir-zoom");

    if (!btnAumentar || !btnDiminuir) {
        console.error("Erro: Botões de zoom não encontrados no HTML.");
        return;
    }

    // Evento para Aumentar
    btnAumentar.addEventListener("click", function() {
        if (tamanhoFonteBase < 26) { 
            tamanhoFonteBase += 2; // Aumenta 2px na raiz
            htmlRoot.style.fontSize = tamanhoFonteBase + "px";
        }
    });

    // Evento para Diminuir
    btnDiminuir.addEventListener("click", function() {
        if (tamanhoFonteBase > 12) { 
            tamanhoFonteBase -= 2; // Diminui 2px na raiz
            htmlRoot.style.fontSize = tamanhoFonteBase + "px";
        }
    });

});