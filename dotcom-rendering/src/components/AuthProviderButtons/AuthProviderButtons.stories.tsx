/**
 * @file AuthProviderButtons.stories.tsx
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/client/components/AuthProviderButtons.stories.tsx
 */
import type { Meta } from '@storybook/react';
import { AuthProviderButtons } from './AuthProviderButtons';

export default {
	title: 'Components/AuthProviderButtons',
	component: AuthProviderButtons,
	parameters: {
		layout: 'padded',
	},
} as Meta;

export const Default = () => (
	<AuthProviderButtons
		queryParams={{ returnUrl: 'https://www.theguardian.com/uk/' }}
		providers={['social']}
	/>
);

export const NativeAppAndroid = () => (
	<AuthProviderButtons
		queryParams={{ returnUrl: 'https://www.theguardian.com/uk/' }}
		isNativeApp="android"
		providers={['social']}
	/>
);
NativeAppAndroid.storyName = 'Android native app';

export const NativeAppIos = () => (
	<AuthProviderButtons
		queryParams={{ returnUrl: 'https://www.theguardian.com/uk/' }}
		isNativeApp="ios"
		providers={['social']}
	/>
);
NativeAppIos.storyName = 'iOS native app';

export const WithEmail = () => (
	<AuthProviderButtons
		queryParams={{ returnUrl: 'https://www.theguardian.com/uk/' }}
		providers={['social', 'email']}
	/>
);
WithEmail.storyName = 'Default (with email)';

export const NativeAppAndroidWithEmail = () => (
	<AuthProviderButtons
		queryParams={{ returnUrl: 'https://www.theguardian.com/uk/' }}
		isNativeApp="android"
		providers={['social', 'email']}
	/>
);
NativeAppAndroidWithEmail.storyName = 'Android native app (with email)';

export const NativeAppIosWithEmail = () => (
	<AuthProviderButtons
		queryParams={{ returnUrl: 'https://www.theguardian.com/uk/' }}
		isNativeApp="ios"
		providers={['social', 'email']}
	/>
);
NativeAppIosWithEmail.storyName = 'iOS native app (with email)';
