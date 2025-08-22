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

/**
 * The spaces used for test groups, each space covers the entire mvt space allowing for concurrent overlapping tests where necessary.
 * If this is increased, the fastly VCL configuration will need to be updated to match.
 */
const AUDIENCE_SPACES = ['A', 'B', 'C'];

export { MVT_COUNT, MAX_SERVER_SIDE_TESTS, AUDIENCE_SPACES };
