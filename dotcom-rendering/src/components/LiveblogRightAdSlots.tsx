import { labelStyles } from './AdSlot.tsx';
import { Island } from './Island.tsx';
import { LiveblogRightMultipleAdSlots } from './LiveblogRightMultipleAdSlots.importable.tsx';
import { TopRightAdSlot } from './TopRightAdSlot.tsx';

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
