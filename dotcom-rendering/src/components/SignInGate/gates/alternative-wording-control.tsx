import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGateWithOffers } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateMain = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateMain',
	);
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMain'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateMain };
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
	}) => {
		return (
			<Lazy margin={300}>
				<Suspense fallback={<></>}>
					<SignInGateMain
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
		);
	},
	canShow: canShowSignInGateWithOffers,
};
