async function registerSW() {
	await navigator.serviceWorker.register("/dy.sw.js", {
		scope: "/study",
	});
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
	var currentTime = new Date();


	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();

	var ampm = hours >= 12 ? "PM" : "AM";

	hours = (hours % 12) || 12;
	
	hours = (hours < 10 ? "0" : "") + hours;
	minutes = (minutes < 10 ? "0" : "") + minutes;
	seconds = (seconds < 10 ? "0" : "") + seconds;

	document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds + ampm ;
}

setInterval(timeFunction, 1000);
