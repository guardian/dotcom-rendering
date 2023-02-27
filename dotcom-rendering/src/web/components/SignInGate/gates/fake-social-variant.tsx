import React, { Suspense } from 'react';
import { initPerf } from '../../../browser/initPerf';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateFakeSocial = React.lazy(() => {
	const { start, end } = initPerf('SignInGateFakeSocial');
	start();
	return import(
		/* webpackChunkName: "SignInGateFakeSocial" */ '../gateDesigns/SignInGateFakeSocial'
	).then((module) => {
		end();
		return { default: module.SignInGateFakeSocial };
	});
});

export const signInGateComponent: SignInGateComponent = {
	gate: ({ ophanComponentId, dismissGate, guUrl, signInUrl, abTest }) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateFakeSocial
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGate,
};
