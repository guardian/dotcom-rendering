import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateMain = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateMain',
	);
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMain'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateMain };
	});
});

const SignInGateMainCheckoutComplete = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateMainCheckoutComplete',
	);
	return import(
		/* webpackChunkName: "SignInGateMainCheckoutComplete" */ '../gateDesigns/SignInGateMainCheckoutComplete'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateMainCheckoutComplete };
	});
});

/**
 * GATE PERSONALISATION:
 *
 * If the GU_CO_COMPLETE cookie is present, personalise the sign in gate based on the userType
 * and product information in the cookie value.
 * AB tracking will be registered as part of the main gate AB test, but the component Id string
 * in Ophan ComponentEventTracking will have `_personalised_${userType}_${product}` appended.
 * This occurs in the SignInGateSelector.importable.tsx file
 * There is a feature switch called `personaliseSignInGateAfterCheckout` which can be set in the
 * admin tools, and depending on the state of that switch will determine which variant of the
 * gate to show.
 */
export const signInGateComponent: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		registerUrl,
		abTest,
		checkoutCompleteCookieData,
		personaliseSignInGateAfterCheckoutSwitch,
	}) => {
		return (
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
							checkoutCompleteCookieData={
								checkoutCompleteCookieData
							}
						/>
					) : (
						<SignInGateMain
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
		);
	},
	canShow: canShowSignInGate,
};
