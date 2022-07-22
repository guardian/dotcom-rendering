const gist = "https://raw.githubusercontent.com/guardian/dotcom-rendering/dev-time/debug/dotcom-rendering/scripts/debug/debug.css";
const style = document.createElement("style");
fetch(gist).then(r => r.text()).then(css => {
	style.innerHTML = css;
	document.body.appendChild(style);
});

const key = document.createElement("div");
key.innerHTML = "<div class=\"debug-key\"><p class=\"debug-key-island\">Blue = Island</p><p class=\"debug-key-element\">Red = Element</p></div>";
document.body.prepend(key);
