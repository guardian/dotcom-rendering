import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import { SignInGateComponent, SignInGateCopy } from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShowCopyOpt as canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateCopyOptVar3 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyOptVar');
	start();
	return import(
		/* webpackChunkName: "SignInGateCopyOptVar3" */ '../gateDesigns/copy-opt-test/SignInGateCopyOptVar'
		).then((module) => {
		end();
		return { default: module.SignInGateCopyOptVar };
	});
});

const CopyOptVar3Text: SignInGateCopy = {
	header: "We’ll keep holding power to account",
	subHeader: "Register for free",
	paragraphs: ["When you do, your preferences help us to engage with you more deeply - and this not only " +
	"improves your experience of The Guardian, but enables us to keep investigating the critical stories that " +
	"need to be shared, and holding truth to power. You’ll always be able to control your own privacy settings."]
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
					<SignInGateCopyOptVar3
						ophanComponentId={ophanComponentId}
						dismissGate={dismissGate}
						guUrl={guUrl}
						signInUrl={signInUrl}
						abTest={abTest}
						isComment={isComment}
						signInGateCopy={CopyOptVar3Text}
					/>
				</Suspense>
			</Lazy>
	),
	canShow,
};
