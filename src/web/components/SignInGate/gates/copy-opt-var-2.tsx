import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import { SignInGateComponent, SignInGateCopy } from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShowCopyOpt as canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateCopyOptVar2 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyOptVar');
	start();
	return import(
		/* webpackChunkName: "SignInGateCopyOptVar" */ '../gateDesigns/copy-opt-test/SignInGateCopyOptVar'
		).then((module) => {
		end();
		return { default: module.SignInGateCopyOptVar };
	});
});

const CopyOptVar2Text: SignInGateCopy = {
	header: "Register to keep reading",
	subHeader: "It’s free to do, and it only takes a minute",
	paragraphs: ["When you register and share your preferences, you’re allowing us to better understand you, " +
	"and this will help you to get the most out of The Guardian.",
		"You’ll always be able to control your own privacy settings and every article will remain free."]
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
					<SignInGateCopyOptVar2
						ophanComponentId={ophanComponentId}
						dismissGate={dismissGate}
						guUrl={guUrl}
						signInUrl={signInUrl}
						abTest={abTest}
						isComment={isComment}
						signInGateCopy={CopyOptVar2Text}
					/>
				</Suspense>
			</Lazy>
	),
	canShow,
};
