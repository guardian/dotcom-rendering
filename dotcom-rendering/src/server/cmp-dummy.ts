import type { CMP } from '@guardian/consent-management-platform/dist/types';

const warn = (): void => {
	console.warn(
		'This is a dummy version of the @guardian/consent-management-platform',
		'No consent signals will be received.',
	);
};

const warnAndReturn = <T extends unknown>(arg: T): (() => T) => {
	warn();
	return () => arg;
};

export const cmp: CMP = {
	__disable: warn,
	__enable: warnAndReturn(false),
	__isDisabled: warnAndReturn(false),
	hasInitialised: warnAndReturn(false),
	init: warn,
	showPrivacyManager: warn,
	version: 'n/a',
	willShowPrivacyMessage: warnAndReturn(Promise.resolve(false)),
	willShowPrivacyMessageSync: warnAndReturn(false),
};

export const onConsentChange: typeof window.guCmpHotFix.onConsentChange = warn;
export const getConsentFor: typeof window.guCmpHotFix.onConsentChange = warn;
