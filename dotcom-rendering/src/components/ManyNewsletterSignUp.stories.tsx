import { GroupedNewslettersList } from './GroupedNewsletterList';
import { ManyNewsletterSignUp } from './ManyNewsletterSignUp.importable';

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
								},
								{
									listId: 2,
									identityName: 'test-2',
									name: 'test newsletter 2',
									description:
										'Including the word "example" in the email before submitting will display the forms fail state.',
									frequency: 'monthly',
									theme: 'news',
									group: '',
									successDescription: 'not used',
								},
							],
						},
					],
				}}
			/>
			<ManyNewsletterSignUp apiEndpoint="" />
		</>
	);
};
Default.storyName = 'ManyNewsletterSignUp - one example';

export default {
	component: Default,
	title: 'Components/ManyNewsletterSignUp',
	chromatic: { diffThreshold: 0.7 },
};
