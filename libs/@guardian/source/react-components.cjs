const reactComponents = require('CSNX_SOURCE/react-components');

for (const key in reactComponents) {
	if (reactComponents.hasOwnProperty(key)) {
		exports[key] = reactComponents[key];
	}
}
