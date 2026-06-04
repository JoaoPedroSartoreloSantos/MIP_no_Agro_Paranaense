// ==========================================
// 1. ZOOM ACESSÍVEL (Apenas Aumentar e Diminuir)
// ==========================================
let tamanhoFonte = 16; 

document.getElementById("btn-aumentar-zoom").addEventListener("click", function() {
    if (tamanhoFonte < 28) { 
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


// ==========================================
// 2. LEITOR DE VOZ (Anti-travamento)
// ==========================================
// Lemos o texto em "pedaços" (parágrafos e títulos) para o navegador não bugar.
let isLendo = false;
const btnVoz = document.getElementById("btn-fala");
const sintese = window.speechSynthesis;
let pedacosDeTexto = [];
let indiceAtual = 0;

btnVoz.addEventListener("click", function() {
    if (isLendo) {
        // Se clicar de novo, para a leitura imediatamente
        sintese.cancel();
        isLendo = false;
        btnVoz.innerText = "🔊 Ouvir Site";
        btnVoz.style.backgroundColor = "#2c3e50";
    } else {
        // 1. Pega todos os parágrafos, listas e títulos do site
        const elementos = document.querySelectorAll(".conteudo-principal h2, .conteudo-principal p, .conteudo-principal li");
        
        // 2. Transforma em uma lista de textos limpos
        pedacosDeTexto = Array.from(elementos)
            .map(el => el.innerText)
            .filter(texto => texto.trim() !== ""); // Ignora partes vazias
        
        indiceAtual = 0;
        isLendo = true;
        btnVoz.innerText = "🛑 Parar Leitura";
        btnVoz.style.backgroundColor = "#c0392b"; 
        
        // 3. Começa a ler o primeiro pedaço
        lerProximoPedaco();
    }
});

function lerProximoPedaco() {
    // Verifica se terminou ou se o usuário mandou parar
    if (!isLendo || indiceAtual >= pedacosDeTexto.length) {
        isLendo = false;
        btnVoz.innerText = "🔊 Ouvir Site";
        btnVoz.style.backgroundColor = "#2c3e50";
        return;
    }

    const mensagem = new SpeechSynthesisUtterance(pedacosDeTexto[indiceAtual]);
    mensagem.lang = "pt-BR";
    mensagem.rate = 1.1; // Velocidade da voz

    // Quando terminar este pedaço, chama a função para ler o próximo
    mensagem.onend = function() {
        indiceAtual++;
        lerProximoPedaco();
    };

    // Prevenção de erros caso o navegador falhe na leitura de um pedaço
    mensagem.onerror = function() {
        indiceAtual++;
        lerProximoPedaco();
    };

    sintese.speak(mensagem);
}