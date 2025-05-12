import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGateWithOffers } from '../displayRules';
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
					title="Register now and receive an exclusive, weekly roundup from our editor-in-chief"
					subtitle="It’s still free to read – this is not a paywall"
					body="Register now and receive Saturday Edition – a new, weekly email highlighting the week’s best Guardian Journalism from our editor-in-chief, Katharine Viner."
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					registerUrl={registerUrl}
					abTest={abTest}
					isMandatory={false}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGateWithOffers,
};
