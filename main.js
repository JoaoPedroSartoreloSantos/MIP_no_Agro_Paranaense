// ==========================================
// 1. MENU DE 3 PONTINHOS (Dropdown Seguro)
// ==========================================
const btnModulos = document.getElementById("btn-modulos");
const dropdownModulos = document.getElementById("dropdown-modulos");

// Ao clicar no botão, ele adiciona ou remove a classe 'show'
btnModulos.addEventListener("click", function(event) {
    event.stopPropagation(); // Impede que o clique feche o menu imediatamente
    dropdownModulos.classList.toggle("show");
});

// Fechar o menu se o usuário clicar em qualquer outro lugar da tela
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        if (dropdownModulos.classList.contains('show')) {
            dropdownModulos.classList.remove('show');
        }
    }
};

// ==========================================
// 2. ZOOM ACESSÍVEL (Alterando a fonte raiz)
// ==========================================
let tamanhoFonte = 16; 

document.getElementById("btn-aumentar-zoom").addEventListener("click", function() {
    if (tamanhoFonte < 26) { // Limite máximo
        tamanhoFonte += 2;
        document.documentElement.style.fontSize = tamanhoFonte + "px";
    }
});

document.getElementById("btn-diminuir-zoom").addEventListener("click", function() {
    if (tamanhoFonte > 12) { // Limite mínimo
        tamanhoFonte -= 2;
        document.documentElement.style.fontSize = tamanhoFonte + "px";
    }
});

document.getElementById("btn-resetar-zoom").addEventListener("click", function() {
    tamanhoFonte = 16;
    document.documentElement.style.fontSize = tamanhoFonte + "px";
});

// ==========================================
// 3. LEITOR DE VOZ (Lendo todo o conteúdo principal)
// ==========================================
let isLendo = false;
const btnVoz = document.getElementById("btn-fala");
const sintese = window.speechSynthesis;

btnVoz.addEventListener("click", function() {
    if (isLendo) {
        sintese.cancel();
        isLendo = false;
        btnVoz.innerText = "🔊 Ouvir Site";
        btnVoz.style.backgroundColor = "#2c3e50";
    } else {
        // Pega todo o texto de dentro da tag <main>
        const textoSite = document.querySelector(".conteudo-principal").innerText;
        const mensagem = new SpeechSynthesisUtterance(textoSite);
        
        mensagem.lang = "pt-BR";
        
        mensagem.onend = function() {
            isLendo = false;
            btnVoz.innerText = "🔊 Ouvir Site";
            btnVoz.style.backgroundColor = "#2c3e50";
        };

        sintese.speak(mensagem);
        isLendo = true;
        btnVoz.innerText = "🛑 Parar Leitura";
        btnVoz.style.backgroundColor = "#c0392b"; // Fica vermelho
    }
});

// ==========================================
// 4. SIMULADOR DE CUSTOS
// ==========================================
document.getElementById("btn-calcular").addEventListener("click", function() {
    const area = parseFloat(document.getElementById("campo-area").value);
    const unidade = document.getElementById("campo-unidade").value;
    const estrategia = document.getElementById("campo-estrategia").value;
    const resultado = document.getElementById("painel-resultado-simulador");

    if (isNaN(area) || area <= 0) {
        resultado.innerHTML = "<span style='color:red;'>Erro: Insira uma área válida.</span>";
        return;
    }

    let multiplicador = 1; 
    if (unidade === "metro") multiplicador = 0.05; 
    if (unidade === "km") multiplicador = 100;    
    if (unidade === "hectare") multiplicador = 1.5; 

    let preco = (estrategia === "quimico") ? 380 : 190;
    let total = area * preco * multiplicador;

    let totalEmReais = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (estrategia === "quimico") {
        resultado.style.backgroundColor = "#fadbd8";
        resultado.style.color = "#78281f";
        resultado.innerHTML = `Gasto estimado: <strong>${totalEmReais}</strong>.<br><small>O químico é caro. Com bioinsumos, você economizaria metade do valor!</small>`;
    } else {
        resultado.style.backgroundColor = "#d4efdf";
        resultado.style.color = "#145a32";
        resultado.innerHTML = `Gasto estimado: <strong>${totalEmReais}</strong>.<br><small>Excelente economia! E você ainda preserva as abelhas do Paraná.</small> `;
    }
});