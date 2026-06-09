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
<script>
    document.addEventListener("DOMContentLoaded", function() {
        // ... (Seu código de zoom que já está aí em cima) ...

        // LÓGICA DO MENU HAMBÚRGUER
        const btnMenuMobile = document.getElementById("btn-menu-mobile");
        const menuLinks = document.getElementById("menu-links");
        const textoMenu = document.getElementById("texto-menu");
        const iconeMenu = document.getElementById("icone-menu");

        if (btnMenuMobile && menuLinks) {
            btnMenuMobile.addEventListener("click", function() {
                // Adiciona ou tira a classe 'ativo' que mostra/esconde o menu
                menuLinks.classList.toggle("ativo");
                
                // Verifica se o menu está aberto ou fechado para mudar o texto
                if (menuLinks.classList.contains("ativo")) {
                    textoMenu.textContent = "Fechar menu";
                    iconeMenu.textContent = "✕"; // Troca os tracinhos por um X
                } else {
                    textoMenu.textContent = "Abrir menu";
                    iconeMenu.textContent = "☰"; // Volta para os tracinhos
                }
            });
        }
    });
</script>