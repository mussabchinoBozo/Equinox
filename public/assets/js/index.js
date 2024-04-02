async function registerSW() {
	const workerURL = "/sw.js";
	const worker = await navigator.serviceWorker.getRegistration(workerURL, {
		scope: "/edu",
	});
	if (worker) return worker;
	return navigator.serviceWorker.register(workerURL, { scope: __uv$config.prefix });
}


function encodeUVUrlWithPath(url = "") {
    return __uv$config.prefix + __uv$config.encodeUrl(url);
}

registerSW();


function timeFunction() {
    const timeElement = document.getElementById("time");
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = (hours % 12) || 12;
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    timeElement.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(timeFunction, 1000);