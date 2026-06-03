// Garantir execução segura após carregamento da página
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. SISTEMA SPA: MUDANÇA DE TEXTO EM BAIXO DO MENU
    // ==========================================
    window.mudarAba = function(idAlvo, evento) {
        if(evento) evento.preventDefault(); // Evita salto de página ou recarregamento
        
        // Seleciona todas as seções de conteúdo do site
        const todasSecoes = document.querySelectorAll('.secao-conteudo');
        
        // Oculta absolutamente todas as seções
        todasSecoes.forEach(function(secao) {
            secao.classList.remove('ativa');
            secao.classList.add('oculta');
        });
        
        // Exibe apenas a seção alvo do clique
        const secaoAlvo = document.getElementById(idAlvo);
        if(secaoAlvo) {
            secaoAlvo.classList.remove('oculta');
            secaoAlvo.classList.add('ativa');
        }

        // Fecha o dropdown de 3 pontinhos automaticamente ao clicar
        document.getElementById("dropdown-modulos").style.display = "none";

        // Se a voz estiver ativa ao mudar de aba, desliga para não confundir o usuário
        if (estaLendo) {
            pararVoz();
        }
    };

    // Função auxiliar para ligar/desligar o menu dos 3 pontinhos
    window.toggleDropdown = function() {
        const dropdown = document.getElementById("dropdown-modulos");
        if(dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    };

    // Fecha o menu de 3 pontinhos se clicar fora dele
    window.onclick = function(event) {
        if (!event.target.matches('.botao-3pontinhos')) {
            const dropdowns = document.getElementsByClassName("conteudo-dropdown");
            for (let i = 0; i < dropdowns.length; i++) {
                dropdowns[i].style.display = "none";
            }
        }
    };


    // ==========================================
    // 2. SISTEMA DE ZOOM DA PÁGINA INTEIRA CORRIGIDO
    // ==========================================
    let escalaZoomGlobal = 1.0;

    document.getElementById("btn-aumentar-zoom").addEventListener("click", function() {
        if (escalaZoomGlobal < 1.5) {
            escalaZoomGlobal += 0.1;
            document.body.style.transform = `scale(${escalaZoomGlobal})`;
            document.body.style.width = (100 / escalaZoomGlobal) + "%";
        }
    });

    document.getElementById("btn-diminuir-zoom").addEventListener("click", function() {
        if (escalaZoomGlobal > 0.7) {
            escalaZoomGlobal -= 0.1;
            document.body.style.transform = `scale(${escalaZoomGlobal})`;
            document.body.style.width = (100 / escalaZoomGlobal) + "%";
        }
    });

    document.getElementById("btn-resetar-zoom").addEventListener("click", function() {
        escalaZoomGlobal = 1.0;
        document.body.style.transform = `scale(1.0)`;
        document.body.style.width = "100%";
    });


    // ==========================================
    // 3. LEITOR DE TELA (VOZ) CORRIGIDO
    // ==========================================
    let estaLendo = false;
    const btnVoz = document.getElementById("btn-fala");
    const motorVoz = window.speechSynthesis;

    btnVoz.addEventListener("click", function() {
        if