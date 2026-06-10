
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const htmlRoot = document.documentElement; 
            let tamanhoFonteBase = 16;

            const btnAumentar = document.getElementById("btn-aumentar-zoom");
            const btnDiminuir = document.getElementById("btn-diminuir-zoom");

            // Lógica do Zoom
            if (btnAumentar && btnDiminuir) {
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
            }
            
            // Lógica do Menu Hambúrguer
            const btnMenuMobile = document.getElementById("btn-menu-mobile");
            const menuLinks = document.getElementById("menu-links");
            const textoMenu = document.getElementById("texto-menu");
            const iconeMenu = document.getElementById("icone-menu");

            if (btnMenuMobile && menuLinks) {
                btnMenuMobile.addEventListener("click", function() {
                    menuLinks.classList.toggle("ativo");
                    
                    if (menuLinks.classList.contains("ativo")) {
                        textoMenu.textContent = "Fechar menu";
                        iconeMenu.textContent = "✕"; 
                    } else {
                        textoMenu.textContent = "Abrir menu";
                        iconeMenu.textContent = "☰"; 
                    }
                });
            }
        });
    </script>