import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';

import { SignInGateComponent } from '../types';
import { initPerf } from '../../../browser/initPerf';
import { canShowMandatoryUs } from '../displayRule';

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

export const signInGateComponent: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		abTest,
		isComment,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateMain
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isComment={isComment}
					isMandatory={true}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowMandatoryUs,
};
