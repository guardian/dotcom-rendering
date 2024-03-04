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
					title="Register now and personalise your experience"
					subtitle="It’s still free to read – this is not a paywall"
					body="Register today to follow your favourite topics, writers and journalist series in My Guardian – a single destination that helps you get to the journalism you care about faster."
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
