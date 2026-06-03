// ==========================================
// 1. MENU DE 3 PONTINHOS (Dropdown Consertado)
// ==========================================
const btnModulos = document.getElementById("btn-modulos");
const dropdownModulos = document.getElementById("dropdown-modulos");

btnModulos.addEventListener("click", function(event) {
    // Evita que o clique se espalhe e feche o menu instantaneamente
    event.stopPropagation(); 
    // Liga e desliga a classe que mostra o menu
    dropdownModulos.classList.toggle("show");
});

// Se o usuário clicar em qualquer outro lugar da tela, o menu fecha
document.addEventListener("click", function(event) {
    // Se o lugar clicado NÃO for o botão e NÃO for o menu em si
    if (event.target !== btnModulos && !dropdownModulos.contains(event.target)) {
        dropdownModulos.classList.remove("show");
    }
});

// Fechar o menu automaticamente após o usuário clicar em um dos links dele
const linksDropdown = dropdownModulos.querySelectorAll("a");
linksDropdown.forEach(function(link) {
    link.addEventListener("click", function() {
        dropdownModulos.classList.remove("show");
    });
});

// ==========================================
// 2. ZOOM ACESSÍVEL (Aumentando e Diminuindo)
// ==========================================
let tamanhoFonte = 16; 

document.getElementById("btn-aumentar-zoom").addEventListener("click", function() {
    if (tamanhoFonte < 26) { 
        tamanhoFonte += 2;
        document.documentElement.style.fontSize = tamanhoFonte + "px";
    }
});

document.getElementById("btn-diminuir-zoom").addEventListener("click", function() {
    if (tamanhoFonte > 12) { 
        tamanhoFonte -= 2;
        document.documentElement.style.fontSize = tamanhoFonte + "px";
    }
});

document.getElementById("btn-resetar-zoom").addEventListener("click", function() {
    tamanhoFonte = 16;
    document.documentElement.style.fontSize = tamanhoFonte + "px";
});

// ==========================================
// 3. LEITOR DE VOZ (Lendo o conteúdo do site)
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
        btnVoz.style.backgroundColor = "#c0392b"; 
    }
});