import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import { SignInGateComponent, SignInGateCopy } from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShowCopyOpt as canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateCopyOptVar1 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyOptVar');
	start();
	return import(
		/* webpackChunkName: "SignInGateCopyOptVar" */ '../gateDesigns/copy-opt-test/SignInGateCopyOptVar'
		).then((module) => {
		end();
		return { default: module.SignInGateCopyOptVar };
	});
});

const CopyOptVar1Text: SignInGateCopy = {
	header: "You need to register to keep reading",
	subHeader: "It’s still free to read - this is not a paywall",
	paragraphs: ["We’re committed to keeping our quality reporting open. By registering and providing us with " +
	"insight into your preferences, you’re helping us to engage with you more deeply, and that allows us to " +
	"keep our journalism free for all. You’ll always be able to control your own privacy settings."]
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
					<SignInGateCopyOptVar1
						ophanComponentId={ophanComponentId}
						dismissGate={dismissGate}
						guUrl={guUrl}
						signInUrl={signInUrl}
						abTest={abTest}
						isComment={isComment}
						signInGateCopy={CopyOptVar1Text}
					/>
				</Suspense>
			</Lazy>
	),
	canShow
};
