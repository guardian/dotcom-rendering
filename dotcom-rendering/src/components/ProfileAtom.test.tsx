import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { fireEvent, render } from '@testing-library/react';
import { ConfigProvider } from './ConfigContext';
import { ProfileAtom } from './ProfileAtom.importable';

const format: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Analysis,
	display: ArticleDisplay.Standard,
};
describe('ProfileAtom', () => {
	it('should render', () => {
		const { getByText, queryByText } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<ProfileAtom
					id="1fba49a4-81c6-49e4-b7fa-fd66d1512360"
					title="Who is Jon Lansman?"
					html="<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>"
					credit=""
					likeHandler={() => {
						return null;
					}}
					dislikeHandler={() => {
						return null;
					}}
					expandCallback={() => {
						return null;
					}}
				/>
			</ConfigProvider>,
		);

		expect(getByText('Profile')).toBeInTheDocument();

		// Test that the 'Show' part of the expand switch is hidden on expand
		expect(getByText('Show')).toBeInTheDocument();
		fireEvent.click(getByText('Show'));
		expect(queryByText('Show')).toBe(null);
		// Test that 'Hide' is hidden after closing the Profile
		expect(getByText('Hide')).toBeInTheDocument();
		fireEvent.click(getByText('Hide'));
		expect(queryByText('Hide')).toBe(null);
	});

	it('Show feedback on like', () => {
		const { getByText, queryByText, queryByTestId } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<ProfileAtom
					id="1fba49a4-81c6-49e4-b7fa-fd66d1512360"
					title="Who is Jon Lansman?"
					html="<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>"
					credit=""
					likeHandler={() => {
						return null;
					}}
					dislikeHandler={() => {
						return null;
					}}
					expandCallback={() => {
						return null;
					}}
				/>
			</ConfigProvider>,
		);

		// Expand Profile
		fireEvent.click(getByText('Show'));
		// Like button should be visibile and feedback not visibile
		expect(queryByTestId('like')).toBeVisible();
		expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

		// Fire like event
		fireEvent.click(queryByTestId('like') as HTMLElement);
		// Feedback should be visible, like button should be hidden
		expect(queryByText('Thank you for your feedback.')).toBeVisible();
		expect(queryByTestId('like')).not.toBeVisible();
	});

	it('Show feedback on dislike', () => {
		const { getByText, queryByText, queryByTestId } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<ProfileAtom
					id="1fba49a4-81c6-49e4-b7fa-fd66d1512360"
					title="Who is Jon Lansman?"
					html="<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>"
					credit=""
					likeHandler={() => {
						return null;
					}}
					dislikeHandler={() => {
						return null;
					}}
					expandCallback={() => {
						return null;
					}}
				/>
			</ConfigProvider>,
		);

		// Expand Profile
		fireEvent.click(getByText('Show'));
		// Like button should be visibile and feedback not visibile
		expect(queryByTestId('dislike')).toBeVisible();
		expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

		// Fire dislike event
		fireEvent.click(queryByTestId('dislike') as HTMLElement);
		// Feedback should be visible, like button should be hidden
		expect(queryByText('Thank you for your feedback.')).toBeVisible();
		expect(queryByTestId('dislike')).not.toBeVisible();
	});
});
