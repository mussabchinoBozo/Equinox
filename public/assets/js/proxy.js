const msg = document.getElementById("m");
const frame = document.getElementById("ifr");
const loadingScreen = document.getElementById("loadingScreen");

function searchurl(url) {
	switch (localStorage.getItem("equinox||search")) {
		case "ddg":
			proxy(`https://duckduckgo.com/?q=${url}`);
			break;
		case "brave":
			proxy(`https://search.brave.com/search?q=${url}`);
			break;
		case "yahoo":
			proxy(`https://search.yahoo.com/search?p=${url}`);
			break;
		default:
		case "google":
			proxy(`https://www.google.com/search?q=${url}`);
			break;
	}
}

function go(url) {
	if (!isUrl(url)) searchurl(url); else {
		if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url
		proxy(url)
	}
}

function isUrl(val = "") {
	if (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ") return true;
	return false;
}

function resolveURL(url) {
	switch (localStorage.getItem("equinox||proxy")) {
		case "dy":
			return "/study/" + Ultraviolet.codec.xor.decode(url);
		default:
		case "uv":
			return __uv$config.prefix + __uv$config.encodeUrl(url);
	}
}

function showLoadingScreen() {
    var loadingScreen = document.getElementById('loadingScreen');
    var loadingProgress = loadingScreen.querySelector('.loading-progress');

    loadingProgress.value = 0;

    loadingScreen.style.display = 'flex';
    loadingScreen.classList.add('fade-in');

    var interval = setInterval(() => {
        if (loadingProgress.value < 95) {
            loadingProgress.value += Math.random() * 5;
        }
    }, 200);

    frame.onload = function() {
        clearInterval(interval);
        loadingProgress.value = 100;
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            frame.style.display = 'flex';
        }, 500);
    };
}

function proxy(url) {
    document.getElementById("align").style.display = "flex";
    document.querySelector(".topbar").style.width = "98%";
    document.getElementById("exit").style.display = "flex";
    document.getElementById("fullscreen").style.display = "flex";
    document.getElementById("homebtn").style.display = "none";
    document.getElementById("settings").style.display = "none";

    frame.style.display = "none";
    showLoadingScreen();

    registerSW().then(worker => {
        if (!worker) {
            msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
            return;
        }

        frame.onload = function() {
            loadingScreen.style.display = 'none';
            frame.style.display = 'flex';

            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            if (url.includes('play.geforcenow.com') && node.textContent && (node.textContent.includes('Games') || node.textContent.includes('Looking for the Next Available Rig...') || node.textContent.includes('NIVIDA'))) {
                                console.log('GeForce Now detected, applying fix');
                                document.getElementById("align").style.display = "none";
                                setTimeout(() => {
                                    document.getElementById("align").style.display = "flex";
                                }, 1000);
                            }
                        });
                    }
                });
            });

            observer.observe(frame.contentDocument.body, { childList: true, subtree: true });
        };

        frame.src = resolveURL(url);
    });
}


function exit() {
	document.getElementById("align").style.display = "none";
	document.getElementById("search").placeholder = "What's on your mind?";
	document.querySelector(".topbar").style.width = "50%";
	document.querySelector(".search").value = "";
	frame.src = "";
	document.getElementById("exit").style.display = "none";
	document.getElementById("fullscreen").style.display = "none";
	document.getElementById("homebtn").style.display = "flex";
	document.getElementById("settings").style.display = "flex";
}

function fullscreen() {
    if (!document.fullscreenElement) {
        frame.requestFullscreen().catch(err => {
            console.error(`error ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}
