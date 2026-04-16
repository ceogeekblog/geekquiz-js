const GeekQuizConfig = {
    maxQuestions: 5,
    mainColor: '#00ff41',
    contentSelector: '.post-content, article, p',
    ranks: ["RECLUTA", "SISTEMISTA", "ARCHITETTO"]
};

(function(cfg) {
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '').trim();

    function buildQuiz() {
        const paragraphs = Array.from(document.querySelectorAll('p'))
            .map(p => p.innerText.trim())
            .filter(t => t.split(' ').length > 15);

        if (paragraphs.length < 2) return null;

        let quizSet = [];
        paragraphs.sort(() => 0.5 - Math.random()).slice(0, cfg.maxQuestions).forEach(text => {
            const words = text.split(/\s+/);
            let candidates = [];
            words.forEach((w, i) => { 
                if (norm(w).length > 7 && i > 2 && i < words.length - 2) candidates.push(i); 
            });

            if (candidates.length > 0) {
                const idx = candidates[Math.floor(Math.random() * candidates.length)];
                const original = words[idx].replace(/[.,;:!?]/g, "");
                let masked = [...words]; masked[idx] = "__________";
                const snippet = masked.slice(Math.max(0, idx - 5), Math.min(words.length, idx + 5)).join(" ");
                
                const ops = [original.toUpperCase(), "SISTEMA", "DECRYPT", "DATABASE"].sort(() => 0.5 - Math.random());
                quizSet.push({ q: `"...${snippet}..."`, options: ops, answer: norm(original) });
            }
        });
        return quizSet;
    }

    let current = 0, score = 0, data = [];

    function init() {
        data = buildQuiz();
        if (!data || data.length < 1) return;
        const container = document.getElementById('cg-auto-quiz');
        if(!container) return;
        container.innerHTML = `<div style="border:1px solid #00ff41;padding:20px;background:#000;color:#00ff41;font-family:monospace;">
            <div id="q-txt"></div><div id="opts"></div></div>`;
        render();
    }

    function render() {
        const q = data[current];
        document.getElementById('q-txt').innerText = q.q;
        const optContainer = document.getElementById('opts');
        optContainer.innerHTML = '';
        q.options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o;
            b.style = "margin:10px;padding:10px;background:none;border:1px solid #00ff41;color:#00ff41;cursor:pointer;";
            b.onclick = () => {
                if (norm(o) === q.answer) score++;
                current++;
                if (current < data.length) render();
                else document.getElementById('cg-auto-quiz').innerHTML = "<h2>QUIZ COMPLETATO</h2>";
            };
            optContainer.appendChild(b);
        });
    }
    window.addEventListener('load', init);
})(GeekQuizConfig);
