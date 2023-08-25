import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateFakeSocial = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateFakeSocial',
	);

	return import(
		/* webpackChunkName: "SignInGateFakeSocial" */ '../gateDesigns/SignInGateFakeSocial'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateFakeSocial };
	});
});

export const signInGateComponent: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		registerUrl,
		abTest,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateFakeSocial
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					registerUrl={registerUrl}
					abTest={abTest}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGate,
};
