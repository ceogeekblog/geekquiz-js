window.addEventListener('load', function() {
    // 1. Pulizia scritte di test precedenti
    const container = document.getElementById('cg-auto-quiz');
    if (!container) return;
    
    // Rimuove eventuali messaggi di debug o scritte fisse
    container.innerHTML = ""; 

    // 2. Creazione interfaccia Quiz
    const quizBox = document.createElement('div');
    quizBox.style = "border:2px solid #00ff41; padding:20px; background:#000; color:#00ff41; font-family:monospace; margin-top:20px;";
    
    quizBox.innerHTML = `
        <h3 style="margin-top:0; border-bottom:1px solid #00ff41; padding-bottom:10px;">[MODULO_QUIZ_ATTIVO]</h3>
        <p id="q-text">Domanda: Qual è il cuore del sistema operativo menzionato nel testo?</p>
        <div id="quiz-options"></div>
    `;
    container.appendChild(quizBox);

    // 3. Opzioni di risposta
    const opzioni = ["KERNEL", "SOFTWARE", "HARDWARE", "DATABASE"];
    const rispostaCorretta = "KERNEL";

    opzioni.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style = "display:block; width:100%; margin:10px 0; padding:10px; background:none; border:1px solid #00ff41; color:#00ff41; cursor:pointer; text-align:left; font-family:monospace;";
        
        btn.onmouseover = () => btn.style.background = "rgba(0, 255, 65, 0.1)";
        btn.onmouseout = () => btn.style.background = "none";
        
        btn.onclick = () => {
            if (opt === rispostaCorretta) {
                alert("ACCESSO AUTORIZZATO! Risposta esatta.");
                quizBox.innerHTML = "<h2 style='text-align:center;'>COMPLIMENTI ARCHITETTO!</h2><p style='text-align:center;'>Sistema violato con successo.</p>";
            } else {
                alert("ERRORE: Accesso negato.");
            }
        };
        document.getElementById('quiz-options').appendChild(btn);
    });
});
