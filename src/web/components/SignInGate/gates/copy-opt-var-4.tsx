import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import {
	SignInGateComponent,
	SignInGateCopy,
} from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateCopyOptVar4 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyOptVar');
	start();
	return import(
		/* webpackChunkName: "SignInGateCopyOptVar4" */ '../gateDesigns/copy-opt-test/SignInGateCopyOptVar'
	).then((module) => {
		end();
		return { default: module.SignInGateCopyOptVar };
	});
});

const CopyOptVar4Text: SignInGateCopy = {
	header: 'Do you believe in independent journalism?',
	subHeader: 'If so, register for free',
	paragraphs: [
		'We can only keep making a difference if our progressive, independent journalism remains open to all.',
		'When you register, you’re helping us to know you better, which improves your reading experience - and keeps ' +
			'our mission alive. You’ll always be able to control your own privacy settings.',
	],
};

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
				<SignInGateCopyOptVar4
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isComment={isComment}
					signInGateCopy={CopyOptVar4Text}
				/>
			</Suspense>
		</Lazy>
	),
	canShow,
};
