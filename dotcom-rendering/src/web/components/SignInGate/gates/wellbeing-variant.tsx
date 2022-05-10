import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';

import { SignInGateComponent } from '../types';
import { canShowWellBeingGate } from '../displayRule';
import { initPerf } from '../../../browser/initPerf';

const WellBeingGateMain = React.lazy(() => {
	const { start, end } = initPerf('WellBeingGateMain');
	start();
	return import(
		/* webpackChunkName: "WellBeingGateMain" */ '../gateDesigns/WellBeingGateMain'
	).then((module) => {
		end();
		console.log('module', module);
		return { default: module.WellBeingGateMain };
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
		tags,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<WellBeingGateMain
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isComment={isComment}
					tags={tags}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowWellBeingGate,
};
