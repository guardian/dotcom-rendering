import { labelStyles } from './AdSlot';
import { Island } from './Island';
import { LiveblogRightMultipleAdSlots } from './LiveblogRightMultipleAdSlots.importable';
import { TopRightAdSlot } from './TopRightAdSlot.importable';

type Props = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
};

export const LiveblogRightAdSlots = ({ display, isPaidContent }: Props) => {
	return (
		<>
			<Island deferUntil="visible">
				<TopRightAdSlot
					isPaidContent={isPaidContent}
					adStyles={[labelStyles]}
				/>
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<LiveblogRightMultipleAdSlots
					display={display}
					isPaidContent={isPaidContent}
				/>
			</Island>
		</>
	);
};
