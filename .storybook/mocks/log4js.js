/** It’s no op(eration) */
const noop = () => {};

const getLogger = {
	isLevelEnabled: noop,
	isTraceEnabled: noop,
	isDebugEnabled: noop,
	isInfoEnabled: noop,
	isWarnEnabled: noop,
	isErrorEnabled: noop,
	isFatalEnabled: noop,

	_log: noop,

	addContext: noop,
	removeContext: noop,
	clearContext: noop,
	setParseCallStackFunction: noop,

	trace: noop,
	debug: noop,
	info: noop,
	warn: noop,
	error: noop,
	fatal: noop,
	mark: noop,
};

const logger = { ...console };

export {
	noop as addLayout,
	noop as configure,
	noop as shutdown,
	getLogger,
	logger,
};
