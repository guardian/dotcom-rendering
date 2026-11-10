import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import { CustomSubNav } from './Masthead/Titlepiece/CustomSubNav';

type Props = {
	miniNavData: DCRFrontCard['miniNavData'];
	isWideCard?: boolean;
};

export const CardMiniNav = ({ miniNavData, isWideCard = false }: Props) => {
	if (!miniNavData) {
		return null;
	}

	return (
		<div
			className="mini-nav"
			css={css`
				position: relative;
				z-index: ${getZIndex('card-nested-link')};
				min-width: 0;
				${isWideCard && `padding-top: 2px; padding-bottom: 4px;`}
				--custom-subnav-header-text: ${palette(
					miniNavData.header.dotcomPath
						? '--card-kicker-text'
						: '--card-headline',
				)};
				--masthead-nav-link-text: ${palette('--card-headline')};
				--masthead-nav-link-text-hover: ${palette('--card-headline')};
			`}
		>
			<CustomSubNav customSubNav={miniNavData} renderingPage="card" />
		</div>
	);
};
