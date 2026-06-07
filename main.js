// Aguarda todo o site carregar antes de ativar os botões
document.addEventListener("DOMContentLoaded", function() {
    // ==========================================
    let nivelZoom = 1; // 1 significa 100% (tamanho normal)

    const btnAumentar = document.getElementById("btn-aumentar-zoom");
    const btnDiminuir = document.getElementById("btn-diminuir-zoom");

    // Evento para Aumentar o Zoom (até o limite de 150%)
    btnAumentar.addEventListener("click", function() {
        if (nivelZoom < 1.5) { 
            nivelZoom += 0.1; // Aumenta 10% a cada clique
            aplicarZoom();
        }
    });

    // Evento para Diminuir o Zoom (até o limite de 80%)
    btnDiminuir.addEventListener("click", function() {
        if (nivelZoom > 0.8) { 
            nivelZoom -= 0.1; // Diminui 10% a cada clique
            aplicarZoom();
        }
    });

    // Função que aplica o zoom de forma compatível
    function aplicarZoom() {
        // Aplica o zoom nativo
        document.body.style.zoom = nivelZoom;
        
        // Suporte extra para navegadores mais antigos ou Firefox
        document.body.style.MozTransform = `scale(${nivelZoom})`;
        document.body.style.MozTransformOrigin = "top center";
    }

});