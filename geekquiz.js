window.addEventListener('load', function() {
    console.log("Sistema avviato!");
    const debugMsg = document.querySelector('.debug-msg');
    const container = document.getElementById('cg-auto-quiz');
    
    if (debugMsg) {
        debugMsg.style.display = 'none'; // Nasconde la riga arancione
    }
    
    if (container) {
        container.innerHTML = `
            <div style="border:2px solid #00ff41; padding:20px; background:#000; color:#00ff41;">
                <h2>[SISTEMA_ATTIVO]</h2>
                <p>Se vedi questo box, il collegamento funziona!</p>
                <button onclick="location.reload()" style="background:#00ff41; color:#000; border:none; padding:10px; cursor:pointer;">RESCAN</button>
            </div>`;
    }
});
