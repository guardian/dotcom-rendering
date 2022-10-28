import React, { Suspense } from 'react';
import { initPerf } from '../../../browser/initPerf';
import { Lazy } from '../../Lazy';
import { canShowSignInGateMandatory } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateMain = React.lazy(() => {
	const { start, end } = initPerf('SignInGateMain');
	start();
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMain'
	).then((module) => {
		end();
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
