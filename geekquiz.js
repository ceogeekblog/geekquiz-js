window.addEventListener('load', function() {
    console.log("Il file JS è stato caricato correttamente!");
    const container = document.getElementById('cg-auto-quiz');
    if (container) {
        container.innerHTML = "<h2 style='color: lime;'>IL MOTORE FUNZIONA!</h2>";
    } else {
        console.log("Errore: Non trovo il contenitore con ID cg-auto-quiz");
    }
});
