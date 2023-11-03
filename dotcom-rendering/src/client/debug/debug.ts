// @ts-expect-error: Cannot find module
import debugCss from './debug.css';

const style = document.createElement('style');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- We know this will be a string
style.innerHTML = debugCss;
document.body.appendChild(style);
