import { mockRESTCalls } from '../lib/mockRESTCalls';
import { GroupedNewslettersList } from './GroupedNewsletterList';
import { ManyNewsletterSignUp } from './ManyNewsletterSignUp.importable';

mockRESTCalls();

export const Default = () => {
	return (
		<>
			<GroupedNewslettersList
				groupedNewsletters={{
					groups: [
						{
							title: 'test',
							newsletters: [
								{
									listId: 1,
									identityName: 'test-1',
									name: 'test newsletter 1',
									description:
										'Select at least one newsletter to make the ManyNewsletterSignUp appear',
									frequency: 'weekly',
									theme: 'news',
									group: '',
									successDescription: 'not used',
									illustrationCard:
										'https://media.guim.co.uk/ce2e59cfa2ab7db34cba24adbf20910976e55604/0_0_760_456/500.jpg',
								},
								{
									listId: 2,
									identityName: 'test-2',
									name: 'test newsletter 2',
									description:
										'Including the phrase "example.com" in the email before submitting will display the form\'s fail state.',
									frequency: 'monthly',
									theme: 'news',
									group: '',
									successDescription: 'not used',
									illustrationCard:
										'https://media.guim.co.uk/77074f52e5e6f22a6636ed10d65a421426490c9e/22_0_4747_2849/500.png',
								},
							],
						},
					],
				}}
			/>
			<ManyNewsletterSignUp
				useReCaptcha={false}
				captchaSiteKey="TEST_RECAPTCHA_SITE_KEY"
			/>
		</>
	);
};

export default {
	component: Default,
	title: 'Components/ManyNewsletterSignUp',
	chromatic: { diffThreshold: 0.7 },
};
