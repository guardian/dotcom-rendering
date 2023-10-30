import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import type { App } from 'aws-cdk-lib';

export class DotcomRenderingHalloween extends GuStack {
	// This should be coming from the base class, no?
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);
	}
}
