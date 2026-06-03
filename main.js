// --- 1. CONTROLE DE ZOOM GERAL ---
let zoomNivel = 1;

document.getElementById('btn-zoom-in').addEventListener('click', function() {
    zoomNivel += 0.1;
    document.body.style.zoom = zoomNivel;
});

document.getElementById('btn-zoom-out').addEventListener('click', function() {
    if(zoomNivel > 0.5) { // Limite mínimo para não sumir a tela
        zoomNivel -= 0.1;
        document.body.style.zoom = zoomNivel;
    }
});

document.getElementById('btn-zoom-reset').addEventListener('click', function() {
    zoomNivel = 1;
    document.body.style.zoom = zoomNivel;
});

// --- 2. LEITOR DE TELA (Text-to-Speech) ---
let isLendo = false;
const btnLer = document.getElementById('btn-ler-pagina');
const sinteseFala = window.speechSynthesis;

btnLer.addEventListener('click', function() {
    if (isLendo) {
        // Se estiver lendo, para a leitura
        sinteseFala.cancel();
        isLendo = false;
        btnLer.innerText = "🔊 Ler Texto";
        btnLer.style.backgroundColor = "var(--verde-principal)";
    } else {
        // Pega todo o texto legível da tag main
        const textoParaLer = document.getElementById('conteudo-dinamico').innerText;
        const utterance = new SpeechSynthesisUtterance(textoParaLer);
        
        // Configura para português do Brasil
        utterance.lang = 'pt-BR';
        
        sinteseFala.speak(utterance);
        isLendo = true;
        btnLer.innerText = "🔇 Parar Leitura";
        btnLer.style.backgroundColor = "var(--vermelho-alerta)"; // Um feedback visual
        
        // Quando terminar de ler sozinho, reseta o botão
        utterance.onend = function() {
            isLendo = false;
            btnLer.innerText = "🔊 Ler Texto";
            btnLer.style.backgroundColor = "var(--verde-principal)";
        };
    }
});

// --- 3. NAVEGAÇÃO ENTRE AS 4 PÁGINAS (Dropdown) ---
function mudarPagina(idPagina) {
    // Esconde todas as seções
    document.getElementById('pag-1').className = 'pagina-oculta';
    document.getElementById('pag-2').className = 'pagina-oculta';
    document.getElementById('pag-3').className = 'pagina-oculta';
    document.getElementById('pag-4').className = 'pagina-oculta';

    // Mostra a selecionada
    document.getElementById(idPagina).className = 'pagina-ativa';
}

// --- 4. SIMULADOR DE CUSTOS (Módulo 3) ---
function calcularCustos() {
    const hectares = document.getElementById('hectares').value;
    const metodo = document.getElementById('metodo').value;
    const divResultado = document.getElementById('resultado-simulador');

    if (!hectares || hectares <= 0) {
        divResultado.innerText = "Por favor, insira um número válido de hectares.";
        return;
    }

    let custoPorHectare = 0;
    let mensagemDica = "";

    if (metodo === "quimico") {
        custoPorHectare = 450; // Valor fictício para química convencional
        mensagemDica = "Atenção: Embora eficiente a curto prazo, o uso contínuo pode degradar o solo e gerar resistência nas pragas, exigindo doses maiores no futuro.";
    } else if (metodo === "biologico") {
        custoPorHectare = 280; // Valor fictício menor para controle biológico
        mensagemDica = "Excelente escolha! O Controle Biológico (MIP) protege a biodiversidade local (abelhas e lençóis freáticos) e reduz o custo da sua lavoura ao longo do tempo.";
    }

    const custoTotal = hectares * custoPorHectare;

    // Formatação de moeda BRL
    const valorFormatado = custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    divResultado.innerHTML = `
        <p>Custo estimado para proteger ${hectares} hectares: <strong>${valorFormatado}</strong></p>
        <p style="margin-top: 10px; font-weight: normal;"><em>${mensagemDica}</em></p>
    `;
}