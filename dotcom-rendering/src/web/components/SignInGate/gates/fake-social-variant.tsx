import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import { SignInGateComponent } from '@frontend/web/components/SignInGate/types';
import { canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

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
				<SignInGateFakeSocial
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
	canShow,
};
