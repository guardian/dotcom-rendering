import { useAB } from '../lib/useAB';
import { labelStyles } from './AdSlot';
import { LiveblogRightMultipleAdSlots } from './LiveblogRightMultipleAdSlots';
import { TopRightAdSlot } from './TopRightAdSlot';

type Props = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
};

export const LiveblogRightAdSlots = ({ display, isPaidContent }: Props) => {
	const ABTestAPI = useAB()?.api;
	const shouldInsertMultipleAdverts =
		ABTestAPI?.isUserInVariant(
			'LiveblogRightColumnAds',
			'multiple-adverts',
		) ?? false;

	if (shouldInsertMultipleAdverts) {
		return (
			<LiveblogRightMultipleAdSlots
				display={display}
				isPaidContent={isPaidContent}
			/>
		);
	}

	const restrictStickyHeight =
		ABTestAPI?.isUserInVariant(
			'LiveblogRightColumnAds',
			'minimum-stickiness',
		) ?? false;

	return (
		<TopRightAdSlot
			isPaidContent={isPaidContent}
			adStyles={[labelStyles]}
			restrictStickyHeight={restrictStickyHeight}
		/>
	);
};
