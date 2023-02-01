import React, { Suspense } from 'react';
import { initPerf } from '../../../browser/initPerf';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateMain = React.lazy(() => {
	const { start, end } = initPerf('SignInGateMain');
	start();
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMain'
	).then((module) => {
		end();
		return { default: module.SignInGateMain };
	});
});

const SignInGateMainCheckoutComplete = React.lazy(() => {
	const { start, end } = initPerf('SignInGateMainCheckoutComplete');
	start();
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMainCheckoutComplete'
	).then((module) => {
		end();
		return { default: module.SignInGateMainCheckoutComplete };
	});
});

// TODO investigate data tracking component name requirements?
// TODO Add context Comments
const showCheckoutCompletePersonalisation = true;

export const signInGateComponent: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		abTest,
		checkoutCompleteCookieData,
	}) => {
		return (
			<Lazy margin={300}>
				<Suspense fallback={<></>}>
					{showCheckoutCompletePersonalisation &&
					checkoutCompleteCookieData !== undefined ? (
						<SignInGateMainCheckoutComplete
							ophanComponentId={ophanComponentId}
							dismissGate={dismissGate}
							guUrl={guUrl}
							signInUrl={signInUrl}
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
							abTest={abTest}
						/>
					)}
				</Suspense>
			</Lazy>
		);
	},
	canShow: canShowSignInGate,
};
