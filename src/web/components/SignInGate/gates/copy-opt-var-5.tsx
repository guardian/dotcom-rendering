import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import {
	SignInGateComponent,
	SignInGateCopy,
} from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShowCopyOpt as canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateCopyOptVar5 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyOptVar');
	start();
	return import(
		/* webpackChunkName: "SignInGateCopyOptVar5" */ '../gateDesigns/copy-opt-test/SignInGateCopyOptVar'
	).then((module) => {
		end();
		return { default: module.SignInGateCopyOptVar };
	});
});

const CopyOptVar5Text: SignInGateCopy = {
	header: 'Join our mission',
	subHeader: 'Keep journalism free for all',
	paragraphs: [
		'Enjoy a closer relationship with The Guardian by registering and sharing your preferences.',
		'You’ll always be able to control your own privacy settings, while also taking a small but critical step ' +
			'in helping to sustain our mission of keeping our independent reporting free for all.',
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
				<SignInGateCopyOptVar5
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isComment={isComment}
					signInGateCopy={CopyOptVar5Text}
				/>
			</Suspense>
		</Lazy>
	),
	canShow,
};
