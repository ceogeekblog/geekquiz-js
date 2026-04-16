window.addEventListener('load', function() {
    // 1. Nascondiamo subito la riga di debug arancione
    const debugMsg = document.querySelector('.debug-msg');
    if (debugMsg) debugMsg.style.display = 'none';

    // 2. Logica del quiz
    const container = document.getElementById('cg-auto-quiz');
    if (!container) return;

    // Prendiamo il testo dalla pagina
    const text = document.querySelector('.post-content').innerText;
    const words = text.split(/\s+/);
    
    // Creiamo una domanda semplice per testare
    const question = "...L'architettura del sistema operativo si basa su un __________ molto potente...";
    const options = ["KERNEL", "MOUSE", "TASTIERA", "MONITOR"];
    const answer = "KERNEL";

    container.innerHTML = `
        <div style="border:2px solid #00ff41; padding:20px; background:#000; color:#00ff41; font-family:monospace;">
            <h3>[MODULO_QUIZ_ATTIVO]</h3>
            <p>${question}</p>
            <div id="opts"></div>
        </div>`;

    options.forEach(o => {
        const btn = document.createElement('button');
        btn.innerText = o;
        btn.style = "display:block; margin:10px 0; padding:10px; background:none; border:1px solid #00ff41; color:#00ff41; cursor:pointer; width:100%; text-align:left;";
        btn.onclick = function() {
            if (o === answer) {
                alert("ACCESSO GARANTITO: Risposta Corretta!");
                location.reload();
            } else {
                alert("ACCESSO NEGATO: Riprova.");
            }
        };
        document.getElementById('opts').appendChild(btn);
    });
});
