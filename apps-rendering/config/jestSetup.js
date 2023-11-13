jest.mock('@guardian/cdk/lib/constants/tracking-tag');

/**
 * Some tests use a JSDOM Jest environment. It appears that TextEncoder is not
 * available globally, and so we need to enable it here.
 * See https://github.com/jestjs/jest/issues/9983
 */
global.TextEncoder = require('util').TextEncoder
