const searchInput = document.getElementById("search");
let isRequestPending = false;

window.addEventListener("DOMContentLoaded", () => {
    const link = btoa(window.location.hash.slice(1));
    if (link) go(link);

    function updateText() {
        const creationInfo = document.getElementById("creation-info");
        const facts = [
            "Equinox was created in January 2024.",
            "Equinox is updated very frequently.",
            "Happy browsing!",
            "Experienced downtime? Look at our Discord server for status updates.",
            "https://discord.gg/H7JqRwykhk",
            "Customize your experience in settings!",
            "We have a lot of popular games and apps to choose from.",
            "Have you ever played Monkey Mart? It's so fun!",
            "Equinox was made by wrnd."
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        creationInfo.textContent = randomFact;
    }
    updateText();
    setInterval(updateText, 10000);

    console.log(`
		███████╗░██████╗░██╗░░░██╗██╗███╗░░██╗░█████╗░██╗░░██╗
		██╔════╝██╔═══██╗██║░░░██║██║████╗░██║██╔══██╗╚██╗██╔╝
		█████╗░░██║██╗██║██║░░░██║██║██╔██╗██║██║░░██║░╚███╔╝░
		██╔══╝░░╚██████╔╝██║░░░██║██║██║╚████║██║░░██║░██╔██╗░
		███████╗░╚═██╔═╝░╚██████╔╝██║██║░╚███║╚█████╔╝██╔╝╚██╗
		╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝\n
							Version 1.38`);
});

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    go(searchInput.value);
});

document.querySelectorAll(".game-container").forEach(container => {
    container.addEventListener("click", (event) => {
        event.preventDefault();
        const link = container.getAttribute("data-href");
        go(link);
        searchInput.placeholder = link;
    });
});
