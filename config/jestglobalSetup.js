// Set environment variable for timezone to have
// consistent timezone no matter which machine
// the tests are running from
export default () => {
	process.env.TZ = 'Europe/London';
};
