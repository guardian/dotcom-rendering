jest.mock('@guardian/cdk/lib/constants/tracking-tag');

/**
 * Some tests use a JSDOM Jest environment. It appears that TextEncoder and
 * TextDecoder are not available globally, and so we need to enable them here.
 * See https://github.com/jestjs/jest/issues/9983
 */
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
