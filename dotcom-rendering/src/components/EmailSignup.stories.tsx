import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { EmailSignup } from './EmailSignup';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { Section } from './Section';
import { SecureSignup } from './SecureSignup.importable';

const meta = {
	component: EmailSignup,
	title: 'Components/Email Signup',
	parameters: {
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobile'],
				'vertical mobileMedium': allModes['vertical mobileMedium'],
				'vertical phablet': allModes['vertical phablet'],
				'vertical tablet': allModes['vertical tablet'],
				'vertical desktop': allModes['vertical desktop'],
				'vertical leftCol': allModes['vertical leftCol'],
				'vertical wide': allModes['vertical wide'],
			},
		},
	},
	decorators: [
		(Story) => (
			<Section
				title="EmailSignup"
				showTopBorder={true}
				padContent={false}
				centralBorder="partial"
			>
				<Story />
			</Section>
		),
	],
} satisfies Meta<typeof EmailSignup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		description:
			'Reviewing the most important stories on feminism and sexism and those fighting for equality',
		name: 'The Week in Patriarchy',
		frequency: 'Weekly',
		theme: 'opinion',
		emailType: 'newsletter',
		children: (
			<>
				<SecureSignup
					newsletterId="patriarchy"
					emailType="newsletter"
					successDescription="Reviewing the most important stories on feminism and sexism and those fighting for equality"
				/>
				<NewsletterPrivacyMessage emailType="newsletter" />
			</>
		),
	},
	parameters: {
		formats: [
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.Culture,
			},
		],
	},
} satisfies Story;

export const NewsTheme = {
	args: {
		description:
			'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning',
		name: 'First Edition',
		frequency: 'Every weekday',
		theme: 'news',
		emailType: 'newsletter',
		children: (
			<>
				<SecureSignup
					newsletterId="morning-briefing"
					emailType="newsletter"
					successDescription="Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning"
				/>
				<NewsletterPrivacyMessage emailType="newsletter" />
			</>
		),
	},
	parameters: {
		formats: [
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		],
	},
} satisfies Story;

export const IrregularFrequency = {
	args: {
		description:
			'Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world',
		name: 'Guardian Documentaries',
		frequency: 'Whenever a new film is available',
		theme: 'features',
		emailType: 'newsletter',
		children: (
			<>
				<SecureSignup
					newsletterId="documentaries"
					emailType="newsletter"
					successDescription="Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world"
				/>
				<NewsletterPrivacyMessage emailType="newsletter" />
			</>
		),
	},
	parameters: Default.parameters,
} satisfies Story;

export const MarketingEmail = {
	args: {
		description:
			'Find your next job with the Guardian Jobs weekly email. Get the latest job listings, as well as tips and advice on taking your next career step.',
		name: 'Guardian Jobs',
		theme: 'news',
		emailType: 'marketingConsent',
		children: (
			<>
				<SecureSignup
					newsletterId="jobs"
					emailType="marketingConsent"
					successDescription="We will send you an email to confirm your subscription to Guardian Jobs - please use the subscribe link to sign up."
				/>
				<NewsletterPrivacyMessage emailType="marketingConsent" />
			</>
		),
	},
	parameters: Default.parameters,
};
