// @ts-check

const { readdirSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/unbound-method -- it’s the node:path way
const { resolve } = require('path');

const islands = Object.fromEntries(
	readdirSync(resolve(__dirname, '..', '..', 'src', 'web', 'components'))
		.filter((filename) => filename.includes('.importable.'))
		.map((filename) => [`./src/web/components/${filename}`, filename]),
);

module.exports = { islands };
