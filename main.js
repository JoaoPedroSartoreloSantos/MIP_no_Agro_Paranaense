// Variáveis Globais de Estado do Sistema
let pontosSustentabilidade = 100;
let orcamentoFinanceiro = 5000;
let tamanhoFonteAtual = 16;

// Mapeamento dos Elementos do DOM (HTML)
const btnEntrar = document.getElementById("btn-entrar");
const txtNomeUsuario = document.getElementById("nome-usuario");
const lblBoasVindas = document.getElementById("boas-vindas");

const btnOpcaoA = document.getElementById("btn-opcao-a");
const btnOpcaoB = document.getElementById("btn-opcao-b");
const displayPontos = document.getElementById("status-sustentabilidade");
const displayOrcamento = document.getElementById("status-financeiro");
const feedbackResultado = document.getElementById("feedback-resultado");

const btnAumentarFonte = document.getElementById("btn-fonte-aumentar");
const btnDiminuirFonte = document.getElementById("btn-fonte-diminuir");

// Função para processar a identificação do usuário
btnEntrar.addEventListener("click", function() {
    const nome = txtNomeUsuario.value.trim();
    if(nome !== "") {
        // Armazena e exibe o nome de forma personalizada
        lblBoasVindas.innerText = `Olá, Engenheiro(a) Agrônomo(a) ${nome}! Painel operacional liberado.`;
        lblBoasVindas.style.display = "block";
    } else {
        alert("Por favor, insira seu nome para autenticar.");
    }
});

// Função para atualizar os dados visuais na tela
function atualizarInterface() {
    displayPontos.innerText = `Sustentabilidade: ${pontosSustentabilidade} pts`;
    displayOrcamento.innerText = `Orçamento: R$ ${orcamentoFinanceiro}`;
    
    if (pontosSustentabilidade < 60) {
        displayPontos.style.color = "#e74c3c"; // Alerta vermelho
    } else {
        displayPontos.style.color = "#2ecc71"; // Verde estável
    }
}

// Função para a Decisão A (Química tradicional pesada)
btnOpcaoA.addEventListener("click", function() {
    pontosSustentabilidade -= 40;
    orcamentoFinanceiro -= 1500;
    
    feedbackResultado.innerHTML = `
        <div style="background-color: #2c1a1a; padding: 15px; border-radius: 4px; border: 1px solid #e74c3c; margin-top: 15px;">
            <strong>Resultado Crítico:</strong> Alta eliminação de pragas, porém causou mortalidade de polinizadores (abelhas) e quebrou o equilíbrio ambiental em Cascavel. Custo alto.
        </div>
    `;
    encerrarRodada();
});

// Função para a Decisão B (MIP / Controle Biológico)
btnOpcaoB.addEventListener("click", function() {
    pontosSustentabilidade = Math.min(pontosSustentabilidade + 10, 100);
    orcamentoFinanceiro -= 400;
    
    feedbackResultado.innerHTML = `
        <div style="background-color: #1a2c1e; padding: 15px; border-radius: 4px; border: 1px solid #2ecc71; margin-top: 15px;">
            <strong>Resultado Excelente:</strong> A introdução de inimigos naturais conteve a infestação! O solo foi protegido e os custos foram severamente reduzidos.
        </div>
    `;
    encerrarRodada();
});

// Função para desabilitar interações pós-escolha
function encerrarRodada() {
    btnOpcaoA.disabled = true;
    btnOpcaoB.disabled = true;
    btnOpcaoA.style.opacity = "0.5";
    btnOpcaoB.style.opacity = "0.5";
    atualizarInterface();
}

// Funções de Acessibilidade (Alteração do tamanho da fonte via JS)
btnAumentarFonte.addEventListener("click", function() {
    tamanhoFonteAtual += 2;
    document.body.style.fontSize = tamanhoFonteAtual + "px";
});

btnDiminuirFonte.addEventListener("click", function() {
    if(tamanhoFonteAtual > 12) {
        tamanhoFonteAtual -= 2;
        document.body.style.fontSize = tamanhoFonteAtual + "px";
    }
});