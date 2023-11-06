import { splitThemeMultipleFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { FollowButton } from './FollowButton';

export default {
	component: FollowButton,
	title: 'Components/FollowStatus',
};

export const FollowBothStates = () => {
	return (
		<>
			<FollowButton
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowButton isFollowing={true} onClickHandler={() => undefined} />
		</>
	);
};
FollowBothStates.decorators = [splitThemeMultipleFormats()];
