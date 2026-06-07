// Aguarda todo o site carregar antes de ativar os botões
document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // ZOOM REAL DA PÁGINA
    // ==========================================
    let nivelZoom = 1; // 1 significa 100% (tamanho normal)

    const btnAumentar = document.getElementById("btn-aumentar-zoom");
    const btnDiminuir = document.getElementById("btn-diminuir-zoom");

    // Trava de segurança: Verifica se os botões realmente existem no HTML
    if (!btnAumentar || !btnDiminuir) {
        console.error("ERRO: Os botões de zoom não foram encontrados pelo JavaScript!");
        return; // Para o código aqui se der erro
    }

    // Evento para Aumentar o Zoom
    btnAumentar.addEventListener("click", function() {
        console.log("Botão Zoom + foi clicado!"); // Emite um aviso no console
        if (nivelZoom < 1.5) { 
            nivelZoom += 0.1; 
            aplicarZoom();
        }
    });

    // Evento para Diminuir o Zoom
    btnDiminuir.addEventListener("click", function() {
        console.log("Botão Zoom - foi clicado!"); // Emite um aviso no console
        if (nivelZoom > 0.8) { 
            nivelZoom -= 0.1; 
            aplicarZoom();
        }
    });

    // Função que aplica o zoom visualmente
    function aplicarZoom() {
        console.log("Aplicando nível de zoom: " + nivelZoom);
        
        // Aplica o zoom nativo (Chrome, Edge, Safari)
        document.body.style.zoom = nivelZoom;
        
        // Suporte extra para Firefox
        document.body.style.MozTransform = `scale(${nivelZoom})`;
        document.body.style.MozTransformOrigin = "top center";
    }

});