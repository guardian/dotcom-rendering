import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import { SignInGateComponent } from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShowMandatoryGate } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateMandatory = React.lazy(() => {
	const { start, end } = initPerf('SignInGateMain');
	start();
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMandatory'
	).then((module) => {
		end();
		return { default: module.SignInGateMandatory };
	});
});

export const signInGateComponent: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate, // TODO if this becomes the winner we can remove the unused dismissGate
		guUrl,
		signInUrl,
		abTest,
		isComment,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateMandatory
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isComment={isComment}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowMandatoryGate,
};
