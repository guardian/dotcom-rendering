import type { Dispatch, SetStateAction } from 'react';
import { ExpandableMarketingCard } from './ExpandableMarketingCard';

interface Props {
	heading: string;
	kicker: string;
	guardianBaseURL: string;
	isExpanded: boolean;
	setIsExpanded: Dispatch<SetStateAction<boolean>>;
	setIsClosed: Dispatch<SetStateAction<boolean>>;
}

export const ExpandableMarketingCardStatic = ({
	guardianBaseURL,
	heading,
	kicker,
	isExpanded,
	setIsExpanded,
	setIsClosed,
}: Props) => {
	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					setIsExpanded(true);
				}
				if (event.key === 'Escape') {
					setIsClosed(true);
				}
			}}
			onClick={() => {
				setIsExpanded(true);
			}}
		>
			<ExpandableMarketingCard
				guardianBaseURL={guardianBaseURL}
				heading={heading}
				kicker={kicker}
				isExpanded={isExpanded}
				setIsClosed={setIsClosed}
			/>
		</div>
	);
};
