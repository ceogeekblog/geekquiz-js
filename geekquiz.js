window.addEventListener('load', function() {
    const container = document.getElementById('cg-auto-quiz');
    if (!container) return;

    // Configurazione Estetica
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
        .cg-terminal { 
            position: relative; overflow: hidden;
            border: 2px solid #00ff41; background: #050505; 
            color: #00ff41; padding: 25px; font-family: 'Courier New', monospace;
            box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
        }
        .cg-terminal::before {
            content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: rgba(0, 255, 65, 0.1); animation: scanline 4s linear infinite;
        }
        .cg-btn { 
            display: block; width: 100%; margin: 12px 0; padding: 12px; 
            background: transparent; border: 1px solid #00ff41; color: #00ff41; 
            text-align: left; cursor: pointer; transition: all 0.3s;
            text-transform: uppercase; letter-spacing: 1px;
        }
        .cg-btn:hover { background: #00ff41; color: #000; font-weight: bold; }
        .cg-header { border-bottom: 1px solid #00ff41; margin-bottom: 15px; padding-bottom: 5px; font-size: 14px; }
    `;
    document.head.appendChild(style);

    // Dati del Quiz (Personalizzabili qui)
    const quizData = {
        title: "AUTH_REQUIRED: TEST DI ACCESSO",
        question: "Analisi testo: Quale componente gestisce le risorse hardware e garantisce la sicurezza dei processi?",
        options: ["KERNEL MONOLITICO", "INTERFACCIA GUI", "MEMORIA RAM", "DRIVER STAMPANTE"],
        correct: 0, // La prima opzione è quella giusta
        successMsg: "ACCESSO AUTORIZZATO. RANGO: SISTEMISTA LIVELLO 1",
        errorMsg: "ACCESSO NEGATO. SISTEMA BLOCCATO."
    };

    function startQuiz() {
        container.innerHTML = `
            <div class="cg-terminal">
                <div class="cg-header">> ${quizData.title}</div>
                <p>> ${quizData.question}</p>
                <div id="quiz-options"></div>
            </div>`;

        quizData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'cg-btn';
            btn.innerText = `[${index}] ${opt}`;
            btn.onclick = () => {
                if (index === quizData.correct) {
                    container.innerHTML = `<div class="cg-terminal"><h2 style="text-align:center">${quizData.successMsg}</h2><button class="cg-btn" onclick="location.reload()">RE-START</button></div>`;
                } else {
                    alert(quizData.errorMsg);
                }
            };
            document.getElementById('quiz-options').appendChild(btn);
        });
    }

    startQuiz();
});
