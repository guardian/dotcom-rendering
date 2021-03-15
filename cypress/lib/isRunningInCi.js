export const isRunningInCI = () => {
	return (
		Cypress.env('TEAMCITY') === 'true' ||
		Cypress.env('GITHUB_ACTIONS') === 'true'
	);
};
