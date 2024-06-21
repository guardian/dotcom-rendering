const foundations = require('CSNX_SOURCE/foundations');

for (const key in foundations) {
	if (foundations.hasOwnProperty(key)) {
		exports[key] = foundations[key];
	}
}
