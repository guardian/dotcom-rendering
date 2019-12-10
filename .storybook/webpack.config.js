const clientConfig = require('../webpack.config.js')[1];

module.exports = async ({ config }) => {
	return {
        ...config,
        target: clientConfig.target,
        resolve: clientConfig.resolve,
		module: {
			rules: clientConfig.module.rules,
		},
		plugins: [
			...config.plugins
		],
	};
  };