/**
 * How many mvts are available.
 * Currently fastly dictionaries support up to 1000 keys.
 * So this is the maximum number of MVTs we can have.
 */
const MVT_COUNT = 1000;

/**
 * The maximum number of server-side tests allowed.
 * This is a limit to ensure we don't split the cache too much.
 *
 * @todo: This is a placeholder, actual number TBD
 */
const MAX_SERVER_SIDE_TESTS = 20;

export { MVT_COUNT, MAX_SERVER_SIDE_TESTS };
