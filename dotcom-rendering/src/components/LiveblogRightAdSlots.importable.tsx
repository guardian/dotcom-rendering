import { useAB } from '../lib/useAB';
import { AdSlot } from './AdSlot';
import { LiveblogRightMultipleAdSlots } from './LiveblogRightMultipleAdSlots';

type Props = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
};

export const LiveblogRightAdSlots = ({ display, isPaidContent }: Props) => {
	const ABTestAPI = useAB()?.api;
	const shouldInsertMultipleAdverts =
		ABTestAPI?.isUserInVariant('LiveblogRightColumnAds', 'multiple-adverts') ??
		false;

	if (shouldInsertMultipleAdverts) {
		return (
			<LiveblogRightMultipleAdSlots
				display={display}
				isPaidContent={isPaidContent}
			/>
		);
	}

	return (
		<AdSlot
			data-right-ad="1"
			position="right"
			display={display}
			isPaidContent={isPaidContent}
			isLiveblog={true}
		/>
	);
};
