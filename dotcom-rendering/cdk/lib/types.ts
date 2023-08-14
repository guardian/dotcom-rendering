import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';

export interface DCRProps extends GuStackProps {
	/**
	 * The name of the application
	 */
	app: string;
	/**
	 * The region in AWS where this app will run
	 */
	region: string;
	/**
	 * AMI Recipe to use. Should be kept in line with .nvmrc version
	 */
	amiRecipe: string;
	/**
	 * EC2 Instance Type to use for dotcom-rendering
	 */
	instanceType: string;
}

export type UserDataProps = Pick<DCRProps, 'app' | 'region' | 'stage'> & {
	elkStreamId: string;
};
