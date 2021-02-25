import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import { SignInGateComponent, SignInGateCopy } from '@frontend/web/components/SignInGate/gateDesigns/types';
import { canShowCopyOpt as canShow } from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';

const SignInGateCopyOptVar6 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateCopyOptVar');
	start();
	return import(
		/* webpackChunkName: "SignInGateCopyOptVar6" */ '../gateDesigns/copy-opt-test/SignInGateCopyOptVar'
		).then((module) => {
		end();
		return { default: module.SignInGateCopyOptVar };
	});
});

const CopyOptVar6Text: SignInGateCopy = {
	header: "Register to keep reading",
	subHeader: "It will only take a minute - and it’s free",
	paragraphs: ["It is our mission to keep our reporting free for everyone. By registering and sharing your " +
	"preferences, you’re helping to sustain progressive journalism that will keep on challenging the status quo. " +
	"You’ll always be able to control your own privacy settings."]
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
					<SignInGateCopyOptVar6
						ophanComponentId={ophanComponentId}
						dismissGate={dismissGate}
						guUrl={guUrl}
						signInUrl={signInUrl}
						abTest={abTest}
						isComment={isComment}
						signInGateCopy={CopyOptVar6Text}
					/>
				</Suspense>
			</Lazy>
	),
	canShow,
};
