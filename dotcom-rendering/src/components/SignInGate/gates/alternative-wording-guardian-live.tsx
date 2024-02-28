import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGateWithOffers } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateCustomizableText = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateCustomizableText',
	);
	return import(
		/* webpackChunkName: "SignInGateCustomizableText" */ '../gateDesigns/SignInGateCustomizableText'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateCustomizableText };
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
				<SignInGateCustomizableText
					title="Register now and receive an exclusive Guardian Live discount"
					subtitle="It’s still free to read – this is not a paywall"
					body="Guardian Live brings you closer to the big stories, award-winning journalists, and leading thinkers in livestreamed and interactive events that you can access from wherever you are in the world."
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					registerUrl={registerUrl}
					abTest={abTest}
					isMandatory={true}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGateWithOffers,
};
