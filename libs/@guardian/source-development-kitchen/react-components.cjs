const reactComponents = require('@CSNX_PACKAGE/source-development-kitchen/react-components');

for (const key in reactComponents) {
	if (reactComponents.hasOwnProperty(key)) {
		exports[key] = reactComponents[key];
	}
}
