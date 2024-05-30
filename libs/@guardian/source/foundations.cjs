const foundations = require('@CSNX_PACKAGE/source/foundations');

for (const key in foundations) {
	if (foundations.hasOwnProperty(key)) {
		exports[key] = foundations[key];
	}
}
