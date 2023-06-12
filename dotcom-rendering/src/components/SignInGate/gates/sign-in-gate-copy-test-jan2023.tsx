import React, { Suspense } from 'react';
import { initPerf } from '../../../client/initPerf';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateCopyTestJan2023 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyTestJan2023');
	start();
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateCopyTestJan2023'
	).then((module) => {
		end();
		return { default: module.SignInGateCopyTestJan2023 };
	});
});

export const signInGateCopyTestJan2023Component: SignInGateComponent = {
	gate: ({ ophanComponentId, dismissGate, guUrl, signInUrl, abTest }) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateCopyTestJan2023
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
