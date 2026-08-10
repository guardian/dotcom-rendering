import debugCss from './debug.css?raw';

const style = document.createElement('style');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- We know this will be a string
style.innerHTML = debugCss;
document.body.appendChild(style);
