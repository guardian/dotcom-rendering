import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { ReporterCalloutBlockElement } from '../types/content';
import { ReporterCalloutBlockComponent } from './ReporterCalloutBlockComponent.importable';

const meta: Meta<typeof ReporterCalloutBlockComponent> = {
	title: 'Components/Reporter Callout Block',
	component: ReporterCalloutBlockComponent,
};

export default meta;

type Story = StoryObj<typeof ReporterCalloutBlockComponent>;

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const defaultCallout: ReporterCalloutBlockElement = {
	_type: 'model.dotcomrendering.pageElements.ReporterCalloutBlockElement',
	elementId: 'abc123',
	id: 'def456',
	displayOnSensitive: false,
	title: 'Get in touch',
	subtitle: 'Contact us about this story',
	intro: '<p>If you have something to share about this story, please contact us using one of the following methods</p>',
	mainTextHeading: 'Secure Messaging in the Guardian app',
	mainText:
		'<p>The Guardian app has a tool to send tips about stories. Messages are end to end encrypted and concealed within the routine activity that every Guardian mobile app performs. This prevents an observer from knowing that you are communicating with us at all, let alone what is being said.</p><p></p><p>If you don\'t already have the Guardian app, download it (<a href="https://apps.apple.com/app/the-guardian-live-world-news/id409128287">iOS</a>/<a href="https://play.google.com/store/apps/details?id=com.guardian">Android</a>) and go to the menu. Select \'Secure Messaging\'.</p><p> </p>',
	emailContact:
		'<p>If you don\'t need strong security then see <a href="https://manage.theguardian.com/help-centre/article/contact-a-journalist-or-editorial-desk">this guide</a>&nbsp;for how to contact the relevant desk</p>',
	messagingContact:
		'<p>Alternatively put a message in a bottle and lob it at +447123456789</p>',
	securedropContact:
		'If you can safely use the tor network without being observed or monitored you can send messages and documents to the Guardian via our <a href="https://www.theguardian.com/securedrop">SecureDrop platform.</a>',
	endNote:
		'<p>Finally, our guide at <a href="https://www.theguardian.com/tips">theguardian.com/tips</a> lists several ways to contact us securely, and discusses the pros and cons of each.</p>',
};

export const Default: Story = {
	args: {
		callout: defaultCallout,
	},
	decorators: [splitTheme([defaultFormat])],
};

export const MinimalContacts: Story = {
	args: {
		callout: {
			...defaultCallout,
			emailContact: undefined,
			messagingContact: undefined,
			securedropContact: undefined,
		},
	},
	decorators: [splitTheme([defaultFormat])],
};

export const WithoutEndNote: Story = {
	args: {
		callout: {
			...defaultCallout,
			endNote: undefined,
		},
	},
	decorators: [splitTheme([defaultFormat])],
};

export const ExpiredCallout: Story = {
	args: {
		callout: {
			...defaultCallout,
			// Set activeUntil to a timestamp in the past (January 1, 2020)
			activeUntil: 1577836800,
		},
	},
	decorators: [splitTheme([defaultFormat])],
};
