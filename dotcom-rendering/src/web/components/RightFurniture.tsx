import { css } from '@emotion/react';
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

// TODO - adjust this to be a real number
const MAX_HEIGHT_PX = 1059 + 482 + 24 + 24;

export const RightFurniture = ({
	display,
	isAdFreeUser,
	isPaidContent,
	renderAds,
	shouldHideReaderRevenue,
}: Props) => {
	return (
		<div
			css={css`
				/* TODO remove this */
				outline: 2px solid red;
				height: ${MAX_HEIGHT_PX}px;
				display: flex;
				flex-direction: column;
			`}
		>
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
		</div>
	);
};
