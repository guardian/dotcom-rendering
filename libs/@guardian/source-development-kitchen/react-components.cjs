const reactComponents = require('CSNX_SOURCE_DEVELOPMENT_KITCHEN/react-components');

for (const key in reactComponents) {
	if (reactComponents.hasOwnProperty(key)) {
		exports[key] = reactComponents[key];
	}
}
