import { labelStyles } from './AdSlot.web';
import { Island } from './Island';
import { LiveblogRightMultipleAdSlots } from './LiveblogRightMultipleAdSlots.importable';
import { TopRightAdSlot } from './TopRightAdSlot';

type Props = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
};

export const LiveblogRightAdSlots = ({ display, isPaidContent }: Props) => {
	return (
		<>
			<TopRightAdSlot
				isPaidContent={isPaidContent}
				adStyles={[labelStyles]}
			/>
			<Island clientOnly={true} deferUntil="idle">
				<LiveblogRightMultipleAdSlots
					display={display}
					isPaidContent={isPaidContent}
				/>
			</Island>
		</>
	);
};
