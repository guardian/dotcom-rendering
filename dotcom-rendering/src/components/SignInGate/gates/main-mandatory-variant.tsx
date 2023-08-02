import React, { Suspense } from 'react';
import { startPerformanceMeasure } from '../../../lib/startPerformanceMeasure';
import { Lazy } from '../../Lazy';
import { canShowSignInGateMandatory } from '../displayRule';
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

export const signInGateMandatoryComponent: SignInGateComponent = {
	gate: ({ ophanComponentId, dismissGate, guUrl, signInUrl, abTest }) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateMain
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isMandatory={true}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGateMandatory,
};
