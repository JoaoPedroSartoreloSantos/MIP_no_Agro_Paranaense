// ==========================================
// 1. SISTEMA DE ZOOM ACESSÍVEL (Corrigido)
// ==========================================
// Em vez de usar CSS "zoom" que falha em alguns navegadores,
// mudamos o tamanho da fonte raiz do site (em pixels).
let tamanhoFonteBase = 16; 

document.getElementById('btn-zoom-in').addEventListener('click', function() {
    if(tamanhoFonteBase < 24) { // Limite máximo
        tamanhoFonteBase += 2;
        document.documentElement.style.fontSize = tamanhoFonteBase + 'px';
    }
});

document.getElementById('btn-zoom-out').addEventListener('click', function() {
    if(tamanhoFonteBase > 12) { // Limite mínimo
        tamanhoFonteBase -= 2;
        document.documentElement.style.fontSize = tamanhoFonteBase + 'px';
    }
});

document.getElementById('btn-zoom-reset').addEventListener('click', function() {
    tamanhoFonteBase = 16;
    document.documentElement.style.fontSize = tamanhoFonteBase + 'px';
});

// ==========================================
// 2. LEITOR DE TELA (TTS) (Corrigido)
// ==========================================
let isLendo = false;
const btnLer = document.getElementById('btn-ler-pagina');
const sinteseFala = window.speechSynthesis;

btnLer.addEventListener('click', function() {
    // Se o navegador não suportar voz
    if (!('speechSynthesis' in window)) {
        alert("Desculpe, seu navegador não suporta leitura de voz.");
        return;
    }

    if (isLendo) {
        // Para a leitura imediatamente
        sinteseFala.cancel();
        isLendo = false;
        btnLer.innerText = "🔊 Ouvir Site";
        btnLer.style.backgroundColor = "var(--verde-principal)";
    } else {
        // Pega apenas o texto da página que está visível na tela!
        const paginaVisivel = document.querySelector('.pagina-ativa');
        const textoParaLer = paginaVisivel.innerText || paginaVisivel.textContent;
        
        if (textoParaLer.trim() === "") return;

        const utterance = new SpeechSynthesisUtterance(textoParaLer);
        utterance.lang = 'pt-BR'; // Força sotaque brasileiro
        utterance.rate = 1.0;     // Velocidade normal
        
        sinteseFala.speak(utterance);
        isLendo = true;
        btnLer.innerText = "🔇 Parar Leitura";
        btnLer.style.backgroundColor = "red"; // Fica vermelho pra chamar atenção
        
        // Quando terminar de ler sozinho, reseta o botão
        utterance.onend = function() {
            isLendo = false;
            btnLer.innerText = "🔊 Ouvir Site";
            btnLer.style.backgroundColor = "var(--verde-principal)";
        };
    }
});

// ==========================================
// 3. NAVEGAÇÃO ENTRE AS PÁGINAS (Corrigido)
// ==========================================
function mudarPagina(idPagina) {
    // Esconde todas as 4 seções
    document.getElementById('pag-1').className = 'pagina-oculta';
    document.getElementById('pag-2').className = 'pagina-oculta';
    document.getElementById('pag-3').className = 'pagina-oculta';
    document.getElementById('pag-4').className = 'pagina-oculta';

    // Mostra apenas a que o usuário clicou
    document.getElementById(idPagina).className = 'pagina-ativa';

    // Para a voz automaticamente se o usuário trocar de página no meio da leitura
    if(isLendo) {
        sinteseFala.cancel();
        isLendo = false;
        btnLer.innerText = "🔊 Ouvir Site";
        btnLer.style.backgroundColor = "var(--verde-principal)";
    }
}

// ==========================================
// 4. SIMULADOR DE CUSTOS E PROTEÇÃO
// ==========================================
function calcularCustos() {
    const hectares = document.getElementById('hectares').value;
    const metodo = document.getElementById('metodo').value;
    const divResultado = document.getElementById('resultado-simulador');

    if (!hectares || hectares <= 0) {
        divResultado.innerHTML = "<span style='color: red;'>Por favor, digite um número válido de hectares.</span>";
        return;
    }

    let custoPorHectare = 0;
    let mensagemImpacto = "";
    let corFundo = "";

    if (metodo === "quimico") {
        custoPorHectare = 450; 
        corFundo = "#ffdddd"; // Vermelho claro
        mensagemImpacto = "<strong>Alerta:</strong> O uso químico convencional resolve rapidamente, mas pode impactar abelhas e nascentes d'água. Uso contínuo gera resistência nas pragas.";
    } else if (metodo === "biologico") {
        cust