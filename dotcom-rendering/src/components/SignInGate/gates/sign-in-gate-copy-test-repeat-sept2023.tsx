import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import { SignInGateMainCheckoutComplete } from '../gateDesigns/SignInGateMainCheckoutComplete';
import type { SignInGateComponent } from '../types';

const SignInGateCopyTestRepeatSept2023 = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateCopyTestRepeatSept2023',
	);
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateCopyTestRepeatSept2023'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateCopyTestRepeatSept2023 };
	});
});

export const signInGateCopyTestRepeatSept2023Component: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		registerUrl,
		abTest,
		checkoutCompleteCookieData,
		personaliseSignInGateAfterCheckoutSwitch,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				{personaliseSignInGateAfterCheckoutSwitch &&
				checkoutCompleteCookieData !== undefined ? (
					<SignInGateMainCheckoutComplete
						ophanComponentId={ophanComponentId}
						dismissGate={dismissGate}
						guUrl={guUrl}
						signInUrl={signInUrl}
						registerUrl={registerUrl}
						abTest={abTest}
						checkoutCompleteCookieData={checkoutCompleteCookieData}
					/>
				) : (
					<SignInGateCopyTestRepeatSept2023
						ophanComponentId={ophanComponentId}
						dismissGate={dismissGate}
						guUrl={guUrl}
						signInUrl={signInUrl}
						registerUrl={registerUrl}
						abTest={abTest}
					/>
				)}
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGate,
};
