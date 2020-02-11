const [serverConfig, clientConfig] = require('../webpack.config.js');

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