import { AdSlot } from './AdSlot';
import { Island } from './Island';
import { MostViewedRightWrapper } from './MostViewedRightWrapper.importable';

type Props = {
	display: ArticleDisplay;
	isAdFreeUser: boolean;
	isPaidContent: boolean;
	renderAds: boolean;
	shouldHideReaderRevenue: boolean;
};

export const RightFurniture = ({
	display,
	isAdFreeUser,
	isPaidContent,
	renderAds,
	shouldHideReaderRevenue,
}: Props) => {
	return (
		<>
			{renderAds ? (
				<AdSlot
					position="right"
					display={display}
					shouldHideReaderRevenue={shouldHideReaderRevenue}
					isPaidContent={isPaidContent}
				/>
			) : null}

			{!isPaidContent ? (
				<Island clientOnly={true} deferUntil="visible">
					<MostViewedRightWrapper isAdFreeUser={isAdFreeUser} />
				</Island>
			) : null}
		</>
	);
};
