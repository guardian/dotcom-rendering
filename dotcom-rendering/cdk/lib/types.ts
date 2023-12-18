import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';

export interface DCRProps extends GuStackProps {
	/**
	 * The name of the application
	 */
	app: string;
	/**
	 * The minimum number of instances in the autoscaling group
	 */
	minCapacity: number;
	/**
	 * The maximum number of instances in the autoscaling group.
	 * Defaults to twice the minimum capacity if not specified
	 */
	maxCapacity?: number;
	/**
	 * EC2 Instance Type to use for dotcom-rendering
	 */
	instanceType: string;
	/**
	 * The region in AWS where this app will run
	 */
	region: string;
}

export interface UserDataProps extends Pick<DCRProps, 'app' | 'stage'> {
	artifactsBucket: string;
}

export interface DCRAlarmConfig {
	comparisonOperator: string;
	threshold: number;
	evaluationPeriod: number;
	period: number;
}
