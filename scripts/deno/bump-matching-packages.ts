const packageJsonPath = './dotcom-rendering/package.json';

/**
 * Maps a 'lead package' onto an array of 'follower packages'.
 * When a Dependabot PR is opened for the lead package, this script
 * tries to bump its follower packages to match the same version.
 * Edit this to track new packages.
 */
const packageLookup: Record<string, string[]> = {
	'@sentry/browser': ['@sentry/integrations'],
};

/**
 * This regex aims to match the template used by Dependabot for its PR titles.
 * The capture group should capture the name of the package being bumped.
 *
 * @example
 * running: `packageNamePattern.exec("chore(deps): bump @sentry/browser from 7.35.0 to 7.37.0");`
 * should return: `[ "chore(deps): bump @sentry/browser from 7.35.0 to 7.37.0", "@sentry/browser" ]`
 *
 */
const packageNamePattern = /.*bump (\S+) from.*/;

/**
 * Extract the name of the package that's been bumped by Dependabot
 */
const PR_NAME = Deno.env.get('PR_NAME');
if (!PR_NAME) throw new Error('Missing PR_NAME value');
const matches = packageNamePattern.exec(PR_NAME);

if (!matches || matches.length < 2) {
	console.error(
		`No package name found in PR title -- check whether the Dependabot title template has changed.`,
	);
	Deno.exit();
}
const leadPackage = matches[1];

/**
 * Load package.json for /dotcom-rendering
 */
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync(packageJsonPath);
const dataString = decoder.decode(data);
const packages = JSON.parse(dataString);

/**
 * Check whether there are any packages that need to be kept in sync
 * with the leadPackage.
 */
const followerPackages = packageLookup[leadPackage];
if (followerPackages == undefined) {
	console.info(
		`No synchronisation info found for package ${leadPackage} in lookup.`,
	);
	Deno.exit();
}

/**
 * Find the new version number for the lead package.
 */
const leadingPackageVersion = packages.dependencies?.[leadPackage];
if (leadingPackageVersion == undefined) {
	console.error(
		`No version information package ${leadPackage} in '${packageJsonPath}'.`,
	);
	Deno.exit();
}

/**
 * Try to bump the follower follower packages to the same version as the
 * lead package.
 */
const commands: [string, Deno.RunOptions][] = followerPackages.map(
	(followerPackage) => [
		followerPackage,
		createBumpingCommandOptions(followerPackage, leadingPackageVersion),
	],
);
const statuses = await Promise.all(
	commands.map(([packageName, command]) =>
		Deno.run(command)
			.status()
			.then((status) => ({
				packageName,
				status,
			})),
	),
);

statuses.forEach((status) => {
	switch (status.status.success) {
		case true:
			console.info(`Package update succeeded for ${status.packageName}`);
			break;
		case false:
			console.error(`Package update failed for ${status.packageName}`);
	}
});

Deno.exit();

// Utility functions:

/**
 * @param followerPackage
 * @param leadingVersion
 * @returns A RunOptions object which will bump followerPackage to leadingVersion
 */
function createBumpingCommandOptions(
	followerPackage: string,
	leadingVersion: string,
): Deno.RunOptions {
	return {
		cwd: './dotcom-rendering/',
		cmd: ['yarn', 'upgrade', `${followerPackage}@${leadingVersion}`],
		stdout: 'null',
		stderr: 'piped',
	};
}
