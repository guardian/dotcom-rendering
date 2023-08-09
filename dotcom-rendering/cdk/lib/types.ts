import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';

export interface DCRProps extends GuStackProps {
	/**
	 * The name of the application
	 */
	app: string;
	/**
	 * The region in AWS where the application will run
	 */
	region: string;
}
