import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import type { ImagePositionType } from './ImageWrapper';

type Props = {
	children: React.ReactNode;
	imagePosition?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
	imageUrl?: string;
	hasStarRating?: boolean;
};

const headlineStyles = css`
	padding-top: var(--padding-top-mobile);
	padding-bottom: 8px;
	padding-left: 5px;
	padding-right: 5px;
	flex-grow: 1;

	${from.phablet} {
		padding-top: 1px;
	}

	${from.tablet} {
		padding-top: var(--padding-top);
	}
`;

export const HeadlineWrapper = ({
	children,
	imagePosition,
	imagePositionOnMobile,
	imageUrl,
	hasStarRating,
}: Props) => (
	<div
		style={{
			'--padding-top-mobile':
				imageUrl &&
				imagePositionOnMobile &&
				(imagePositionOnMobile === 'left' ||
					imagePositionOnMobile === 'right') &&
				hasStarRating
					? '0px'
					: '1px',
			'--padding-top':
				imageUrl &&
				imagePosition &&
				(imagePosition === 'left' || imagePosition === 'right') &&
				hasStarRating
					? '0px'
					: '1px',
		}}
		css={headlineStyles}
	>
		{children}
	</div>
);
