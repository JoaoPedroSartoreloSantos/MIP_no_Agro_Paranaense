document.addEventListener("DOMContentLoaded", function() {
    

    const htmlRoot = document.documentElement; 
    let tamanhoFonteBase = 16;

    const btnAumentar = document.getElementById("btn-aumentar-zoom");
    const btnDiminuir = document.getElementById("btn-diminuir-zoom");

    if (!btnAumentar || !btnDiminuir) {
        console.error("Erro: Botões de zoom não encontrados no HTML.");
        return;
    }

  
    btnAumentar.addEventListener("click", function() {
        if (tamanhoFonteBase < 26) { 
            tamanhoFonteBase += 2; 
            htmlRoot.style.fontSize = tamanhoFonteBase + "px";
        }
    });

    
    btnDiminuir.addEventListener("click", function() {
        if (tamanhoFonteBase > 12) { 
            tamanhoFonteBase -= 2;  
            htmlRoot.style.fontSize = tamanhoFonteBase + "px";
        }
    });

});
