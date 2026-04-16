/**
 * GEEKQUIZ-JS - Versione Definitiva
 */
window.addEventListener('load', function() {
    const cfg = {
        maxQuestions: 3,
        mainColor: '#00ff41',
        ranks: ["RECLUTA", "SISTEMISTA", "ARCHITETTO"]
    };

    // Nasconde il messaggio di debug se presente
    const debugMsg = document.querySelector('.debug-msg');
    if (debugMsg) debugMsg.style.display = 'none';

    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '').trim();

    function buildQuiz() {
        const paragraphs = Array.from(document.querySelectorAll('p'))
            .map(p => p.innerText.trim())
            .filter(t => t.split(' ').length > 10);

        let quizSet = [];
        paragraphs.sort(() => 0.5 - Math.random()).slice(0, cfg.maxQuestions).forEach(text => {
            const words = text.split(/\s+/);
            let candidates = [];
            words.forEach((w, i) => { 
                if (norm(w).length > 5 && i > 1 && i < words.length - 1) candidates.push(i); 
            });

            if (candidates.length > 0) {
                const idx = candidates[Math.floor(Math.random() * candidates.length)];
                const original = words[idx].replace(/[.,;:!?]/g, "");
                let masked = [...words]; masked[idx] = "__________";
                const snippet = masked.slice(Math.max(0, idx - 4), Math.min(words.length, idx + 4)).join(" ");
                
                const ops = [original.toUpperCase(), "SISTEMA", "LOGICA", "DIGITALE"].sort(() => 0.5 - Math.random());
                quizSet.push({ q: `"...${snippet}..."`, options: ops, answer: norm(original) });
            }
        });
        return quizSet;
    }

    let current = 0, score = 0, data = buildQuiz();
    const container = document.getElementById('cg-auto-quiz');

    if (!container || data.length === 0) return;

    function render() {
        container.innerHTML = `
            <div style="border:1px solid #00ff41; padding:20px; background:#000; color:#00ff41; font-family:monospace;">
                <p style="font-size:12px; opacity:0.7;">> ANALISI_TESTO_IN_CORSO...</p>
                <p style="font-size:16px; margin:20px 0;">${data[current].q}</p>
                <div id="quiz-options"></div>
            </div>`;
        
        data[current].options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o;
            b.style = "display:block; width:100%; margin:10px 0; padding:10px; background:none; border:1px solid #00ff41; color:#00ff41; cursor:pointer; text-align:left;";
            b.onclick = () => {
                if (norm(o) === data[current].answer) score++;
                current++;
                if (current < data.length) render();
                else showEnd();
            };
            document.getElementById('quiz-options').appendChild(b);
        });
    }

    function showEnd() {
        const rank = score === data.length ? cfg.ranks[2] : (score > 0 ? cfg.ranks[1] : cfg.ranks[0]);
        container.innerHTML = `
            <div style="border:1px solid #00ff41; padding:20px; background:#000; color:#00ff41; font-family:monospace; text-align:center;">
                <h2>REPORT COMPLETATO</h2>
                <p>Punteggio: ${score}/${data.length}</p>
                <p>Rango: <span style="background:#00ff41; color:#000; padding:0 5px;">${rank}</span></p>
                <button onclick="location.reload()" style="margin-top:20px; background:none; border:1px solid #00ff41; color:#00ff41; cursor:pointer; padding:5px 10px;">RE-SCAN SYSTEM</button>
            </div>`;
    }

    render();
});
