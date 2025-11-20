// Formatted logging for console output

const capitalize = (str) =>
	str.replace(/^([a-z])/, (match) => match.toUpperCase());

// ANSI escape codes
// https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const green = '\x1b[32m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';
const blue = '\x1b[34m';
const underline = '\x1b[4m';

const colourise = (colour, str) =>
	process.stdout.isTTY ? `${colour}${str}${reset}` : str;

const logIt = (messages = [], color = dim) => {
	console.log(colourise(color, capitalize(messages.join('\n'))));
};

const log = (...messages) => logIt(messages);
const warn = (...messages) => logIt(messages, red);
const prompt = (...messages) => logIt(messages, yellow);
const success = (...messages) => logIt(messages, green);
const command = (message) =>
	console.log(colourise(dim, `$ `) + colourise(blue, message));

// Only run as a script when run directly and not when imported as a module
const [, , messages, method] = process.argv;
if (require.main === module && messages) {
	switch (method) {
		case 'warn':
			warn(messages);
			break;
		case 'prompt':
			prompt(messages);
			break;
		default:
			log(messages);
			break;
	}
}

module.exports = {
	log,
	warn,
	prompt,
	success,
	colourise,
	command,
	red,
	yellow,
	green,
	blue,
	dim,
	reset,
	underline,
};
